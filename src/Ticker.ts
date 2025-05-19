import type { Game } from "./Game";

export class Ticker {
  readonly game: Game;

  private frameRequestId: number;
  private lastUpdate: number | undefined;
  private timeSinceFirstFrame: number = 0;
  private frameCount: number = 0;

  fps: number = Infinity;
  currentFps: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.tick = this.tick.bind(this);
    this.frameRequestId = requestAnimationFrame(this.tick);
  }

  tick(t: number) {
    const { lastUpdate } = this;

    let deltaTime: number;
    let skip = false;

    if (lastUpdate === undefined) {
      deltaTime = 0;
    } else {
      deltaTime = t - lastUpdate;

      if (deltaTime < 1000 / this.fps) {
        skip = true;
      }
    }

    if (!skip) {
      this.frameCount++;
      this.timeSinceFirstFrame += deltaTime;

      if (this.timeSinceFirstFrame >= 1000) {
        this.currentFps = Math.ceil(
          (this.frameCount * 1000) / this.timeSinceFirstFrame
        );
        this.frameCount = 0;
        this.timeSinceFirstFrame = 0;
      }

      this.game.update(deltaTime);

      this.lastUpdate = t;
    }

    this.frameRequestId = requestAnimationFrame(this.tick);
  }

  cancel() {
    cancelAnimationFrame(this.frameRequestId);
  }
}
