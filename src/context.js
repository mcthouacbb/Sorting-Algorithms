export class RenderContext {
    constructor(array, region) {
        this.region = region;
        this.array = array;
    }

    render(timer, markers = new Map()) {
        return new Render(timer.currTime, this.array, this.region, markers);
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
