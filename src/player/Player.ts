import { BoxGeometry } from "@core/geometries/BoxGeometry";
import { GameObject } from "@world/GameObject";
import { mat4 } from "gl-matrix";

export class Player extends GameObject {
  speed: number = 0;
  headPitch: number = 0;

  private head = new BoxGeometry(1, 1, 1).setPosition(0, 2.75, 0);
  private body = new BoxGeometry(1, 1.5, 0.5).setPosition(0, 1.75, 0);
  private armL = new BoxGeometry(0.4, 1.2, 0.4).setPosition(-0.7, 1.75, 0);
  private armR = new BoxGeometry(0.4, 1.2, 0.4).setPosition(0.7, 1.75, 0);
  private legL = new BoxGeometry(0.4, 1.2, 0.4).setPosition(-0.25, 0.6, 0);
  private legR = new BoxGeometry(0.4, 1.2, 0.4).setPosition(0.25, 0.6, 0);

  walk(distance: number, angle: number) {
    const a = angle - this.rotationY;
    let x = this.x - Math.cos(a) * distance;
    let z = this.z - Math.sin(a) * distance;

    const { world } = this;

    if (world) {
      const minX = 0;
      const maxX = world.width;
      const minZ = 0;
      const maxZ = world.depth;

      if (x < minX) {
        x = minX;
      } else if (x > maxX) {
        x = maxX;
      }

      if (z < minZ) {
        z = minZ;
      } else if (z > maxZ) {
        z = maxZ;
      }
    }

    return this.setPosition(x, this.y, z);
  }

  rotateBody(angle: number) {
    this.setRotation(this.rotationX, this.rotationY + angle, this.rotationZ);
    return this;
  }

  setHeadPitch(pitch: number) {
    this.headPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    return this;
  }

  update(deltaTime: number) {
    const { world } = this;

    if (!world) return;

    const { inputs } = world.game;

    let vx = 0;
    let vy = 0;

    if (
      inputs.keyboard.isKeyDown("ArrowRight") ||
      inputs.keyboard.isKeyDown("KeyD")
    )
      vx++;
    if (
      inputs.keyboard.isKeyDown("ArrowLeft") ||
      inputs.keyboard.isKeyDown("KeyA")
    )
      vx--;
    if (
      inputs.keyboard.isKeyDown("ArrowDown") ||
      inputs.keyboard.isKeyDown("KeyS")
    )
      vy++;
    if (
      inputs.keyboard.isKeyDown("ArrowUp") ||
      inputs.keyboard.isKeyDown("KeyW")
    )
      vy--;

    if (vx !== 0 || vy !== 0) {
      this.speed = inputs.keyboard.isKeyDown("ShiftLeft") ? 0.01 : 0.005;
      this.walk(deltaTime * this.speed, Math.atan2(vy, vx));
    } else {
      this.speed = 0;
    }
  }

  render(gl: WebGL2RenderingContext, projection: mat4, view: mat4): void {
    const playerModel = this.getMatrix();

    this.body.render(gl, projection, view, playerModel);
    this.head.render(gl, projection, view, playerModel);
    this.armL.render(gl, projection, view, playerModel);
    this.armR.render(gl, projection, view, playerModel);
    this.legL.render(gl, projection, view, playerModel);
    this.legR.render(gl, projection, view, playerModel);
  }
}
