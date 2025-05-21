import { Geometry } from "./Geometry";

export class CylinderGeometry extends Geometry {
  radiusTop: number;
  radiusBottom: number;
  height: number;

  private radialSegments: number;

  constructor(
    radiusTop: number,
    radiusBottom: number,
    height: number,
    radialSegments: number = 32
  ) {
    super();
    this.radiusTop = radiusTop;
    this.radiusBottom = radiusBottom;
    this.height = height;
    this.radialSegments = radialSegments;
  }

  protected getVertices(): Float32Array {
    const verts: number[] = [];
    const { radiusTop, radiusBottom, height } = this;
    const halfHeight = height / 2;

    verts.push(0, halfHeight, 0);
    verts.push(0, -halfHeight, 0);

    for (let i = 0; i <= this.radialSegments; i++) {
      const theta = (i / this.radialSegments) * Math.PI * 2;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      verts.push(cosTheta * radiusTop, halfHeight, sinTheta * radiusTop);
      verts.push(cosTheta * radiusBottom, -halfHeight, sinTheta * radiusBottom);
    }

    return new Float32Array(verts);
  }

  protected getIndices(): Uint16Array {
    const indices: number[] = [];
    const topCenter = 0;
    const bottomCenter = 1;

    for (let i = 0; i < this.radialSegments; i++) {
      const topEdge1 = 2 + i * 2;
      const topEdge2 = 2 + ((i + 1) % this.radialSegments) * 2;
      const bottomEdge1 = topEdge1 + 1;
      const bottomEdge2 = topEdge2 + 1;

      indices.push(topCenter, topEdge2, topEdge1);
      indices.push(bottomCenter, bottomEdge1, bottomEdge2);
      indices.push(topEdge1, topEdge2, bottomEdge2);
      indices.push(topEdge1, bottomEdge2, bottomEdge1);
    }

    return new Uint16Array(indices);
  }
}
