import { GameObject } from "@world/GameObject";

export class Player extends GameObject {
  speed: number = 0.5;

  constructor() {
    super(40, 40, 40);
  }

  move(distance: number, angle: number) {
    const a = angle + this.rotationX;
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

    return this.setPosition(x, y, this.z);
  }

  rotate(delta: number) {
    this.setRotation(this.rotationX + delta, this.rotationY, this.rotationZ);
    return this;
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { world } = this;

    if (!world) return;

    const { x, y, width, height, rotationX: rotation } = this;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(-width / 2, height / 2);
    ctx.lineTo(0, -height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(0, height / 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update(deltaTime: number) {
    const { world } = this;

    if (!world) return;

    const { input: controller } = world.game;

    let vx = 0;
    let vy = 0;

    if (controller.isKeyDown("ArrowRight") || controller.isKeyDown("KeyD")) {
      vx++;
    }

    if (controller.isKeyDown("ArrowLeft") || controller.isKeyDown("KeyA")) {
      vx--;
    }

    if (controller.isKeyDown("ArrowDown") || controller.isKeyDown("KeyS")) {
      vy++;
    }

    if (controller.isKeyDown("ArrowUp") || controller.isKeyDown("KeyW")) {
      vy--;
    }

    if (vx !== 0 || vy !== 0) {
      const multiplier = controller.isKeyDown("ShiftLeft") ? 1.5 : 1;
      this.move(deltaTime * this.speed * multiplier, Math.atan2(vy, vx));
    }
  }
}
