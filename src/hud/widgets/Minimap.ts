import { HUDWidget } from "./HUDWidget";

export class Minimap extends HUDWidget {
  update(deltaTime: number): void {}

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(20, 20, 200, 200);
  }
}
