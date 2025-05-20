export abstract class HUDWidget {
  abstract update(deltaTime: number): void;

  abstract render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void;
}
