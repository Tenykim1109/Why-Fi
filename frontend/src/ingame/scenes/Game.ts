import Phaser from "phaser";
import { TEXTURE_BOY } from "../constants";
import CashMachine from "../items/CashMachine";
import "../player/MyPlayer";
import MyPlayer from "../player/MyPlayer";
import PlayerSelector from "../player/PlayerSelector";
import Item from "../items/Item";
import { store } from "../../modules/store";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
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
    console.log(store.getState().user.userNick);
    const { width, height } = this.scale;

    this.cameras.main.zoom = 1.5;

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

    const wallLayer = this.map.createLayer("Wall", [
      floor,
      items,
      ceil,
      obstacle,
    ]);

    // groundLayer.fixedToCamera = false;

    // 벽 너머로 넘어갈 수 없도록 설정
    wallLayer.setCollisionByExclusion([-1]);

    // Character 생성
    this.myPlayer = this.add.myPlayer(640, 896, TEXTURE_BOY, "1");
    this.myPlayer.setPlayerName("TEST123");
    this.myPlayer.setPlayerTexture(TEXTURE_BOY);
    this.playerSelector = new PlayerSelector(this, 0, 0, 32, 32);

    // 화면 바깥으로 나갈 수 없도록 설정
    this.myPlayer.setCollideWorldBounds(true);
    this.physics.add.collider(this.myPlayer, wallLayer);

    // Tiled Object 화면에 보여주기
    const atms = this.physics.add.staticGroup({
      classType: CashMachine,
    });
    const atmLayer = this.map.getObjectLayer("ATMS");
    atmLayer.objects.forEach((atmObj) => {
      const item = this.addObjectFromTiled(atms, atmObj, "boards", "atm");
    });

    // 카메라가 캐릭터를 따라 이동함
    this.cameras.main.startFollow(this.myPlayer, true);

    // Object에 닿았을 때 이벤트 처리 코드
    this.physics.add.overlap(
      this.playerSelector,
      [atms],
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
    const actualX = object.x! - object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
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
    if (this.myPlayer) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR
      );
    }

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
