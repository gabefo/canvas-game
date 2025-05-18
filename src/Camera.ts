import type { Game } from "./Game";
import type { GameObject } from "./GameObject";

export class Camera {
  readonly game: Game;

  x: number = 0;
  y: number = 0;
  zoom: number = 1;
  target: GameObject | null = null;

  constructor(game: Game) {
    this.game = game;
  }

  setPosition(x: number, y: number) {
    const { world } = this.game;

    const screenHalfWidth = window.innerWidth / 2;
    const screenHalfHeight = window.innerHeight / 2;

    const minX = screenHalfWidth;
    const maxX = world.width - screenHalfWidth;
    const minY = screenHalfHeight;
    const maxY = world.height - screenHalfHeight;

    this.x = Math.min(Math.max(x, minX), maxX);
    this.y = Math.min(Math.max(y, minY), maxY);
    return this;
  }

  move(dx: number, dy: number) {
    return this.setPosition(this.x + dx, this.y + dy);
  }

  setTarget(target: GameObject | null) {
    this.target = target;

    if (target !== null) {
      this.setPosition(target.x, target.y);
    }

    return this;
  }
}
