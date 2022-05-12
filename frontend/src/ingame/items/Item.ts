import Phaser from "phaser";

export enum ItemType {
  CASHMACHINE, // atm
  POLICE_NPC, // 청원경찰 npc
  BANKER, // 은행원
  BOARD, // 주식
  QUIZMACHINE, // 퀴즈 푸는 기계
  COMPUTER, // 컴퓨터
}

export default class Item extends Phaser.Physics.Arcade.Sprite {
  private dialogBox!: Phaser.GameObjects.Container; // 말풍선
  private statusBox!: Phaser.GameObjects.Container; // 모양
  itemType!: ItemType;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.dialogBox = this.scene.add.container().setDepth(10000);
    this.statusBox = this.scene.add.container().setDepth(10000);
  }

  // Object에 겹쳤을 때 나오는 message
  setDialogBox(text: string) {
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily("Arial")
      .setFontSize(12)
      .setColor("blue");

    const dialogBoxWidth = innerText.width + 4;
    const dialogBoxHeight = innerText.height + 2;
    const dialogBoxX = this.x - dialogBoxWidth * 0.5;
    const dialogBoxY = this.y + this.height * 0.5;

    this.dialogBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(
          dialogBoxX,
          dialogBoxY,
          dialogBoxWidth,
          dialogBoxHeight,
          3
        )
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(
          dialogBoxX,
          dialogBoxY,
          dialogBoxWidth,
          dialogBoxHeight,
          3
        )
    );
    this.dialogBox.add(innerText.setPosition(dialogBoxX + 2, dialogBoxY));
  }

  clearDialogBox() {
    this.dialogBox.removeAll(true);
  }

  setStatusBox(text: string) {
    // 누가 사용하고 있으면 나오는 글자
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily("Arial")
      .setFontSize(12)
      .setColor("red");

    // set dialogBox slightly larger than the text in it
    const statusBoxWidth = innerText.width + 4;
    const statusBoxHeight = innerText.height + 2;
    const statusBoxX = this.x - statusBoxWidth * 0.5;
    const statusBoxY = this.y - this.height * 0.25;
    this.statusBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(
          statusBoxX,
          statusBoxY,
          statusBoxWidth,
          statusBoxHeight,
          3
        )
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(
          statusBoxX,
          statusBoxY,
          statusBoxWidth,
          statusBoxHeight,
          3
        )
    );
    this.statusBox.add(innerText.setPosition(statusBoxX + 2, statusBoxY));
  }

  clearStatusBox() {
    this.statusBox.removeAll(true);
  }
}
