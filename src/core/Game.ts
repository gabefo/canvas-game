import * as THREE from "three";
import { InputManager } from "./inputs/InputManager";
import { World } from "./World";

export class Game {
  readonly clock: THREE.Clock;
  readonly camera: THREE.PerspectiveCamera;
  readonly world: World;
  readonly renderer: THREE.WebGLRenderer;
  readonly inputs: InputManager;

  constructor() {
    this.clock = new THREE.Clock();

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.rotation.order = "YXZ";
    this.camera = camera;

    this.world = new World(this);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(this.animate.bind(this));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);
    this.renderer = renderer;

    const inputs = new InputManager(this);
    inputs.mouse.onMouseDown((event) => {
      document.body.requestPointerLock();
    });
    inputs.mouse.onMouseMove((event) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;
      }
    });
    this.inputs = inputs;

    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize() {
    const { camera, renderer } = this;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    const delta = this.clock.getDelta();
    this.renderer.render(this.world.scene, this.camera);
  }
}
