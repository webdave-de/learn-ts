import { Game } from "./game";
import { Player } from "./player";
import { blockSize } from "./utils";

const display = document.querySelector("pre");


const height = innerHeight - 150;
const width = innerWidth - 5;
const bloxY = parseInt((width/blockSize).toFixed(0),10)
const bloxX = parseInt((height/blockSize).toFixed(0),10)

const canvas = document.querySelector("canvas");
canvas.height = bloxX*blockSize;
canvas.width = bloxY*blockSize;;

const game = new Game(canvas, display, new Player());

const update = () => {
  game.tick();
};
const keyUp = evt => {
  game.keyUp(evt.keyCode);
};
const keyDown = evt => {
  game.keyDown(evt.keyCode);
};

setInterval(update, 1000 / 30);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
