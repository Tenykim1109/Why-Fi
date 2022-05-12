import Item from "./Item";
import { ItemType } from "./Item";

export default class Computer extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.COMPUTER;
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 컴퓨터를 사용할 수 있어요.");
  }

  onOpenSite() {
    window.open("https://www.naver.com");
  }
}
