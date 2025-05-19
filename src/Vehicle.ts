import { GameObject } from "./GameObject";
import type { Player } from "./Player";

export class Vehicle extends GameObject {
  sits: (Player | null)[] = [];
  fuel: number = 80;

  constructor() {
    super(80, 120);
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {}

  update(dt: number) {}
}
