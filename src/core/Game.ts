import { HUDManager } from "@hud/HUDManager";
import { HealthBar } from "@hud/widgets/HealthBar";
import { Minimap } from "@hud/widgets/Minimap";
import { Camera } from "@world/Camera";
import { World } from "@world/World";
import { InputManager } from "./InputManager";
import { Renderer } from "./Renderer";
import { Ticker } from "./Ticker";

export class Game {
  readonly world: World;
  readonly camera: Camera;
  readonly input: InputManager;
  readonly hud: HUDManager;
  readonly renderer: Renderer;
  readonly ticker: Ticker;

  constructor(canvas: HTMLCanvasElement) {
    this.world = new World(this);
    this.camera = new Camera(this).setTarget(this.world.player);
    this.input = new InputManager(this);
    this.hud = new HUDManager(this).add(new Minimap()).add(new HealthBar());
    this.renderer = new Renderer(this, canvas);
    this.ticker = new Ticker(this);
  }

  update(deltaTime: number) {
    this.world.update(deltaTime);
    this.hud.update(deltaTime);
    this.renderer.render();
  }
}
