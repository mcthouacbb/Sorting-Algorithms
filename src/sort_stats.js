export class SortStats {
    constructor() {
        this.currTime = 0;
        this.comparisons = 0;
        this.swaps = 0;
    }

    wait(ms) {
        this.currTime += ms;
    }
}