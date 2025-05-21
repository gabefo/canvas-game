import { mat4 } from "gl-matrix";
import { Game } from "./Game";

export class Renderer {
  readonly game: Game;
  readonly canvas: HTMLCanvasElement;
  readonly gl: WebGL2RenderingContext;

  private projectionMatrix: mat4 = mat4.create();

  constructor(game: Game, canvas: HTMLCanvasElement) {
    this.game = game;
    this.canvas = canvas;

    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL2 not supported");

    this.gl = gl;

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    this.resize();

    this.onResize = this.onResize.bind(this);

    window.addEventListener("resize", this.onResize);
    window.addEventListener("click", () => {
      canvas.requestPointerLock();
    });
  }

  resize(): void {
    const dpi = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpi;
    this.canvas.height = window.innerHeight * dpi;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    const aspect = this.canvas.width / this.canvas.height;
    mat4.perspective(this.projectionMatrix, Math.PI / 4, aspect, 0.1, 1000);
  }

  render(): void {
    const { gl, game } = this;
    const { world, camera } = game;

    gl.clearColor(0.5, 0.8, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const viewMatrix = camera.getViewMatrix();

    world.render(gl, this.projectionMatrix, viewMatrix);

    game.hud.render();
  }

  onResize() {
    this.resize();
  }
}
