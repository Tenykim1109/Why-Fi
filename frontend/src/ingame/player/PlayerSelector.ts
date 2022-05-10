import Phaser from "phaser";
import MyPlayer from "./MyPlayer";
import Item from "../items/Item";

export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item; // 근처로 가면 선택되는 것

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);

    scene.physics.add.existing(this);
  }

  update(player: MyPlayer, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) {
      return;
    }

    const { x, y } = player;
    if (cursors.left?.isDown) {
      this.setPosition(x - 32, y);
    } else if (cursors.right?.isDown) {
      this.setPosition(x + 32, y);
    } else if (cursors.up?.isDown) {
      this.setPosition(x, y - 32);
    } else if (cursors.down?.isDown) {
      this.setPosition(x, y + 32);
    }

    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox();
        this.selectedItem = undefined;
      }
    }
  }
}
