import { normalizeAngle } from "./utils";

export class Transform {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;

  constructor(
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    scaleX = 1,
    scaleY = 1,
    scaleZ = 1
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;
  }

  setPosition(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setRotation(rx: number, ry: number, rz: number) {
    this.rotationX = normalizeAngle(rx);
    this.rotationY = normalizeAngle(ry);
    this.rotationZ = normalizeAngle(rz);
    return this;
  }

  setScale(sx: number, sy: number, sz: number) {
    this.scaleX = sx;
    this.scaleY = sy;
    this.scaleZ = sz;
  }
}
