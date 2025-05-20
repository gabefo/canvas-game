import type { Game } from "../core/Game";
import type { GameObject } from "./GameObject";
import { Transform } from "./Transform";

export class Camera extends Transform {
  readonly game: Game;

  zoom: number = 1;
  target: GameObject | null = null;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  setZoom(zoom: number) {
    this.zoom = zoom;
    return this;
  }

  setTarget(target: GameObject | null) {
    this.target = target;
    this.update(0);
    return this;
  }

  update(deltaTime: number) {
    const { target } = this;

    if (target) {
      this.setPosition(target.x, target.y, target.z);
      this.setRotation(target.rotationX, target.rotationY, target.rotationZ);
    }
  }
}
