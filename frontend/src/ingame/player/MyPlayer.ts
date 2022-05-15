import Phaser from "phaser";
import Player from "./Player";
import PlayerSelector from "./PlayerSelector";
import { ItemType } from "../items/Item";
import CashMachine from "../items/CashMachine";
import { createCharacterAnims } from "../anims/createCharacterAnims";
import { TEXTURE_BOY, TEXTURE_GIRL } from "../constants";
import Board from "../items/Board";
import PoliceNPC from "../items/PoliceNPC";
import Banker from "../items/Banker";
import QuizMachine from "../items/QuizMachine";
import Computer from "../items/Computer";

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
    if (texture === TEXTURE_BOY || texture === TEXTURE_GIRL) {
      this.playerTexture = texture;
    } else {
      this.playerTexture = TEXTURE_BOY;
    }

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
        case ItemType.BOARD:
          const board = item as Board;
          board.openDialog();
          break;
        case ItemType.POLICE_NPC:
          const npc = item as PoliceNPC;
          npc.openDialog();
          break;
        case ItemType.BANKER:
          const banker = item as Banker;
          banker.openDialog();
          break;
        case ItemType.QUIZMACHINE:
          const quizItem = item as QuizMachine;
          quizItem.openDialog();
          break;
        case ItemType.COMPUTER:
          const computer = item as Computer;
          computer.onOpenSite();
          break;
      }
    }

    // console.log(this.x, this.y);
    // console.log(this.playerName.x, this.playerName.y);

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
