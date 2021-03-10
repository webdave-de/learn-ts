export class Platform {
    constructor(
      public x: number,
      public y: number,
      public w: number,
      public h: number,
      public color = "#333333"
    ) {}
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
  