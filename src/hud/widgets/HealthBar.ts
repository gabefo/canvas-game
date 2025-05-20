import { HUDWidget } from "./HUDWidget";

export class HealthBar extends HUDWidget {
  update(deltaTime: number): void {}

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(20, window.innerHeight - 60, 400, 40);
  }
}
