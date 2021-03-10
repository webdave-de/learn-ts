import { Game } from "./game";
import { Player } from "./player";

const display = document.querySelector("pre");

const height = innerHeight - 150;
const width = innerWidth - 5;

const canvas = document.querySelector("canvas");
canvas.height = height;
canvas.width = width;
const ctx = canvas.getContext("2d");

let gravity = 0.5;

let holdLeft = false;
let holdRight = false;

const player = new Player(200, 200, 10, 20);
const game = new Game(canvas);

const update = () => {
  player.run(holdLeft, holdRight, canvas);

  for (let p of game.platforms) {
    player.isOnGround(p);
  }
  if (player.onGround) {
    player.velocity.x *= 0.8;
  } else {
    player.velocity.y += gravity;
  }
  game.displayStats(
    display,
    `
    🐄
canvas:
h: ${canvas.height}
w: ${canvas.width}
-----
Player:
x: ${player.x}
y: ${player.y}
`
  );
  game.draw(ctx);

  game.drawPlatforms(ctx);
  player.draw(ctx);
};
const keyUp = evt => {
  switch (evt.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 38:
      if (player.velocity.y < -3) {
        player.velocity.y = -3;
      }
      break;
    case 39:
      holdRight = false;
      break;
  }
};
const keyDown = evt => {
  switch (evt.keyCode) {
    case 37:
      holdLeft = true;
      break;
    case 38:
      if (player.onGround) {
        player.velocity.y = -10;
      }
      break;
    case 39:
      holdRight = true;
      break;
  }
};

setInterval(update, 1000 / 30);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
