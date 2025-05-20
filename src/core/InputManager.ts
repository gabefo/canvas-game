import type { Game } from "./Game";

export class InputManager {
  readonly game: Game;

  private keysDown = new Set<string>();

  constructor(game: Game) {
    this.game = game;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("contextmenu", this.onContextMenu);
    window.addEventListener("wheel", this.onWheel);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  isKeyDown(key: string) {
    return this.keysDown.has(key);
  }

  private onMouseMove(e: MouseEvent) {
    const sensitivity = 0.002;
    const deltaX = e.movementX;
    this.game.world.player.rotate(deltaX * sensitivity);
  }

  private onMouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  private onMouseUp(e: MouseEvent) {
    e.preventDefault();
  }

  private onContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  private onWheel(e: WheelEvent) {}

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

  disconnect() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("contextmenu", this.onContextMenu);
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
}
