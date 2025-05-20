import { HUDManager } from "@hud/HUDManager";
import { HealthBar } from "@hud/widgets/HealthBar";
import { MiniMap } from "@hud/widgets/MiniMap";
import { Camera } from "@world/Camera";
import { World } from "@world/World";
import { InputManager } from "./InputManager";
import { Renderer } from "./Renderer";
import { Ticker } from "./Ticker";

export class Game {
  readonly world: World;
  readonly camera: Camera;
  readonly hud: HUDManager;
  readonly input: InputManager;
  readonly renderer: Renderer;
  readonly ticker: Ticker;

  constructor(canvas: HTMLCanvasElement) {
    this.world = new World(this);
    this.camera = new Camera(this).setTarget(this.world.player);
    this.hud = new HUDManager(this).add(new MiniMap()).add(new HealthBar());
    this.input = new InputManager(this);
    this.renderer = new Renderer(this, canvas);
    this.ticker = new Ticker(this);
  }

  update(deltaTime: number) {
    this.world.update(deltaTime);
    this.camera.update(deltaTime);
    this.hud.update(deltaTime);
    this.renderer.render();
  }
}
