import { GameObject } from "./GameObject";

export class Player extends GameObject {
  speed: number = 0.5;

  constructor() {
    super(40, 40);
  }

  move(dx: number, dy: number) {
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

    const delta = dt * speed;

    let dx = 0,
      dy = 0;

    if (controller.isKeyPressed("ArrowRight") || controller.isKeyPressed("d")) {
      dx += delta;
    }

    if (controller.isKeyPressed("ArrowLeft") || controller.isKeyPressed("a")) {
      dx -= delta;
    }

    if (controller.isKeyPressed("ArrowDown") || controller.isKeyPressed("s")) {
      dy += delta;
    }

    if (controller.isKeyPressed("ArrowUp") || controller.isKeyPressed("w")) {
      dy -= delta;
    }

    this.move(dx, dy);
  }
}
