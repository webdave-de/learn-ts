interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
}
const display = document.querySelector('.display');

// Leinwand
// Festergrösse
const height = innerHeight -150;
const width = innerWidth-5;

const canvas = document.querySelector('canvas');
canvas.height = height
canvas.width = width
const ctx = canvas.getContext('2d');

let playerX = 200;
let playerY = 200;

let xVelocity = 0;
let yVelocity = 0;
let gravity = 0.5;

let onGround = false;
let holdLeft = false;
let holdRight = false;

const platforms: IPlatform[] = [];

for (let i = 0; i < 50; i++) {
  platforms.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    w: Math.random() * 100 + 30,
    h: Math.random() * 30 + 20
  });
}

const update = () => {
    console.log('update')
//   onGround = false;
  if (holdLeft) {
    xVelocity += -2;
  }
  if (holdRight) {
    xVelocity += 2;
  }
  if(!holdLeft && !holdRight){
      xVelocity = 0;
  }
  playerX += xVelocity;
  playerY += yVelocity;

  for (let p of platforms) {
    if (
      playerX > p.x &&
      playerX < p.x + p.w &&
      playerY > p.y &&
      playerY < p.y + p.h
    ) {
      playerY = p.y;
      onGround = true;
      yVelocity = 0
    }
  }
  if(onGround){
      xVelocity *=0.8
  } else{
      yVelocity += gravity
  }

display.innerHTML = `
Player:
x: ${playerX}
y: ${playerY}
xVelocity: ${xVelocity}
yVelocity: ${yVelocity}
`
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX - 5, playerY - 20, 10, 20);
  ctx.fillStyle = "green";
  for (let pl of platforms) {
    ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
  }
};
const keyUp = evt => {
  switch (evt.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 38:
    //   if (yVelocity < -3) {
        yVelocity = 10;
    //   }
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
      if (onGround) {
        yVelocity = -10;
      }
      break;
    case 39:
      holdRight = true;
      break;
  }
};

setInterval(update, 1000/30);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
