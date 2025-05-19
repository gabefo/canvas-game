import { GameObject } from "./GameObject";

export class Player extends GameObject {
  speed: number = 0.5;

  constructor() {
    super(40, 40);
  }

  move(distance: number, angle: number) {
    let x = this.x + Math.cos(angle) * distance;
    let y = this.y + Math.sin(angle) * distance;

    const { world } = this;

    if (world !== null) {
      const minX = 0;
      const maxX = world.width - this.width;
      const minY = 0;
      const maxY = world.height - this.height;

      if (x < minX) {
        x = minX;
      } else if (x > maxX) {
        x = maxX;
      }

      if (y < minY) {
        y = minY;
      } else if (y > maxY) {
        y = maxY;
      }
    }

    return this.setPosition(x, y);
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { world } = this;

    if (!world) return;

    ctx.save();
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }

  update(dt: number) {
    const { world } = this;

    if (!world) return;

    const { controller } = world.game;

    let vx = 0;
    let vy = 0;

    if (
      controller.isKeyPressed("ArrowRight") ||
      controller.isKeyPressed("KeyD")
    ) {
      vx++;
    }

    if (
      controller.isKeyPressed("ArrowLeft") ||
      controller.isKeyPressed("KeyA")
    ) {
      vx--;
    }

    if (
      controller.isKeyPressed("ArrowDown") ||
      controller.isKeyPressed("KeyS")
    ) {
      vy++;
    }

    if (controller.isKeyPressed("ArrowUp") || controller.isKeyPressed("KeyW")) {
      vy--;
    }

    if (vx !== 0 || vy !== 0) {
      const multiplier = controller.isKeyPressed("ShiftLeft") ? 1.5 : 1;
      this.move(dt * this.speed * multiplier, Math.atan2(vy, vx));
    }
  }
}
