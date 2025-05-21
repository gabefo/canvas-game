import { Input } from "./Input";
import type { InputManager } from "./InputManager";

export class MouseInput extends Input {
  private readonly mouseDownCallbacks: ((e: MouseEvent) => void)[] = [];
  private readonly mouseUpCallbacks: ((e: MouseEvent) => void)[] = [];
  private readonly mouseMoveCallbacks: ((e: MouseEvent) => void)[] = [];
  private readonly mouseWheelCallbacks: ((e: WheelEvent) => void)[] = [];

  constructor(manager: InputManager) {
    super(manager);
  }

  onMouseDown(callback: (e: MouseEvent) => void) {
    window.addEventListener("mousedown", callback);
    this.mouseDownCallbacks.push(callback);
    return this;
  }

  onMouseUp(callback: (e: MouseEvent) => void) {
    window.addEventListener("mouseup", callback);
    this.mouseUpCallbacks.push(callback);
    return this;
  }

  onMouseMove(callback: (e: MouseEvent) => void) {
    window.addEventListener("mousemove", callback);
    this.mouseMoveCallbacks.push(callback);
    return this;
  }

  onMouseWheel(callback: (e: WheelEvent) => void) {
    window.addEventListener("wheel", callback);
    this.mouseWheelCallbacks.push(callback);
    return this;
  }

  disconnect() {
    this.mouseDownCallbacks.forEach((callback) => {
      window.removeEventListener("mousedown", callback);
    });
    this.mouseUpCallbacks.forEach((callback) => {
      window.removeEventListener("mouseup", callback);
    });
    this.mouseMoveCallbacks.forEach((callback) => {
      window.removeEventListener("mousemove", callback);
    });
    this.mouseWheelCallbacks.forEach((callback) => {
      window.removeEventListener("wheel", callback);
    });
  }
}
