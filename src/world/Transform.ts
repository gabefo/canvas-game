import { mat4, vec3 } from "gl-matrix";

export class Transform {
  position: vec3;
  rotation: vec3;
  scale: vec3;

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
    this.position = vec3.fromValues(x, y, z);
    this.rotation = vec3.fromValues(rotationX, rotationY, rotationZ);
    this.scale = vec3.fromValues(scaleX, scaleY, scaleZ);
  }

  get x() {
    return this.position[0];
  }

  get y() {
    return this.position[1];
  }

  get z() {
    return this.position[2];
  }

  get rotationX() {
    return this.rotation[0];
  }

  get rotationY() {
    return this.rotation[1];
  }

  get rotationZ() {
    return this.rotation[2];
  }

  get scaleX() {
    return this.scale[0];
  }

  get scaleY() {
    return this.scale[1];
  }

  get scaleZ() {
    return this.scale[2];
  }

  setPosition(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    return this;
  }

  setRotation(rx: number, ry: number, rz: number) {
    this.rotation = vec3.fromValues(rx, ry, rz);
    return this;
  }

  setScale(sx: number, sy: number, sz: number) {
    this.scale = vec3.fromValues(sx, sy, sz);
    return this;
  }

  getMatrix(): mat4 {
    const m = mat4.create();
    mat4.translate(m, m, this.position);
    mat4.rotateX(m, m, this.rotation[0]);
    mat4.rotateY(m, m, this.rotation[1]);
    mat4.rotateZ(m, m, this.rotation[2]);
    mat4.scale(m, m, this.scale);
    return m;
  }
}
