import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import { openATM } from "../../modules/slices/modalSlice";

export default class CashMachine extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.CASHMACHINE;
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 ATM기를 사용할 수 있어요.");
  }

  openDialog() {
    // store.dispatch(setComponent("ATM"));
    store.dispatch(openATM());
  }
}
