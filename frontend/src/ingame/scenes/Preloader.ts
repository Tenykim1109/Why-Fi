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
    this.load.image("chairItem", "assets/tiles/gather_chairs_1.3.png");

    // background image 불러오기
    this.load.image("cloud", "assets/background/clouds.png");
    this.load.image("cloud_day_bottom", "assets/background/Clouds5b.png");
    this.load.image("cloud_day_upper", "assets/background/Cloud1.png");
    this.load.image("sky_day", "assets/background/Sky1.png");

    this.load.image("button", "assets/menu.png");

    // object 표시할 이미지 spritesheet로 가져오기
    // for Board Layer - 주식 차트 게시판
    this.load.spritesheet("boards", "assets/tiles/atm.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // for ATMS Layer - ATM기
    this.load.spritesheet("gameItem", "assets/tiles/gather_games_1.1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // for PoliceNpc, Banker Layer - 청원경찰, 은행 직원
    this.load.spritesheet("npc", "assets/tiles/gather_avatars_1.0.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // for decoration, Computer Layer - 장식, 컴퓨터
    this.load.spritesheet("deco", "assets/tiles/gather_decoration_1.21.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // for plants layer - 식물
    this.load.spritesheet("plant", "assets/tiles/gather_plants_1.2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Tiled Map 가져오기
    this.load.tilemapTiledJSON("bank", "assets/tilemap/test-bank.json");
  }

  create() {
    this.scene.launch("Game"); // map과 character가 포함된 scene 시작
  }
}
