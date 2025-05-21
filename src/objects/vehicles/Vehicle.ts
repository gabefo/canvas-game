import type { Player } from "objects/Player";
import * as THREE from "three";

export abstract class Vehicle {
  object: THREE.Object3D;
  seats: (Player | null)[];
  fuel: number = 80;

  constructor(seats: number) {
    this.object = new THREE.Group();
    this.seats = Array(seats).fill(null);
  }
}
