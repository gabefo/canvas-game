import type { Game } from "./Game";

export class Renderer {
  readonly game: Game;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  constructor(game: Game, canvas: HTMLCanvasElement) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.resize();

    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);

    canvas.addEventListener("click", () => {
      canvas.requestPointerLock();
    });
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

    const { camera } = this.game;
    ctx.translate(window.innerWidth * 0.5, window.innerHeight * 0.8);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.rotate(-camera.rotationX);
    ctx.translate(-camera.x, -camera.y);

    this.game.world.render(ctx, canvas);

    ctx.restore();

    this.game.hud.render(ctx, canvas);

    ctx.restore();
  }

  onResize() {
    this.resize();
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
  }
}
