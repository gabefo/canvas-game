import { Geometry } from "./Geometry";

export class CapsuleGeometry extends Geometry {
  radius: number;
  height: number;
  private radialSegments: number;
  private capSegments: number;

  constructor(
    radius: number,
    height: number,
    radialSegments: number = 16,
    capSegments: number = 8
  ) {
    super();
    this.radius = radius;
    this.height = height;
    this.radialSegments = radialSegments;
    this.capSegments = capSegments;
  }

  protected getVertices(): Float32Array {
    const verts: number[] = [];
    const { radius, height, radialSegments, capSegments } = this;
    const cylinderHeight = height - 2 * radius;
    const halfCylinder = cylinderHeight / 2;

    for (let y = 0; y <= capSegments; y++) {
      const v = y / capSegments;
      const phi = (v * Math.PI) / 2;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        verts.push(
          cosTheta * radius * sinPhi,
          halfCylinder + radius * cosPhi,
          sinTheta * radius * sinPhi
        );
      }
    }

    for (let y = 0; y <= 1; y++) {
      const sign = y === 0 ? 1 : -1;
      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        verts.push(cosTheta * radius, sign * halfCylinder, sinTheta * radius);
      }
    }

    for (let y = 1; y <= capSegments; y++) {
      const v = y / capSegments;
      const phi = (v * Math.PI) / 2;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        verts.push(
          cosTheta * radius * sinPhi,
          -halfCylinder - radius * cosPhi,
          sinTheta * radius * sinPhi
        );
      }
    }

    return new Float32Array(verts);
  }

  protected getIndices(): Uint16Array {
    const { radialSegments, capSegments } = this;
    const indices: number[] = [];
    const vertsPerRow = radialSegments + 1;

    for (let y = 0; y < capSegments; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const a = y * vertsPerRow + x;
        const b = a + vertsPerRow;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const offset = (capSegments + 1) * vertsPerRow;
    for (let y = 0; y < 1; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const a = offset + y * vertsPerRow + x;
        const b = a + vertsPerRow;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    const bottomOffset = offset + 2 * vertsPerRow;
    for (let y = 0; y < capSegments; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const a = bottomOffset + y * vertsPerRow + x;
        const b = a + vertsPerRow;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    return new Uint16Array(indices);
  }
}
