import { Timer } from "./timer.js";

export class RenderContext {
    constructor(renderer, region, array) {
        this.timer = new Timer();
        this.renderer = renderer;
        this.region = region;
        this.array = array;
        this.renders = [];
    }

    render(time, markers) {
        this.renders.push(new Render(time, this.array, markers));
    }

    selectRender(currTime) {
        let i = this.renders.length - 1;
        for (; i >= 0; i--) {
            if (this.renders[i].time <= currTime)
                break;
        }
        return this.renders.splice(0, i + 1)[i];
    }
}

class Render {
    constructor(time, array, markers) {
        this.time = time;
        this.array = array.slice();
        this.markers = new Map(markers);
    }
}
