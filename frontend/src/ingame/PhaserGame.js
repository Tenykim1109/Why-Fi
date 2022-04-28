import Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import React from "react";

export default class PhaserGame extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      pixelArt: true,
      scale: {
        // mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.5,
        zoom: 2,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      autoFocus: true,
      scene: [Preloader, Game],
    };

    console.log("안녕");
    new Phaser.Game(config);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game"></div>;
  }
}
