import { GameObject } from "./GameObject";
import type { Player } from "./Player";

export class Vehicle extends GameObject {
  name: string;
  seats: (Player | null)[];
  fuel: number = 80;

  constructor(name: string, seats: number) {
    super(80, 120);

    this.name = name;
    this.seats = Array(seats).fill(null);
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {}

  update(deltaTime: number) {}
}
