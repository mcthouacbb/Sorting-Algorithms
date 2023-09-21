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
        for (let i = 0; i < arr.length; i++) {
            let x = i * wscale;
            let h = arr[i] * hscale;
            console.log(h, arr[i], hscale);
            this.ctx.fillRect(x, this.canvas.height - h, wscale, h);
        }
    }
}

export const renderer = new Renderer(canvas);