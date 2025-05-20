import type { Player } from "@player/Player";
import { GameObject } from "../GameObject";

export class Vehicle extends GameObject {
  name: string;
  seats: (Player | null)[];
  fuel: number = 80;

  constructor(name: string, seats: number) {
    super(80, 120, 40);

    this.name = name;
    this.seats = Array(seats).fill(null);
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {}

  update(deltaTime: number) {}
}
