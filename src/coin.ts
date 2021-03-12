import { blockSize } from './utils';

export class Coin {
  sprite;
  w = blockSize;
  h = blockSize;
  constructor(
    public x: number,
    public y: number
  ) {
    const _sprite = new Image();
    _sprite.src = './img/coin_rex.png';
    _sprite.onload = () => (this.sprite = _sprite);
  }

  draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
          this.sprite,
          this.x,
          this.y,
          this.w,
          this.h
        );
  }
}
