import type { World } from "./World";

export abstract class GameObject {
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;
  world: World | null = null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    if (this.world && this.world.game.camera.target === this) {
      this.world.game.camera.setPosition(this.centerX, this.centerY);
    }

    return this;
  }

  addTo(world: World) {
    if (!this.world) {
      world.objects.push(this);
      this.world = world;
    }

    return this;
  }

  remove() {
    if (this.world) {
      this.world.objects.filter((obj) => obj !== this);
      this.world = null;
    }

    return this;
  }

  abstract update(dt: number): void;

  abstract render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void;
}
