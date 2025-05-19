import type { World } from "./World";

export abstract class GameObject {
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;
  rotation: number = 0;
  world: World | null = null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    return this;
  }

  setRotation(rotation: number) {
    this.rotation = rotation;
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

  abstract update(deltaTime: number): void;

  abstract render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void;
}
