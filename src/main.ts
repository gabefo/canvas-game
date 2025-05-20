import { Game } from "@core/Game";

function createGame(canvas: HTMLCanvasElement) {
  return new Game(canvas);
}

createGame(document.querySelector<HTMLCanvasElement>("#canvas")!);
