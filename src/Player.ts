import { GameObject } from "./GameObject";

export class Player extends GameObject {
  speed: number = 0.5;

  constructor() {
    super(40, 40);
  }

  move(distance: number, angle: number) {
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    return this.setPosition(this.x + dx, this.y + dy);
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

    const { speed } = this;

    const { controller } = world.game;

    let vx = 0;
    let vy = 0;

    if (controller.isKeyPressed("ArrowRight") || controller.isKeyPressed("d")) {
      vx++;
    }

    if (controller.isKeyPressed("ArrowLeft") || controller.isKeyPressed("a")) {
      vx--;
    }

    if (controller.isKeyPressed("ArrowDown") || controller.isKeyPressed("s")) {
      vy++;
    }

    if (controller.isKeyPressed("ArrowUp") || controller.isKeyPressed("w")) {
      vy--;
    }

    if (vx !== 0 || vy !== 0) {
      this.move(dt * speed, Math.atan2(vy, vx));
    }
  }
}
