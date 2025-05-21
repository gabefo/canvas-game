import * as THREE from "three";

export class Player {
  object: THREE.Object3D;

  constructor() {
    const group = new THREE.Group();

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffcc00 })
    );
    head.position.set(0, 2.75, 0);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff9900 })
    );
    body.position.set(0, 1.75, 0);

    const armL = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff9900 })
    );
    armL.position.set(-0.7, 1.75, 0);

    const armR = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff9900 })
    );
    armR.position.set(0.7, 1.75, 0);

    const legL = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff9900 })
    );
    legL.position.set(-0.25, 0.6, 0);

    const legR = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff9900 })
    );
    legR.position.set(0.25, 0.6, 0);

    group.add(head);
    group.add(body);
    group.add(armL);
    group.add(armR);
    group.add(legL);
    group.add(legR);

    this.object = group;
  }
}
