import { Player } from "@objects/Player";
import * as THREE from "three";
import type { Game } from "./Game";

export class World {
  readonly game: Game;
  readonly scene: THREE.Scene = new THREE.Scene();
  readonly player: Player;

  constructor(game: Game) {
    this.game = game;

    this.scene.background = new THREE.Color(0x88ccee);
    this.scene.fog = new THREE.Fog(0x88ccee, 0, 50);

    const fillLight1 = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
    fillLight1.position.set(2, 1, 1);
    this.scene.add(fillLight1);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;
    this.scene.add(directionalLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(10, 0, 10);
    this.scene.add(floor);

    const player = new Player();
    player.object.position.set(10, 0, 10);
    this.scene.add(player.object);
    this.player = player;

    game.camera.position.copy(player.object.position);
    game.camera.position.y += 2;
    game.camera.position.z += 5;
  }
}
