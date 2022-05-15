import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import {
  openDeposit,
  openSavings,
  openRemittance,
} from "../../modules/slices/modalSlice";

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
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 계좌를 만드세요.");
  }

  openDialog() {
    // store.dispatch(setComponent(this.bankerType));
    switch (this.bankerType) {
      case "deposit":
        store.dispatch(openDeposit());
        break;
      case "savings":
        store.dispatch(openSavings());
        break;
      case "remittance":
        store.dispatch(openRemittance());
        break;
    }
  }
}
