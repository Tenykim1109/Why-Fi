import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import { open } from "../../modules/slices/modalSlice";

export default class Board extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.BOARD;
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 주식 정보를 확인하세요.");
  }

  openDialog() {
    store.dispatch(open());
  }
}
