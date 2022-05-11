import Phaser from "phaser";
import { TEXTURE_BOY, TEXTURE_GIRL } from "../constants";
import CashMachine from "../items/CashMachine";
import "../player/MyPlayer";
import MyPlayer from "../player/MyPlayer";
import PlayerSelector from "../player/PlayerSelector";
import Item from "../items/Item";
import { store } from "../../modules/store";
import Board from "../items/Board";
import PoliceNPC from "../items/PoliceNPC";
import Banker from "../items/Banker";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  private sky!: Phaser.GameObjects.Sprite;
  private cloudUpper!: Phaser.GameObjects.TileSprite;
  private backgroundCloud!: Phaser.GameObjects.TileSprite;
  myPlayer!: MyPlayer;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private playerSelector!: Phaser.GameObjects.Zone;

  constructor() {
    super({
      key: "Game",
    });
  }

  // 키보드 매핑
  registerKeys() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey("E");
    this.keyR = this.input.keyboard.addKey("R");
    this.input.keyboard.disableGlobalCapture();
  }

  disableKeys() {
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    this.input.keyboard.enabled = true;
  }

  init() {
    this.registerKeys();
    // this.physics.world.setFPS(60);
  }

  create() {
    // 화면 크기
    console.log(store.getState().user.userNick);
    const { width, height } = this.scale;

    console.log(width, height);

    this.cameras.main.zoom = 1.4;

    this.sky = this.add.sprite(width * 0.5, height * 0.5, "sky_day");
    this.sky.setDisplaySize(width * 1.5, height * 1.6);

    // map 생성
    this.map = this.make.tilemap({ key: "bank" });
    const floor = this.map.addTilesetImage("Carpet", "floor"); // 바닥
    const ceil = this.map.addTilesetImage("toppers", "ceil"); // 천장
    const items = this.map.addTilesetImage("walltexture", "items"); // 벽
    const obstacle = this.map.addTilesetImage("gather_plants_1.2", "obstacle"); // 장애물

    const groundLayer = this.map.createLayer("Ground", [
      floor,
      items,
      ceil,
      obstacle,
    ]);

    groundLayer.x = width * 0.5 - 960;
    groundLayer.y = height * 0.5 - 528;

    const wallLayer = this.map.createLayer("Wall", [
      floor,
      items,
      ceil,
      obstacle,
    ]);

    // groundLayer.fixedToCamera = false;

    wallLayer.x = width * 0.5 - 960;
    wallLayer.y = height * 0.5 - 528;

    // 벽 너머로 넘어갈 수 없도록 설정
    wallLayer.setCollisionByExclusion([-1]);

    console.log(wallLayer.width, wallLayer.height);

    // Character 생성
    this.myPlayer = this.add.myPlayer(
      width * 0.5,
      height * 0.5 + 384,
      TEXTURE_BOY,
      "1"
    );
    this.myPlayer.setPlayerName("TEST123");
    this.myPlayer.setPlayerTexture(TEXTURE_GIRL);
    this.playerSelector = new PlayerSelector(this, 0, 0, 32, 32);

    // 화면 바깥으로 나갈 수 없도록 설정
    this.myPlayer.setCollideWorldBounds(true);

    // Tiled Object 화면에 보여주기
    const atms = this.physics.add.staticGroup({
      classType: CashMachine,
    });
    const atmLayer = this.map.getObjectLayer("ATMS");
    atmLayer.objects.forEach((atmObj) => {
      const item = this.addObjectFromTiled(atms, atmObj, "gameItem", "games");
    });

    const boards = this.physics.add.staticGroup({
      classType: Board,
    });
    const boardLayer = this.map.getObjectLayer("Board");
    boardLayer.objects.forEach((boardObj) => {
      const item = this.addObjectFromTiled(boards, boardObj, "boards", "atm");
    });

    const policeNpcs = this.physics.add.staticGroup({
      classType: PoliceNPC,
    });
    const npcLayer = this.map.getObjectLayer("NPC");
    npcLayer.objects.forEach((npcObj) => {
      const item = this.addObjectFromTiled(
        policeNpcs,
        npcObj,
        "npc",
        "npc_avatar"
      );
    });

    const bankers = this.physics.add.staticGroup({
      classType: Banker,
    });
    const bankerLayer = this.map.getObjectLayer("Banker");
    bankerLayer.objects.forEach((banker) => {
      const item = this.addObjectFromTiled(
        bankers,
        banker,
        "npc",
        "npc_avatar"
      );
    });

    const decoItems = this.physics.add.staticGroup({});
    const decoLayer = this.map.getObjectLayer("Decoration");
    decoLayer.objects.forEach((decoObj) => {
      const item = this.addObjectFromTiled(
        decoItems,
        decoObj,
        "deco",
        "decoration"
      );
    });

    // 카메라가 캐릭터를 따라 이동함
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      wallLayer
    );

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      [decoItems]
    );

    // Object에 닿았을 때 이벤트 처리 코드
    this.physics.add.overlap(
      this.playerSelector,
      [atms, boards, policeNpcs, bankers],
      this.handleItemSelectorOverlap,
      undefined,
      this
    );
  }

  // Tiled에서 Object 꺼내와 출력
  // key: Preloder에 선언한 spritesheet의 key값
  // tilesetName: Tiled에 보여지는 tileset 이름
  addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    console.log(object.x, object.height);

    // const actualX = object.x! - object.width! * 0.25;
    // const actualY = object.y! - object.height! * 0.25;

    const actualX = object.x! + object.width! * 6.3;
    const actualY = object.y! + object.height! * 1.125;
    const obj = group
      .get(
        actualX,
        actualY,
        key,
        object.gid! - this.map.getTileset(tilesetName).firstgid
      )
      .setDepth(actualY);

    return obj;
  }

  // 캐릭터가 Object 가까이 갔을 때 처리하는 함수
  private handleItemSelectorOverlap(playerSelector: any, selectionItem: any) {
    const currentItem = playerSelector.selectedItem as Item; // 캐릭터 주변의 Object item

    if (currentItem) {
      if (
        currentItem === selectionItem ||
        currentItem.depth >= selectionItem.depth
      ) {
        return;
      }

      currentItem.clearDialogBox();
    }

    playerSelector.selectedItem = selectionItem;
    selectionItem.onOverlapDialog();
  }

  update() {
    // 주기적으로 캐릭터 정보 업데이트
    if (this.myPlayer) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR
      );
    }

    // Modal이 열려있을 때는 캐릭터가 움직일 수 없음.
    if (store.getState().modal.isOpen) {
      this.disableKeys();
    } else {
      this.enableKeys();
    }

    // this.backgroundCloud.

    let worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );

    let pointTileX = this.map.worldToTileX(this.game.input.mousePointer.worldX);
    let pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);
    let marker = this.add.graphics();
    marker.x = this.map.tileToWorldX(pointTileX);
    marker.y = this.map.tileToWorldY(pointTileY);
  }
}
