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

    const viewWidth = window.innerWidth / this.zoom;
    const viewHeight = window.innerHeight / this.zoom;

    const minX = viewWidth / 2;
    const maxX = world.width - minX;
    const minY = viewHeight / 2;
    const maxY = world.height - minY;

    this.x = Math.min(Math.max(x, minX), maxX);
    this.y = Math.min(Math.max(y, minY), maxY);

    return this;
  }

  setZoom(zoom: number) {
    this.zoom = zoom;

    let x: number;
    let y: number;

    const { target } = this;

    if (target) {
      x = target.centerX;
      y = target.centerY;
    } else {
      x = this.x;
      y = this.y;
    }

    this.setPosition(x, y);

    return this;
  }

  setTarget(target: GameObject | null) {
    this.target = target;

    if (target) {
      this.setPosition(target.centerX, target.centerY);
    }

    return this;
  }
}
