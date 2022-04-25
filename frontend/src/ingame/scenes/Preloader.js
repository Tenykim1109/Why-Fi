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
    this.load.image("map_image", "assets/bankmap.png");
    this.load.tilemapTiledJSON("map", "assets/bankmap.json");

    this.load.spritesheet("map_item", "assets/gather_plants_1.2.png", {
      frameWidth: 64,
    });
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
