const canvas = document.getElementById("canvas");

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    setSize(w, h) {
        this.canvas.width = w;
        this.canvas.height = h;
    }

    renderArray(arr, wscale, hscale) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < arr.length; i++) {
            let x = i * wscale;
            let h = arr[i] * hscale;
            this.ctx.fillRect(x, this.canvas.height - h, wscale, h);
        }
    }
}

export const renderer = new Renderer(canvas);