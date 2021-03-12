import { shades } from './img/shades.base64';
import { blockSize } from './utils';

export class Platform {
  bloxX: number;
  bloxY: number;
  sprite;
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    private shadeX:number,
    private shadeY:number
  ) {
    this.bloxX = parseInt((this.w / blockSize).toFixed(0), 10);
    this.bloxY = parseInt((this.h / blockSize).toFixed(0), 10);
    const _sprite = new Image();
    _sprite.src = shades
    _sprite.onload = () => (this.sprite = _sprite);
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i <= this.bloxX; i++) {
      for (let j = 0; j <= this.bloxY; j++) {
        ctx.drawImage(
          this.sprite,
          this.shadeX * 300,
          this.shadeY * 300,
          300,
          300,
          this.x + i * blockSize,
          this.y,
          blockSize,
          blockSize
        );
      }
    }
  }
}
