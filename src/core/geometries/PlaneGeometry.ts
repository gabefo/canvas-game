import { Geometry } from "./Geometry";

export class PlaneGeometry extends Geometry {
  constructor(width: number, depth: number) {
    super(width, 1, depth);
  }

  protected getVertices(): Float32Array {
    const hw = this.width / 2;
    const hd = this.depth / 2;
    return new Float32Array([
      -hw,
      0.0,
      -hd,
      hw,
      0.0,
      -hd,
      hw,
      0.0,
      hd,
      -hw,
      0.0,
      hd,
    ]);
  }

  protected getIndices(): Uint16Array {
    return new Uint16Array([0, 1, 2, 0, 2, 3]);
  }
}
