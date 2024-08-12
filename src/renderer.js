import { RenderContext } from "./context.js";

const canvas = document.getElementById("render-canvas");
const MAX_VALUE = 100;

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sx = 1;
        this.sy = 1;
        this.contexts = [];
    }

    renderContexts(time) {
        for (const ctx of this.contexts) {
            let render = ctx.selectRender(time);
            this.renderArray(render.array, ctx.region, render.markers);
        }
    }

    createContext(array, region) {
        let context = new RenderContext(array, region);
        this.contexts.push(context);
        return context;
    }

    setSize(w, h, sx, sy) {
        this.canvas.width = w;
        this.canvas.height = h;
        this.sx = sx;
        this.sy = sy;
    }

    renderArray(arr, region, markers = new Map()) {
        this.ctx.clearRect(0, this.canvas.height - (region + 1) * MAX_VALUE * this.sy, this.canvas.width, MAX_VALUE * this.sy);
        for (let i = 0; i < arr.length; i++) {
            let rminX = i * this.sx;
            let rmaxX = rminX + this.sx;
            let rminY = this.canvas.height - arr[i] * this.sy - region * MAX_VALUE * this.sy;
            let rmaxY = this.canvas.height - region * MAX_VALUE * this.sy;
            if (markers.has(i))
                this.ctx.fillStyle = markers.get(i);
            else
                this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect(rminX, rminY, rmaxX - rminX, rmaxY - rminY);
        }
    }
}

export const renderer = new Renderer(canvas);
