import { Geometry } from "./Geometry";

export class CylinderGeometry extends Geometry {
  private segments: number;

  constructor(radius: number, height: number, segments: number = 32) {
    super(radius * 2, height, radius * 2);
    this.segments = segments;
  }

  protected getVertices(): Float32Array {
    const verts: number[] = [];
    const halfHeight = this.height / 2;

    verts.push(0, halfHeight, 0);
    verts.push(0, -halfHeight, 0);

    for (let i = 0; i <= this.segments; i++) {
      const theta = (i / this.segments) * Math.PI * 2;
      const x = Math.cos(theta) * (this.width / 2);
      const z = Math.sin(theta) * (this.depth / 2);

      verts.push(x, halfHeight, z);
      verts.push(x, -halfHeight, z);
    }

    return new Float32Array(verts);
  }

  protected getIndices(): Uint16Array {
    const indices: number[] = [];
    const topCenter = 0;
    const bottomCenter = 1;

    for (let i = 0; i < this.segments; i++) {
      const topEdge1 = 2 + i * 2;
      const topEdge2 = 2 + ((i + 1) % this.segments) * 2;
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
