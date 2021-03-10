import { Platform } from "./platform";

export class Game {
  public gravity = 0.5;
  public platforms: Platform[] = [];
  constructor(public canvas: HTMLCanvasElement) {
    for (let i = 0; i < 50; i++) {
      this.platforms.push(
        new Platform(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 100 + 30,
          Math.random() * 30 + 20
        )
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawPlatforms(ctx: CanvasRenderingContext2D) {
    for (let pl of this.platforms) {
      pl.draw(ctx);
    }
  }

  displayStats(display: HTMLPreElement, innerhtml: string) {
    display.innerHTML = innerhtml;
  }
}
