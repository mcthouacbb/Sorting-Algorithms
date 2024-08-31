import { RenderContext, MultiRender } from "./context.js";

const canvas = document.getElementById("render-canvas");
const MAX_VALUE = 100;

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sy = 1;
        this.contexts = [];
    }

    render(render) {
        if (render instanceof MultiRender) {
            for (const subRender of render.renders)
                this.render(subRender);
        } else {
            this.renderArray(render.array, render.region, render.markers);
        }
    }

    createContext(array, region) {
        let context = new RenderContext(array, region);
        this.contexts.push(context);
        return context;
    }

    setSize(w, h, sy) {
        this.canvas.width = w;
        this.canvas.height = h;
        this.sy = sy;
    }

    renderArray(arr, region, markers = new Map()) {
        let sx = Math.min(Math.floor(this.canvas.width / arr.length), 5);
        this.ctx.clearRect(0, this.canvas.height - (region + 1) * MAX_VALUE * this.sy, this.canvas.width, MAX_VALUE * this.sy);
        for (let i = 0; i < arr.length; i++) {
            let rminX = i * sx;
            let rmaxX = rminX + sx;
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
