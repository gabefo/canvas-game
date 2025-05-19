import { Camera } from "./Camera";
import { Controller } from "./Controller";
import { Renderer } from "./Renderer";
import { Ticker } from "./Ticker";
import { World } from "./World";

export class Game {
  readonly camera: Camera;
  readonly world: World;
  readonly controller: Controller;
  readonly renderer: Renderer;
  readonly ticker: Ticker;

  constructor(canvas: HTMLCanvasElement) {
    this.world = new World(this);
    this.camera = new Camera(this).setTarget(this.world.player);
    this.controller = new Controller(this);
    this.renderer = new Renderer(this, canvas);
    this.ticker = new Ticker(this);
  }

  update(deltaTime: number) {
    this.world.update(deltaTime);
    this.camera.update(deltaTime);
    this.renderer.render();
  }
}

export function createGame(canvas: HTMLCanvasElement) {
  return new Game(canvas);
}
