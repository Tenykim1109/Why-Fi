import Phaser from "phaser";
import Player from "./Player";
import PlayerSelector from "./PlayerSelector";
import { ItemType } from "../items/Item";
import CashMachine from "../items/CashMachine";
import { createCharacterAnims } from "../anims/createCharacterAnims";
import { TEXTURE_BOY } from "../constants";

export default class MyPlayer extends Player {
  playContainerBody;
  playerAnims!: Phaser.Animations.AnimationManager;
  playerTexture!: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, id, frame);

    this.playContainerBody = this.playerContainer
      .body as Phaser.Physics.Arcade.Body;

    createCharacterAnims(this.anims);
  }

  setPlayerName(name: string) {
    this.playerName.setText(name);
  }

  setPlayerTexture(texture: string) {
    if (texture !== "") {
      this.playerTexture = texture;
    } else {
      this.playerTexture = TEXTURE_BOY;
    }
    console.log(this.playerTexture);
    console.log(this.anims);

    this.anims.play(`${this.playerTexture}-down-idle`, true);
  }

  update(
    playerSelector: PlayerSelector,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    keyE: Phaser.Input.Keyboard.Key,
    keyR: Phaser.Input.Keyboard.Key
  ) {
    if (!cursors) return;

    const item = playerSelector.selectedItem;

    // E키 눌렀을 때
    if (Phaser.Input.Keyboard.JustDown(keyE)) {
      switch (item?.itemType) {
        case ItemType.CASHMACHINE:
          const cashMachine = item as CashMachine;
          cashMachine.openDialog();
          break;
      }
    }

    const speed = 200;
    let vx = 0;
    let vy = 0;

    if (cursors.left?.isDown) {
      vx -= speed;
      this.anims.play(`${this.playerTexture}-left-walk`, true);
    } else if (cursors.right?.isDown) {
      vx += speed;
      this.anims.play(`${this.playerTexture}-right-walk`, true);
    } else if (cursors.up?.isDown) {
      vy -= speed;
      this.anims.play(`${this.playerTexture}-up-walk`, true);
      this.setDepth(this.y);
    } else if (cursors.down?.isDown) {
      vy += speed;
      this.anims.play(`${this.playerTexture}-down-walk`, true);
      this.setDepth(this.y);
    } else {
      vx = 0;
      vy = 0;
      const key = this.anims.currentAnim.key;
      const parts = key.split("-");
      const direction = parts[1];
      this.anims.play(`${this.playerTexture}-${direction}-idle`);
    }

    this.setVelocity(vx, vy);
    this.body.velocity.setLength(speed);
    this.playContainerBody.setVelocity(vx, vy);
    this.playContainerBody.velocity.setLength(speed);
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      myPlayer(
        x: number,
        y: number,
        texture: string,
        id: string,
        frame?: string | number
      ): MyPlayer;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "myPlayer",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    const sprite = new MyPlayer(this.scene, x, y, texture, id, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    const collisionScale = [0.5, 0.2];
    sprite.body
      .setSize(
        sprite.width * collisionScale[0],
        sprite.height * collisionScale[1]
      )
      .setOffset(
        sprite.width * (1 - collisionScale[0]) * 0.5,
        sprite.height * (1 - collisionScale[1])
      );

    return sprite;
  }
);
