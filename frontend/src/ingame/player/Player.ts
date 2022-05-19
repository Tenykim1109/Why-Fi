import Phaser from "phaser";
import { createCharacterAnims } from "../anims/createCharacterAnims";

export const PlayerBehavior = Object.freeze({
  IDLE: 0,
  SITTING: 1,
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  playerId: string;
  playerName: Phaser.GameObjects.Text;
  playerTexture: string;
  playerContainer: Phaser.GameObjects.Container;
  private playerDialogBubble: Phaser.GameObjects.Container;
  private timeoutID?: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    createCharacterAnims(this.anims);

    this.playerId = id;
    this.playerTexture = texture; // 남캐인지 여캐인지?
    this.setDepth(0);

    this.anims.play(`${this.playerTexture}-down-idle`, true);

    // 말풍선
    this.playerContainer = this.scene.add
      .container(this.x, this.y - 30)
      .setDepth(5000); // 말풍선 z축, 맨 위에서 보이게 하기
    this.playerDialogBubble = this.scene.add.container(0, 0).setDepth(5000); // 말풍선(아이템)
    this.playerContainer.add(this.playerDialogBubble);

    // 캐릭터 이름 위에 보이게 하기
    this.playerName = this.scene.add
      .text(0, 0, "")
      .setFontFamily("Arial")
      .setFontSize(12)
      .setColor("#000000")
      .setOrigin(0.5);
    this.playerContainer.add(this.playerName);
    this.scene.physics.world.enable(this.playerContainer);
    const playContainerBody = this.playerContainer
      .body as Phaser.Physics.Arcade.Body;
    const collisionScale = [0.5, 0.2];
    playContainerBody
      .setSize(this.width * collisionScale[0], this.height * collisionScale[1])
      .setOffset(-8, this.height * (1 - collisionScale[1]) + 6);
  }

  updateDialogBubble(content: string) {
    this.clearDialogBubble();

    // dialog text는 70자까지만
    const dialogBubbleText =
      content.length <= 70 ? content : content.substring(0, 70).concat("...");

    const innerText = this.scene.add
      .text(0, 0, dialogBubbleText, {
        wordWrap: {
          width: 165,
          useAdvancedWrap: true,
        },
      })
      .setFontFamily("Arial")
      .setFontSize(12)
      .setColor("#000000")
      .setOrigin(0.5);

    // set dialogBox slightly larger than the text in it
    const innerTextHeight = innerText.height;
    const innerTextWidth = innerText.width;

    innerText.setY(-innerTextHeight / 2 - this.playerName.height / 2);
    const dialogBoxWidth = innerTextWidth + 10;
    const dialogBoxHeight = innerTextHeight + 3;
    const dialogBoxX = innerText.x - innerTextWidth / 2 - 5;
    const dialogBoxY = innerText.y - innerTextHeight / 2 - 2;

    this.playerDialogBubble.add(
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
        .lineStyle(1, 0x000000, 1)
        .strokeRoundedRect(
          dialogBoxX,
          dialogBoxY,
          dialogBoxWidth,
          dialogBoxHeight,
          3
        )
    );
    this.playerDialogBubble.add(innerText);

    // After 6 seconds, clear the dialog bubble
    this.timeoutID = window.setTimeout(() => {
      this.clearDialogBubble();
    }, 6000);
  }

  clearDialogBubble() {
    clearTimeout(this.timeoutID);
    this.playerDialogBubble.removeAll(true);
  }
}
