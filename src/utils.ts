import {Point2D} from "./interface";

export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas;
}

export function renderBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function paintCell(ctx: CanvasRenderingContext2D,point:Point2D, color: string) {
    const x = point.x;
    const y = point.y;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}
export function clearRect(ctx: CanvasRenderingContext2D,point:Point2D) {
    const x = point.x;
    const y = point.y;

    ctx.clearRect(x, y, CELL_SIZE, CELL_SIZE);
}
