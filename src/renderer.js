import { Rect } from "./rect.js";

const canvas = document.getElementById("canvas");

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    setSize(w, h) {
        // this.canvas.width = w;
        // this.canvas.height = h;
        console.log(this.canvas);
    }

    renderArray(arr, scaleX, scaleY) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < arr.length; i++) {
            let rminX = i * scaleX;
            let rmaxX = rminX + scaleX;
            let rminY = this.canvas.height - arr[i] * scaleY;
            let rmaxY = this.canvas.height;
            // if (rmaxX <= cminX || rminX > cmaxX || rmaxY <= cminY || rminY > cmaxY)
                // continue;
            // rminX = Math.max(rminX, cminX);
            // rmaxX = Math.min(rmaxX, cmaxX);
            // rminY = Math.max(rminY, cminY);
            // rmaxY = Math.min(rmaxY, cmaxY);
            // console.log(rminX, rmaxX, rminY, rmaxY);
            this.ctx.fillRect(rminX, rminY, rmaxX - rminX, rmaxY - rminY);
        }
    }
}

export const renderer = new Renderer(canvas);
