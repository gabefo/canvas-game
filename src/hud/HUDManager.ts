import type { Game } from "../core/Game";
import type { HUDWidget } from "./HUDWidget";

export class HUDManager {
  readonly game: Game;

  private widgets: HUDWidget[] = [];

  constructor(game: Game) {
    this.game = game;
  }

  add(widget: HUDWidget) {
    this.widgets.push(widget);
    return this;
  }

  update(deltaTime: number) {
    for (const widget of this.widgets) {
      widget.update(deltaTime);
    }
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    for (const widget of this.widgets) {
      widget.render(ctx, canvas);
    }
  }
}
