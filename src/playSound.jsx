import o02 from "./assets/o02.mp3";
import o03 from "./assets/o03.mp3";
import winSound from "./assets/x03.mp3";
import reset from "./assets/reset.mp3";

const xSfx = [o02];
const oSfx = [o03];

const preloadedxSfx = xSfx.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
});

// Preload dragon sounds
const preloadedoSfx = oSfx.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
});

// Preload winner
const winner = () => {
  const audio = new Audio(winSound);
  audio.preload = "auto";
  audio.load();
  return audio;
};

// Preload reset
const resets = () => {
  const audio = new Audio(reset);
  audio.preload = "auto";
  audio.load();
  return audio;
};

const randomxSound = () => {
  const random = Math.floor(Math.random() * preloadedxSfx.length);
  return preloadedxSfx[random];
};

const randomoSound = () => {
  const random = Math.floor(Math.random() * preloadedoSfx.length);
  return preloadedoSfx[random];
};

const playSound = (player) => {
  if (player == "X") {
    randomoSound().play();
  } else if (player == "O") {
    randomxSound().play();
  } else if (player == "win") {
    winner().play();
  } else if (player == "reset") {
    resets().play();
  }
};

export default playSound;
