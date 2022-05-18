import Item from "./Item";
import { ItemType } from "./Item";
import { store } from "../../modules/store";
import { openQuiz } from "../../modules/slices/modalSlice";

export default class QuizMachine extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.QUIZMACHINE;
  }

  onOverlapDialog() {
    this.setDialogBox("E를 눌러 퀴즈를 풀어보세요.");
  }

  openDialog() {
    store.dispatch(openQuiz());
  }
}
