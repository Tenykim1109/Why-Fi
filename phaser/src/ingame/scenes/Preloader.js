import Phaser from "phaser";
import { TEXTURE_BOY } from "../constants";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    // 캐릭터에 사용할 Sprite sheet 불러오기
    this.load.spritesheet(TEXTURE_BOY, "assets/sprite_boy_1.png", {
      frameWidth: 64,
    });

    // map image 불러오기
    // this.load.image("map_image", "assets/bankmap.png");
    // this.load.tilemapTiledJSON("map", "assets/bankmap.json");
    this.load.image("floor", "assets/tiles/Carpet.png"); // 바닥
    this.load.image("ceil", "assets/tiles/toppers.png"); // 천장
    this.load.image("items", "assets/tiles/walltexture.png"); // 벽
    this.load.image("avatars", "assets/tiles/avatars.png"); // NPC
    this.load.image("tables", "assets/tiles/tables.png"); // 테이블
    this.load.image("plants", "assets/tiles/plants.png"); // 식물
    this.load.image("atm", "assets/tiles/gather_decoration_1.21.png"); // ATM
    this.load.tilemapTiledJSON("bank", "assets/tilemap/test-bank.json");
  }

  create() {
    this.scene.start("game"); // map과 character가 포함된 scene 시작

    // 캐릭터 기본 정지상태
    this.anims.create({
      key: "down-idle",
      frames: [{ key: TEXTURE_BOY, frame: 0 }],
    });

    // 캐릭터 아래로 이동
    this.anims.create({
      key: "down-walk",
      frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // 캐릭터 왼쪽 정지
    this.anims.create({
      key: "left-idle",
      frames: [{ key: TEXTURE_BOY, frame: 4 }],
    });

    // 캐릭터 왼쪽 이동
    this.anims.create({
      key: "left-walk",
      frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // 캐릭터 오른쪽 정지
    this.anims.create({
      key: "right-idle",
      frames: [{ key: TEXTURE_BOY, frame: 8 }],
    });

    // 캐릭터 오른쪽 이동
    this.anims.create({
      key: "right-walk",
      frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // 캐릭터 위로 정지
    this.anims.create({
      key: "up-idle",
      frames: [{ key: TEXTURE_BOY, frame: 12 }],
    });

    // 캐릭터 위로 이동
    this.anims.create({
      key: "up-walk",
      frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
        start: 13,
        end: 16,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
