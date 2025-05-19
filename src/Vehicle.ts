import { GameObject } from "./GameObject";
import type { Player } from "./Player";

export class Vehicle extends GameObject {
  seats: (Player | null)[];
  fuel: number = 80;

  constructor(seats: number) {
    super(80, 120);
    this.seats = Array(seats).fill(null);
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {}

  update(dt: number) {}
}
