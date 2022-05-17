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
import QuizMachine from "../items/QuizMachine";
import Computer from "../items/Computer";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  private sky!: Phaser.GameObjects.Sprite;
  private startX!: number;
  private startY!: number;
  private cloudUpper!: Phaser.GameObjects.TileSprite;
  private backgroundCloud!: Phaser.GameObjects.TileSprite;
  private characterType!: string;
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
  }

  create() {
    // 화면 크기
    const { width, height } = this.scale;
    console.log(width, height);
    this.startX = width * 0.5 - 960;
    this.startY = height * 0.5 - 528;

    this.scene.run("button-ui");

    this.characterType = store.getState().user.characterType;
    this.cameras.main.zoom = 1.4;

    this.sky = this.add.sprite(width * 0.5, height * 0.5, "sky_day");
    this.sky.setDisplaySize(width * 1.5, height * 1.6);

    // map 생성
    this.map = this.make.tilemap({ key: "bank" });
    const floor = this.map.addTilesetImage("Carpet", "floor"); // 바닥
    const ceil = this.map.addTilesetImage("toppers", "ceil"); // 천장
    const items = this.map.addTilesetImage("walltexture", "items"); // 벽
    const chairs = this.map.addTilesetImage("chairs", "chairItem");
    const tables = this.map.addTilesetImage("decoration", "deco");

    const groundLayer = this.map.createLayer("Ground", [floor, items, ceil]);

    groundLayer.x = this.startX;
    groundLayer.y = this.startY;

    const tableLayer = this.map.createLayer("Table", [tables]);
    tableLayer.x = this.startX;
    tableLayer.y = this.startY;
    tableLayer.setCollisionByExclusion([-1]);

    const wallLayer = this.map.createLayer("Wall", [
      floor,
      items,
      ceil,
      chairs,
    ]);

    // groundLayer.fixedToCamera = false;

    wallLayer.x = this.startX;
    wallLayer.y = this.startY;

    // 벽 너머로 넘어갈 수 없도록 설정
    wallLayer.setCollisionByExclusion([-1]);

    if (this.characterType === "") {
      this.characterType = TEXTURE_BOY;
    }

    // Character 생성
    this.myPlayer = this.add.myPlayer(
      width * 0.5,
      height * 0.5 + 384,
      this.characterType,
      "1"
    );
    this.myPlayer.setPlayerTexture(this.characterType);
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

    const quizMachines = this.physics.add.staticGroup({
      classType: QuizMachine,
    });
    const quizLayer = this.map.getObjectLayer("Quiz");
    quizLayer.objects.forEach((quizItem) => {
      const item = this.addObjectFromTiled(
        quizMachines,
        quizItem,
        "deco",
        "decoration"
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

    const computers = this.physics.add.staticGroup({
      classType: Computer,
    });
    const computerLayer = this.map.getObjectLayer("Computers");
    computerLayer.objects.forEach((computer) => {
      const item = this.addObjectFromTiled(
        computers,
        computer,
        "deco",
        "decoration"
      );
    });

    const plants = this.physics.add.staticGroup({});
    const plantLayer = this.map.getObjectLayer("Plants");
    plantLayer.objects.forEach((p) => {
      const item = this.addObjectFromTiled(plants, p, "plant", "plants");
    });

    // 카메라가 캐릭터를 따라 이동함
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      [wallLayer, tableLayer]
    );

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      [decoItems, quizMachines, atms, plants]
    );

    // Object에 닿았을 때 이벤트 처리 코드
    this.physics.add.overlap(
      this.playerSelector,
      [atms, boards, policeNpcs, bankers, quizMachines, computers],
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
    tilesetName: string,
    offsetX?: number,
    offsetY?: number
  ) {
    const actualX = this.startX + object.x! + object.width! * 0.5;
    const actualY = this.startY + object.y! - object.height! * 0.5;

    if (offsetX === undefined) {
      offsetX = 0;
    }

    if (offsetY === undefined) {
      offsetY = 0;
    }

    // 서버에서 올바르게 나오는 좌표값
    // const actualX = object.x! + object.width! * (9.7 + offsetX);
    // const actualY = object.y! + object.height! * (3 + offsetY);

    // const actualX = object.x! - this.cameras.main.x;

    let obj = undefined;
    if (object.text !== undefined) {
      this.add.text(actualX - 32, actualY, object.text.text, {
        fontFamily: "DungGeunMo",
        fontSize: `${object.text.pixelsize + 4}px`,
        color: "rgb(0,0,0)",
      });
    } else {
      obj = group
        .get(
          actualX,
          actualY,
          key,
          object.gid! - this.map.getTileset(tilesetName).firstgid
        )
        .setDepth(actualY - this.startY);
    }

    if (group.classType === Banker) {
      obj.bankerType = object.type;
    }

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
