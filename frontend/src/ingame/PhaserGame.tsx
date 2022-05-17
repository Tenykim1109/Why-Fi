import React from "react";
import Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import ButtonUI from "./scenes/ButtonUI";

export default class PhaserGame extends React.Component {
  // component가 웹에 연결될 때 실행. 개발모드에서는 2회, 배포했을 때는 한번만
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      autoFocus: true,
      scene: [Preloader, Game, ButtonUI],
    };

    new Phaser.Game(config);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game"></div>;
  }
}
