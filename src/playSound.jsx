import s01 from "./assets/sword01.mp3";
import s02 from "./assets/sword02.mp3";
import s03 from "./assets/sword03.mp3";
import s04 from "./assets/sword04.mp3";
import s05 from "./assets/sword05.mp3";
import s06 from "./assets/sword06.mp3";
import s07 from "./assets/sword07.mp3";
import s08 from "./assets/sword08.mp3";
import s09 from "./assets/sword09.mp3";
import d01 from "./assets/dragon01.mp3";
import d02 from "./assets/dragon02.mp3";
import d03 from "./assets/dragon03.mp3";
import d04 from "./assets/dragon04.mp3";
import d05 from "./assets/dragon05.mp3";
import d06 from "./assets/dragon06.mp3";

const dragonSfx = [d01, d02, d03, d04, d05, d06];
const swordSfx = [s01, s02, s03, s04, s05, s06, s07, s08, s09];

const preloadedSwordSfx = swordSfx.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
});

// Preload dragon sounds
const preloadedDragonSfx = dragonSfx.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
});

const randomSwordSound = () => {
  const random = Math.floor(Math.random() * preloadedSwordSfx.length);
  return preloadedSwordSfx[random];
};

const randomDragonSound = () => {
  const random = Math.floor(Math.random() * preloadedDragonSfx.length);
  return preloadedDragonSfx[random];
};

const playSound = (player) => {
  if (player == "X") {
    randomSwordSound().play();
  } else {
    randomDragonSound().play();
  }
};

export default playSound;
