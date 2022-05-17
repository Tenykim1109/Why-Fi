import Phaser from "phaser";
import { store } from "../../modules/store";
import { openMenu } from "../../modules/slices/modalSlice";

export default class ButtonUI extends Phaser.Scene {
  constructor() {
    super({ key: "button-ui" });
  }

  create() {
    const { width, height } = this.scale;

    // 페이지 하단 메뉴버튼 추가
    this.add
      .image(width - 64, height - 64, "button")
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        // 클릭했을 때 마이페이지 모달 띄우기
        console.log("click!");
        store.dispatch(openMenu());
      });
  }
}
