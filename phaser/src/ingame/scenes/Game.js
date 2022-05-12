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

    // map 생성
    const map = this.make.tilemap({ key: "bank" });
    // this.map = this.make.tilemap({ key: "bank" });
    this.floor = map.addTilesetImage("Carpet", "floor"); // 바닥
    this.ceil = map.addTilesetImage("toppers", "ceil"); // 천장
    this.items = map.addTilesetImage("walltexture", "items"); // 벽
    this.avatars = map.addTilesetImage("avatars", "avatars"); // npc
    this.tables = map.addTilesetImage("tables", "tables"); // 테이블
    this.plants = map.addTilesetImage("plants", "plants"); // 식물
    this.atm = map.addTilesetImage("atm", "atm"); // atm

    const groundLayer = map.createLayer("Ground", [
      this.floor,
      this.items,
      this.ceil,
      this.avatars,
      this.tables,
      this.plants,
      this.atm,
    ]);

    const wallLayer = map.createLayer("Wall", [
      this.floor,
      this.items,
      this.ceil,
      this.avatars,
      this.tables,
      this.plants,
      this.atm,
    ]);

    const tableLayer = map.createLayer("Table", [this.tables]);
    const npcLayer = map.createLayer("NPC", [this.avatars]);
    const plantsLayer = map.createLayer("Plant", [this.plants]);
    const atmLayer = map.createLayer("ATM", [this.atm]);

    groundLayer.fixedToCamera = false;

    // 벽 너머로 넘어갈 수 없도록 설정
    wallLayer.setCollisionByExclusion([-1]);
    tableLayer.setCollisionByExclusion([-1]);
    npcLayer.setCollisionByExclusion([-1]);
    plantsLayer.setCollisionByExclusion([-1]);
    atmLayer.setCollisionByExclusion([-1]);

    // Character 생성
    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.5, TEXTURE_BOY)
      .play("down-idle");

    // 화면 바깥으로 나갈 수 없도록 설정
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, tableLayer);
    this.physics.add.collider(this.player, npcLayer);
    this.physics.add.collider(this.player, plantsLayer);
    this.physics.add.collider(this.player, atmLayer);
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