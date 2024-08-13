export class RenderContext {
    constructor(array, region) {
        this.region = region;
        this.array = array;
    }

    render(timer, markers = new Map()) {
        return new Render(timer.currTime, this.array, this.region, markers);
    }
}

export class MultiRender {
    constructor(renders) {
        this.time = renders[0].time;
        this.renders = renders;
    }
}

class Render {
    constructor(time, array, region, markers) {
        this.time = time;
        this.array = array.slice();
        this.region = region;
        this.markers = new Map(markers);
    }
}
