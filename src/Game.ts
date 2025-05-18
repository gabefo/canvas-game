import { Camera } from "./Camera";
import { Controller } from "./Controller";
import { Renderer } from "./Renderer";
import { World } from "./World";

export class Game {
  readonly camera: Camera;
  readonly world: World;
  readonly controller: Controller;
  readonly renderer: Renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.world = new World(this);
    this.camera = new Camera(this).setTarget(this.world.player);
    this.controller = new Controller(this);
    this.renderer = new Renderer(this, canvas);
  }
}

export function createGame(canvas: HTMLCanvasElement) {
  return new Game(canvas);
}
