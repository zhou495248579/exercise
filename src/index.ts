// import html from './index.html'
import './styles/index.scss'
import {clearRect, createCanvasElement, paintCell, renderBackground} from "./utils";
import {Point2D} from "./interface";

let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
renderBackground(ctx)
const point: Point2D = {
    x: 0,
    y: 0
}
function render() {
    setTimeout(() => {
        clearRect(ctx,point);
        point.y += 1;
        paintCell(ctx, point, 'red')
        render();
    }, 20)
}

render();
