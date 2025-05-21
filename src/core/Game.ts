import { HUDManager } from "@hud/HUDManager";
import { HealthBar } from "@hud/widgets/HealthBar";
import { Minimap } from "@hud/widgets/Minimap";
import { Camera } from "@world/Camera";
import { World } from "@world/World";
import { Renderer } from "./Renderer";
import { Ticker } from "./Ticker";
import { InputManager } from "./inputs/InputManager";

export class Game {
  readonly world: World;
  readonly hud: HUDManager;
  readonly camera: Camera;
  readonly renderer: Renderer;
  readonly ticker: Ticker;
  readonly inputs: InputManager;

  constructor(canvas: HTMLCanvasElement) {
    this.world = new World(this);
    this.hud = new HUDManager(this).add(new Minimap()).add(new HealthBar());
    this.camera = new Camera(this).setTarget(this.world.player);
    this.renderer = new Renderer(this, canvas);
    this.ticker = new Ticker(this);
    this.inputs = new InputManager(this);

    this.inputs.mouse.onMouseMove((e) => {
      const sensitivity = 0.002;
      this.world.player.rotateBody(-e.movementX * sensitivity);
      this.world.player.setHeadPitch(
        this.world.player.headPitch - e.movementY * sensitivity
      );
    });
  }

  update(deltaTime: number) {
    this.world.update(deltaTime);
    this.hud.update(deltaTime);
    this.renderer.render();
  }
}
