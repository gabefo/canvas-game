import type { Game } from "./Game";

export class Renderer {
  readonly game: Game;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private frameRequestId: number;
  private lastUpdate: number | undefined;
  private timeSinceFirstFrame: number = 0;
  private frameCount: number = 0;

  fps: number = Infinity;
  currentFps: number = 0;

  constructor(game: Game, canvas: HTMLCanvasElement) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.resize();

    this.update = this.update.bind(this);
    this.frameRequestId = requestAnimationFrame(this.update);
  }

  resize() {
    const { canvas } = this;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpi = window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpi;
    canvas.height = height * dpi;
  }

  render() {
    const { ctx } = this;

    if (!ctx) return;

    ctx.save();

    const { canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dpi = window.devicePixelRatio;
    ctx.scale(dpi, dpi);

    ctx.save();

    const { camera, world } = this.game;
    const cx = canvas.width / 2 / dpi;
    const cy = canvas.height / 2 / dpi;
    ctx.translate(cx, cy);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.x, -camera.y);

    world.render(ctx, canvas);

    ctx.restore();

    ctx.fillStyle = "#00ff00";
    ctx.font = "12px Arial";
    ctx.textBaseline = "top";
    ctx.fillText(`${this.currentFps} FPS`, 20, 20);

    ctx.restore();
  }

  update(t: number) {
    const { lastUpdate } = this;

    let elapsed: number;
    let skip = false;

    if (lastUpdate === undefined) {
      elapsed = 0;
    } else {
      elapsed = t - lastUpdate;

      if (elapsed < 1000 / this.fps) {
        skip = true;
      }
    }

    if (!skip) {
      this.frameCount++;
      this.timeSinceFirstFrame += elapsed;

      if (this.timeSinceFirstFrame >= 1000) {
        this.currentFps = Math.ceil(
          (this.frameCount * 1000) / this.timeSinceFirstFrame
        );
        this.frameCount = 0;
        this.timeSinceFirstFrame = 0;
      }

      this.game.world.update(elapsed);

      this.render();

      this.lastUpdate = t;
    }

    this.frameRequestId = requestAnimationFrame(this.update);
  }

  destroy() {
    cancelAnimationFrame(this.frameRequestId);
  }
}
