import type { Game } from "@core/Game";
import type { Player } from "@player/Player";
import { mat4, vec3 } from "gl-matrix";

export class Camera {
  readonly game: Game;

  target: Player | null = null;
  height: number = 2;
  distance: number = 3;

  constructor(game: Game) {
    this.game = game;
  }

  getViewMatrix(): mat4 {
    const { target } = this;

    if (!target) {
      return mat4.create();
    }

    const { height, distance } = this;
    const { position, rotation, headPitch } = target;

    const center = vec3.fromValues(
      position[0],
      position[1] + height,
      position[2]
    );

    const offset = vec3.fromValues(
      Math.sin(rotation[1]) * Math.cos(rotation[0]) * distance,
      Math.sin(rotation[0] + headPitch) * distance,
      Math.cos(rotation[1]) * Math.cos(rotation[0]) * distance
    );

    const eye = vec3.create();
    vec3.subtract(eye, center, offset);

    const up = vec3.fromValues(0, 1, 0);

    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, eye, center, up);
    return viewMatrix;
  }

  setTarget(target: Player | null) {
    this.target = target;
    return this;
  }
}
