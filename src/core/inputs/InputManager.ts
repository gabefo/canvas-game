import type { Game } from "../Game";
import { KeyboardInput } from "./KeyboardInput";
import { MouseInput } from "./MouseInput";

export class InputManager {
  readonly game: Game;
  keyboard: KeyboardInput;
  mouse: MouseInput;

  constructor(game: Game) {
    this.game = game;
    this.keyboard = new KeyboardInput(this);
    this.mouse = new MouseInput(this);
  }

  disconnect() {
    this.keyboard.disconnect();
    this.mouse.disconnect();
  }
}
