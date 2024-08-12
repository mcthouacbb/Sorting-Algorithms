export class Timer {
    constructor() {
        this.currTime = 0;
    }

    wait(ms) {
        this.currTime += ms;
    }
}