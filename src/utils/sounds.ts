import { Howl } from 'howler';

const sounds = {
  move: new Howl({
    src: ['https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3'],
    volume: 0.5,
  }),
  capture: new Howl({
    src: ['https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3'],
    volume: 0.5,
  }),
  check: new Howl({
    src: ['https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3'],
    volume: 0.5,
  }),
  gameEnd: new Howl({
    src: ['https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3'],
    volume: 0.5,
  })
};

export const playSound = (type: keyof typeof sounds) => {
  sounds[type].play();
};