import { Geometry } from "./Geometry";

export class SphereGeometry extends Geometry {
  radius: number;

  private widthSegments: number;
  private heightSegments: number;

  constructor(
    radius: number,
    widthSegments: number = 32,
    heightSegments: number = 16
  ) {
    super();
    this.radius = radius;
    this.widthSegments = Math.max(3, widthSegments);
    this.heightSegments = Math.max(2, heightSegments);
  }

  protected getVertices(): Float32Array {
    const verts: number[] = [];
    const { radius } = this;

    for (let y = 0; y <= this.heightSegments; y++) {
      const v = y / this.heightSegments;
      const theta = v * Math.PI;

      for (let x = 0; x <= this.widthSegments; x++) {
        const u = x / this.widthSegments;
        const phi = u * Math.PI * 2;

        const px = -radius * Math.cos(phi) * Math.sin(theta);
        const py = radius * Math.cos(theta);
        const pz = radius * Math.sin(phi) * Math.sin(theta);

        verts.push(px, py, pz);
      }
    }
    return new Float32Array(verts);
  }

  protected getIndices(): Uint16Array {
    const indices: number[] = [];

    for (let y = 0; y < this.heightSegments; y++) {
      for (let x = 0; x < this.widthSegments; x++) {
        const a = y * (this.widthSegments + 1) + x;
        const b = a + this.widthSegments + 1;

        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }
    return new Uint16Array(indices);
  }
}
