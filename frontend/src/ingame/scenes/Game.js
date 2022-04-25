import Phaser from "phaser";
import { TEXTURE_BOY } from "../constants";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // 화면 크기
    const { width, height } = this.scale;

    // map image 생성
    this.add.image(width * 0.5, height * 0.5, "map_image");

    // Character 생성
    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.5, TEXTURE_BOY)
      .play("down-idle");

    // this.physics.add.sprite(width * 0.25, height * 0.25, "map_item", 35);

    // 화면 바깥으로 나갈 수 없도록 설정
    this.player.setCollideWorldBounds(true);
  }

  update() {
    const speed = 200;

    // 플레이어 상하좌우로 움직이는 부분
    if (this.cursors.left.isDown) {
      // 왼쪽
      this.player.setVelocityX(-speed);
      this.player.setVelocityY(0);
      this.player.play("left-walk", true);
    } else if (this.cursors.right.isDown) {
      // 오른쪽
      this.player.setVelocityX(speed);
      this.player.setVelocityY(0);
      this.player.play("right-walk", true);
    } else if (this.cursors.up.isDown) {
      // 위로
      this.player.setVelocityX(0);
      this.player.setVelocityY(-speed);
      this.player.play("up-walk", true);
    } else if (this.cursors.down.isDown) {
      // 아래로
      this.player.setVelocityX(0);
      this.player.setVelocityY(speed);
      this.player.play("down-walk", true);
    } else {
      // 정지
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      const key = this.player.anims.currentAnim.key;
      const parts = key.split("-");
      const direction = parts[0];
      this.player.play(`${direction}-idle`);
    }
  }
}
