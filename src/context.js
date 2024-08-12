import { Timer } from "./timer.js";

export class RenderContext {
    constructor(array, region) {
        this.timer = new Timer();
        this.region = region;
        this.array = array;
        this.renders = [];
    }

    render(markers) {
        this.renders.push(new Render(this.timer.currTime, this.array, markers));
    }

    selectRender(currTime) {
        let i = this.renders.length - 1;
        for (; i >= 0; i--) {
            if (this.renders[i].time <= currTime)
                break;
        }
        return this.renders[i];
    }
}

class Render {
    constructor(time, array, markers) {
        this.time = time;
        this.array = array.slice();
        this.markers = new Map(markers);
    }
}
