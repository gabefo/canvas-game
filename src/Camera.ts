import type { Game } from "./Game";
import type { GameObject } from "./GameObject";

export class Camera {
  readonly game: Game;

  x: number = 0;
  y: number = 0;
  rotation: number = 0;
  zoom: number = 1;
  target: GameObject | null = null;

  constructor(game: Game) {
    this.game = game;
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
      this.setPosition(target.x, target.y);
      this.setRotation(target.rotation);
    }
  }
}
