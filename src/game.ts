import { Coin } from './coin';
import { shades } from './img/shades.base64';
import { Platform } from './platform';
import { Player } from './player';
import { blockSize } from './utils';

export class Game {
  public gravity = 0.5;
  public platforms: Platform[] = [];
  public coins: Coin[] = [];
  private ctx: CanvasRenderingContext2D;
  private leftDown = false;
  private rightDown = false;
  sprite;
  bloxX: number;
  bloxY: number;
  shadeX = 1;
  shadeY = 2;
  constructor(
    public canvas: HTMLCanvasElement,
    public display: HTMLPreElement,
    public player: Player
  ) {
    this.bloxY = parseInt((this.canvas.width / blockSize).toFixed(0), 10);
    this.bloxX = parseInt((this.canvas.height / blockSize).toFixed(0), 10);
    this.ctx = this.canvas.getContext('2d');

    const _sprite = new Image();
    // _sprite.src = './img/sprite.png';
    _sprite.src = shades;
    _sprite.onload = () => (this.sprite = _sprite);

    this.start(
      Math.floor(Math.random() * 31) + 1,
      Math.floor(Math.random() * 11) + 1,
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4)
    );
  }

  start(blox: number, coinz: number, shadeX: number, shadeY: number) {
    console.log(shadeX, shadeY);
    this.shadeX = shadeX;
    this.shadeY = shadeY;

    for (let i = 0; i < blox; i++) {
      this.platforms.push(
        new Platform(
          (Math.floor(Math.random() * this.bloxX) + 1) * blockSize,
          (Math.floor(Math.random() * this.bloxX) + 1) * blockSize,
          (Math.floor(Math.random() * 6) + 1) * blockSize,
          blockSize,
          shadeY,
          shadeX
        )
      );
    }
    for (let i = 0; i < coinz; i++) {
      this.coins.push(
        new Coin(
          (Math.floor(Math.random() * this.bloxX) + 1) * blockSize,
          (Math.floor(Math.random() * this.bloxX) + 1) * blockSize
        )
      );
    }
  }

  draw() {
    this.drawBackground();
  }

  drawBackground() {
    for (let i = 0; i <= this.bloxX; i++) {
      for (let j = 0; j <= this.bloxY; j++) {
        this.ctx.drawImage(
          this.sprite,
          this.shadeX * 300,
          this.shadeY * 300,
          300,
          300,
          j * blockSize,
          i * blockSize,
          blockSize,
          blockSize
        );
      }
    }
  }

  drawPlatforms(ctx: CanvasRenderingContext2D) {
    for (let pl of this.platforms) {
      pl.draw(ctx);
    }
  }

  drawCoins(ctx: CanvasRenderingContext2D) {
    for (let c of this.coins) {
      c.draw(ctx);
    }
  }

  displayStats(innerhtml: string) {
    // this.display.innerHTML = innerhtml;
  }

  tick() {
    this.player.run(this.leftDown, this.rightDown, this.canvas);

    for (let p of this.platforms) {
      this.player.isOnGround(p);
    }

    for (let i = 0; i < this.coins.length; i++) {
      const c = this.coins[i];
      if (this.player.collectCoin(c)) {
        this.coins.splice(i, 1);
      }
    }

    if (this.player.onGround) {
      this.player.velocity.x *= 0.8;
    } else {
      this.player.velocity.y += this.gravity;
    }
    this.draw();

    this.drawPlatforms(this.ctx);
    this.drawCoins(this.ctx);

    this.displayStats(
      `
        🐄
    canvas:
    h: ${this.canvas.height}
    w: ${this.canvas.width}
    -----
    Player:
    x: ${this.player.x}
    y: ${this.player.y}
    `
    );
    this.player.draw(this.ctx);
  }

  keyUp(keyCode: number) {
    switch (keyCode) {
      case 37:
        this.leftDown = false;
        break;
      case 38:
        if (this.player.velocity.y < -3) {
          this.player.velocity.y = -3;
        }
        break;
      case 39:
        this.rightDown = false;
        break;
    }
  }
  keyDown(keyCode: number) {
    switch (keyCode) {
      case 37:
        this.leftDown = true;
        break;
      case 38:
        if (this.player.onGround) {
          this.player.velocity.y = -10;
        }
        break;
      case 39:
        this.rightDown = true;
        break;
    }
  }
}
