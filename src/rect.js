export class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    get minX() {
        return this.x;
    }

    get maxX() {
        return this.x + this.w;
    }

    get minY() {
        return this.y;
    }

    get maxY() {
        return this.y + this.h;
    }
}