import Phaser from "phaser";
import { createCharacterAnims } from "../anims/createCharacterAnims";
import { TEXTURE_BOY, TEXTURE_GIRL } from "../constants";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "Preloader" });
  }

  preload() {
    // 캐릭터에 사용할 Sprite sheet 불러오기
    // 남캐
    this.load.spritesheet(TEXTURE_BOY, "assets/sprite_boy_1.png", {
      frameWidth: 64,
    });

    // 여캐
    this.load.spritesheet(TEXTURE_GIRL, "assets/sprite_girl_1.png", {
      frameWidth: 64,
    });

    // map image 불러오기
    this.load.image("floor", "assets/tiles/Carpet.png"); // 바닥
    this.load.image("ceil", "assets/tiles/toppers.png"); // 천장
    this.load.image("items", "assets/tiles/walltexture.png"); // 벽
    this.load.image("obstacle", "assets/tiles/gather_plants_1.2.png"); // 장애물

    // object 표시할 이미지 spritesheet로 가져오기
    this.load.spritesheet("boards", "assets/tiles/atm.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Tiled Map 가져오기
    this.load.tilemapTiledJSON("bank", "assets/tilemap/test-bank.json");
  }

  create() {
    this.scene.start("Game"); // map과 character가 포함된 scene 시작

    // // 캐릭터 기본 정지상태
    // this.anims.create({
    //   key: "down-idle",
    //   frames: [{ key: TEXTURE_BOY, frame: 0 }],
    // });
    // // 캐릭터 아래로 이동
    // this.anims.create({
    //   key: "down-walk",
    //   frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // // 캐릭터 왼쪽 정지
    // this.anims.create({
    //   key: "left-idle",
    //   frames: [{ key: TEXTURE_BOY, frame: 4 }],
    // });
    // // 캐릭터 왼쪽 이동
    // this.anims.create({
    //   key: "left-walk",
    //   frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
    //     start: 4,
    //     end: 7,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // // 캐릭터 오른쪽 정지
    // this.anims.create({
    //   key: "right-idle",
    //   frames: [{ key: TEXTURE_BOY, frame: 8 }],
    // });
    // // 캐릭터 오른쪽 이동
    // this.anims.create({
    //   key: "right-walk",
    //   frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
    //     start: 8,
    //     end: 11,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // // 캐릭터 위로 정지
    // this.anims.create({
    //   key: "up-idle",
    //   frames: [{ key: TEXTURE_BOY, frame: 12 }],
    // });
    // // 캐릭터 위로 이동
    // this.anims.create({
    //   key: "up-walk",
    //   frames: this.anims.generateFrameNumbers(TEXTURE_BOY, {
    //     start: 12,
    //     end: 15,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
  }
}
