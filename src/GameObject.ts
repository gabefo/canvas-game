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

  addTo(world: World) {
    if (this.world === null) {
      world.objects.push(this);
      this.world = world;
    }

    return this;
  }

  remove() {
    if (this.world !== null) {
      this.world.objects.filter((obj) => obj !== this);
      this.world = null;
    }

    return this;
  }

  setPosition(x: number, y: number) {
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

    this.x = x;
    this.y = y;

    if (this.world !== null && this.world.game.camera.target === this) {
      this.world.game.camera.setPosition(x, y);
    }

    return this;
  }

  abstract update(dt: number): void;

  abstract render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void;
}
