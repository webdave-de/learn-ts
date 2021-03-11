import { blockSize } from "./utils";

export class Platform {
  
  bloxX: number;
  bloxY: number;
  sprite
    constructor(
      public x: number,
      public y: number,
      public w: number,
      public h: number,
      public color = "#333333"
    ) {
      
    this.bloxX = parseInt((this.w / blockSize).toFixed(0), 10);
    this.bloxY = parseInt((this.h / blockSize).toFixed(0), 10);
    console.log(this.bloxX, this.bloxY)
    const _sprite = new Image()
    _sprite.src = './img/sprite.png';
    _sprite.onload = ()=> this.sprite = _sprite

    }
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      const sx = 2;
    const sy = 2;
    for(let i=0;i<=this.bloxX; i++){
      for(let j=0;j<=this.bloxY; j++){
        ctx.drawImage(this.sprite, sx*300, sy*300,300,300,(this.x+i*blockSize), this.y, blockSize, blockSize)
      }
    }
    }
  }
  