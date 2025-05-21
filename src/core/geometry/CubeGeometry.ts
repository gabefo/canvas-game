import { Geometry } from "./Geometry";

export class CubeGeometry extends Geometry {
  constructor(width: number, height: number, depth: number) {
    super(width, height, depth);
  }

  protected getVertices(): Float32Array {
    const hw = this.width / 2;
    const hh = this.height / 2;
    const hd = this.depth / 2;
    return new Float32Array([
      -hw,
      -hh,
      hd,
      hw,
      -hh,
      hd,
      hw,
      hh,
      hd,
      -hw,
      hh,
      hd,
      -hw,
      -hh,
      -hd,
      hw,
      -hh,
      -hd,
      hw,
      hh,
      -hd,
      -hw,
      hh,
      -hd,
    ]);
  }

  protected getIndices(): Uint16Array {
    return new Uint16Array([
      // Front
      0, 1, 2, 0, 2, 3,
      // Right
      1, 5, 6, 1, 6, 2,
      // Back
      5, 4, 7, 5, 7, 6,
      // Left
      4, 0, 3, 4, 3, 7,
      // Top
      3, 2, 6, 3, 6, 7,
      // Bottom
      4, 5, 1, 4, 1, 0,
    ]);
  }
}
