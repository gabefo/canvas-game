import { Transform } from "./Transform";
import type { World } from "./World";

export abstract class GameObject extends Transform {
  width: number;
  height: number;
  depth: number;
  world: World | null = null;

  constructor(width: number, height: number, depth: number) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;
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
