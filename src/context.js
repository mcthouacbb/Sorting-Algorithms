export class RenderContext {
    constructor(array, region) {
        this.region = region;
        this.array = array;
    }

    render(timer, markers = new Map()) {
        return new Render(timer.currTime, this.array, this.region, markers);
    }
}

export class SortRenderer {
    constructor(sort, startTime) {
        this.sort = sort;
        this.renders = [this.sort.next().value];
        this.done = false;
        this.startTime = startTime;
    }

    getNextRender(time) {
        time -= this.startTime;
        if (this.done)
            return this.renders[this.renders.length - 1];
        while (this.renders[this.renders.length - 1].time < time) {
            let next = this.sort.next();
            if (next.done) {
                this.done = true;
                return this.renders[this.renders.length - 1];
            }
            this.renders.push(next.value);
        }
        this.renders.splice(0, this.renders.length - 2);
        return this.renders[Math.max(this.renders.length - 2, 0)];
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
