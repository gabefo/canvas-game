import { Geometry } from "./Geometry";

export class TorusGeometry extends Geometry {
  radius: number;
  tube: number;
  private radialSegments: number;
  private tubularSegments: number;

  constructor(
    radius: number,
    tube: number,
    radialSegments: number = 16,
    tubularSegments: number = 32
  ) {
    super();
    this.radius = radius;
    this.tube = tube;
    this.radialSegments = radialSegments;
    this.tubularSegments = tubularSegments;
  }

  protected getVertices(): Float32Array {
    const verts: number[] = [];
    const { radius, tube, radialSegments, tubularSegments } = this;

    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2;
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);

      for (let i = 0; i <= tubularSegments; i++) {
        const u = (i / tubularSegments) * Math.PI * 2;
        const cosU = Math.cos(u);
        const sinU = Math.sin(u);

        const x = (radius + tube * cosV) * cosU;
        const y = (radius + tube * cosV) * sinU;
        const z = tube * sinV;

        verts.push(x, z, y);
      }
    }

    return new Float32Array(verts);
  }

  protected getIndices(): Uint16Array {
    const { radialSegments, tubularSegments } = this;
    const indices: number[] = [];

    for (let j = 0; j < radialSegments; j++) {
      for (let i = 0; i < tubularSegments; i++) {
        const a = (tubularSegments + 1) * j + i;
        const b = (tubularSegments + 1) * (j + 1) + i;
        const c = (tubularSegments + 1) * (j + 1) + i + 1;
        const d = (tubularSegments + 1) * j + i + 1;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    return new Uint16Array(indices);
  }
}
