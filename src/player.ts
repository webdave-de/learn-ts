import { Platform } from "./platform";

export class Player {
  public onGround = false;
  public velocity = {
    x: 0,
    y: 0
  };
  public move = { left: false, right: false };
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public color = "blue"
  ) {}

  run(holdLeft: boolean, holdRight: boolean, canvas: HTMLCanvasElement) {
    this.onGround = false;
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
      this.onGround = true;
      this.velocity.y = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w, this.y - this.h, this.w, this.h);
  }
  draw2(ctx: CanvasRenderingContext2D) {
    ctx.font = "30px Arial";
    ctx.fillText("🐄", this.x, this.y);
  }
}
