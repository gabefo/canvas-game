import type { InputManager } from "./InputManager";

export abstract class Input {
  manager: InputManager;

  constructor(manager: InputManager) {
    this.manager = manager;
  }

  abstract disconnect(): void;
}
