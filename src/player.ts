import { Coin } from './coin';
import { Platform } from './platform';
import { blockSize } from './utils';

export class Player {
  public onGround = false;
  faceLeft = false;
  public velocity = {
    x: 0,
    y: 0,
  };
  public move = { left: false, right: false };
  sprite;
  constructor(
    public x: number = 200,
    public y: number = 200,
    public w: number = 36.4,
    public h: number = blockSize
  ) {
    const _sprite = new Image();
    _sprite.src = './img/running.png';
    _sprite.onload = () => (this.sprite = _sprite);
  }

  run(holdLeft: boolean, holdRight: boolean, canvas: HTMLCanvasElement) {
    this.onGround = false;
    this.faceLeft = holdLeft;
    if (holdLeft) {
      this.velocity.x += -2;
    }
    if (holdRight) {
      this.velocity.x += 2;
    }
    if (!holdLeft && !holdRight) {
      this.velocity.x = 0;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.stayOnCanvas(canvas);
  }

  stayOnCanvas(canvas: HTMLCanvasElement) {
    if (this.y > canvas.height) {
      this.y = canvas.height;

      this.onGround = true;
      this.velocity.y = 0;
    }

    if (this.y < 20) {
      this.y = 20;
    }
    if (this.x > canvas.width - 10) {
      this.x = canvas.width - 10;
    }

    if (this.x < 0) {
      this.x = 0;
    }
  }

  isOnGround(p: Platform) {
    if (
      this.x > p.x &&
      this.x < p.x + p.w &&
      this.y > p.y &&
      this.y < p.y + p.h
    ) {
      this.y = p.y;
      console.log(p)
      this.onGround = true;
      this.velocity.y = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const direction = this.faceLeft ? 300 : 0;
    ctx.drawImage(
      this.sprite,
      0,
      direction,
      182,
      300,
      this.x,
      this.y - blockSize,
      this.w,
      this.h
    );
  }
  draw2(ctx: CanvasRenderingContext2D) {
    ctx.font = '30px Arial';
    ctx.fillText('🐄', this.x, this.y);
  }
  collectCoin(c: Coin) {
    const playerPosition = {
      left: this.x,
      right: this.x + this.w,
      top: this.y,
      botton: this.y + this.h,
    };
    const coinPosition = {
      left: c.x,
      right: c.x + c.w,
      top: c.y,
      botton: c.y + c.h,
    };
    if (coinPosition.left > playerPosition.right) {
      return false;
    }
    if (coinPosition.right < playerPosition.left) {
      return false;
    }

    if (coinPosition.top > playerPosition.botton) {
      return false;
    }
    if (coinPosition.botton < playerPosition.top) {
      return false;
    }
    return true;
  }
}
