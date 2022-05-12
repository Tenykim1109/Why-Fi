import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import { open } from "../../modules/slices/modalSlice";

export default class Banker extends Item {
  bankerType!: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.BANKER;
    console.log(this);
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 계좌를 만드세요.");
  }

  openDialog() {
    store.dispatch(open());
  }
}
