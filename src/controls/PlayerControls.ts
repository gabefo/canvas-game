import * as THREE from "three";

export class PlayerControls extends THREE.Controls<{}> {
  constructor(object: THREE.Object3D, domElement: HTMLElement | null = null) {
    super(object, domElement);
  }
}
