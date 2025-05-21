import type { Game } from "@core/Game";
import { PlaneGeometry } from "@core/geometry/PlaneGeometry";
import { Player } from "@player/Player";
import { mat4 } from "gl-matrix";
import type { GameObject } from "./GameObject";

export class World {
  readonly game: Game;
  readonly width: number = 20;
  readonly height: number = 20;
  readonly depth: number = 20;
  readonly floor: PlaneGeometry;
  readonly player: Player;
  readonly objects: GameObject[] = [];

  constructor(game: Game) {
    this.game = game;

    this.floor = new PlaneGeometry(this.width, this.depth)
      .setColor(0.5, 0.5, 0.5, 1.0)
      .setPosition(this.width / 2, 0, this.depth / 2);

    this.player = new Player()
      .setPosition(this.width / 2, 0, this.depth / 2)
      .addTo(this);
  }

  update(deltaTime: number) {
    for (const object of this.objects) {
      object.update(deltaTime);
    }
  }

  render(gl: WebGL2RenderingContext, projection: mat4, view: mat4): void {
    this.floor.render(gl, projection, view);

    for (const obj of this.objects) {
      obj.render(gl, projection, view);
    }
  }
}
