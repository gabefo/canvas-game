import { Input } from "./Input";
import type { InputManager } from "./InputManager";

export class KeyboardInput extends Input {
  private readonly keysDown = new Set<string>();

  constructor(manager: InputManager) {
    super(manager);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.code === "Escape") return;
    e.preventDefault();
    this.keysDown.add(e.code);
  }

  private onKeyUp(e: KeyboardEvent) {
    if (e.code === "Escape") return;
    e.preventDefault();
    this.keysDown.delete(e.code);
  }

  isKeyDown(key: string) {
    return this.keysDown.has(key);
  }

  disconnect() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
}
