import type { mat4 } from "gl-matrix";
import { Transform } from "./Transform";
import type { World } from "./World";

export abstract class GameObject extends Transform {
  world: World | null = null;

  constructor() {
    super();
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
    gl: WebGL2RenderingContext,
    projection: mat4,
    view: mat4
  ): void;
}
