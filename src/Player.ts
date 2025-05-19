import { GameObject } from "./GameObject";

export class Player extends GameObject {
  speed: number = 0.5;

  constructor() {
    super(40, 40);
  }

  move(distance: number, angle: number) {
    const a = angle + this.rotation;
    let x = this.x + Math.cos(a) * distance;
    let y = this.y + Math.sin(a) * distance;

    const { world } = this;

    if (world) {
      const minX = this.width / 2;
      const maxX = world.width - this.width / 2;
      const minY = this.height / 2;
      const maxY = world.height - this.height / 2;

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

  rotate(delta: number) {
    this.rotation += delta;
    return this;
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { world } = this;

    if (!world) return;

    const { x, y, width, height, rotation } = this;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.fill();
    ctx.restore();
  }

  update(deltaTime: number) {
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
      this.move(deltaTime * this.speed * multiplier, Math.atan2(vy, vx));
    }
  }
}
