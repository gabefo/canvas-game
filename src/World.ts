import type { Game } from "./Game";
import type { GameObject } from "./GameObject";
import { Player } from "./Player";

function createPattern(ctx: CanvasRenderingContext2D) {
  const squareSize = 40;

  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = squareSize * 2;
  patternCanvas.height = squareSize * 2;

  const pctx = patternCanvas.getContext("2d")!;

  pctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  pctx.fillRect(0, 0, squareSize, squareSize);
  pctx.fillRect(squareSize, squareSize, squareSize, squareSize);

  pctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  pctx.fillRect(squareSize, 0, squareSize, squareSize);
  pctx.fillRect(0, squareSize, squareSize, squareSize);

  return ctx.createPattern(patternCanvas, "repeat")!;
}

export class World {
  readonly game: Game;
  readonly width: number = 20000;
  readonly height: number = 20000;
  readonly player: Player;
  readonly objects: GameObject[] = [];

  private pattern: CanvasPattern | null = null;

  constructor(game: Game) {
    this.game = game;
    this.player = new Player()
      .setPosition(this.width / 2, this.height / 2)
      .addTo(this);
  }

  update(deltaTime: number) {
    const { objects } = this;

    for (let i = 0; i < objects.length; i++) {
      objects[i].update(deltaTime);
    }
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { width, height, objects } = this;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    if (!this.pattern) {
      this.pattern = createPattern(ctx);
    }

    ctx.fillStyle = this.pattern;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < objects.length; i++) {
      objects[i].render(ctx, canvas);
    }
  }
}
