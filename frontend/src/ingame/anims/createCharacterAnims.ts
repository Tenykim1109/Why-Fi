import Phaser from "phaser";
import { TEXTURE_BOY, TEXTURE_GIRL } from "../constants";

// 캐릭터 애니메이션 생성
export const createCharacterAnims = (
  anims: Phaser.Animations.AnimationState
) => {
  const animsFrameRate = 10;
  const characterArray = [TEXTURE_BOY, TEXTURE_GIRL];

  // 캐릭터 기본 정지상태
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-down-idle`,
      frames: [
        {
          key: val,
          frame: 0,
        },
      ],
    });
  });

  // 캐릭터 아래로 이동
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-down-walk`,
      frames: anims.generateFrameNumbers(val, {
        start: 0,
        end: 3,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  });

  // 캐릭터 왼쪽 정지
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-left-idle`,
      frames: [{ key: val, frame: 4 }],
    });
  });

  // 캐릭터 왼쪽 이동
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-left-walk`,
      frames: anims.generateFrameNumbers(val, {
        start: 4,
        end: 7,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  });

  // 캐릭터 오른쪽 정지
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-right-idle`,
      frames: [{ key: val, frame: 8 }],
    });
  });

  // 캐릭터 오른쪽 이동
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-right-walk`,
      frames: anims.generateFrameNumbers(val, {
        start: 8,
        end: 11,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  });

  // 캐릭터 위로 정지
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-up-idle`,
      frames: [{ key: val, frame: 12 }],
    });
  });

  // 캐릭터 위로 이동
  characterArray.map((val) => {
    return anims.create({
      key: `${val}-up-walk`,
      frames: anims.generateFrameNumbers(val, {
        start: 12,
        end: 15,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
  });
};
