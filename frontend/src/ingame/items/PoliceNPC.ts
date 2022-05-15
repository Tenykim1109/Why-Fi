import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import { openQnA } from "../../modules/slices/modalSlice";

export default class PoliceNPC extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.POLICE_NPC;
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 도움을 받으세요.");
  }

  openDialog() {
    // store.dispatch(setComponent("QnA"));
    store.dispatch(openQnA());
  }
}
