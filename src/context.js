export class RenderContext {
    constructor(array, region) {
        this.region = region;
        this.array = array;
    }

    render(stats, markers = new Map()) {
        return new Render(
            stats.currTime, stats.comparisons, stats.swaps,
            this.array, this.region, markers
        );
    }
}

export class SortRenderer {
    constructor(sort, contexts, startTime) {
        this.sort = sort;
        this.contexts = contexts;
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

    time() {
        return this.renders[this.renders.length - 1].time;
    }

    comparisons() {
        return this.renders[this.renders.length - 1].comparisons;
    }

    swaps() {
        return this.renders[this.renders.length - 1].swaps;
    }
}

export class MultiRender {
    constructor(renders) {
        this.time = renders[0].time;
        this.comparisons = renders[0].comparisons;
        this.swaps = renders[0].swaps;
        this.renders = renders;
    }
}

class Render {
    constructor(time, comparisons, swaps, array, region, markers) {
        this.time = time;
        this.comparisons = comparisons;
        this.swaps = swaps;
        this.array = array.slice();
        this.region = region;
        this.markers = new Map(markers);
    }
}
