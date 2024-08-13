import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";
import { RenderContext } from "./context.js";

export class SortRenderer {
    constructor(sort) {
        this.sort = sort;
        this.renders = [this.sort.next().value];
        this.done = false;
    }

    getNextRender(time) {
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

function dist(i) {
    // return 6 * i * i * i * i * i - 15 * i * i * i * i + 10 * i * i * i;
    return i;
}

const array = new Array(300);

for (let i = 0; i < array.length; i++) {
    array[i] = Math.ceil(dist(i / (array.length - 1)) * 100);
}

shuffle(array);

let prevTime;
let time = 0;

function testRender() {
    let currTime = performance.now();
    let dt = currTime - prevTime;
    prevTime = currTime;

    time += dt;
    for (const sortRenderer of sortRenderers) {
        if (sortRenderer.done)
            continue;
        renderer.render(sortRenderer.getNextRender(time));
    }

    window.requestAnimationFrame(testRender);
}

let context;
const sortRenderers = [];
async function init() {
    renderer.setSize(1200, 500, 4, 1);
    
    await sleep(250);

    sortRenderers.push(new SortRenderer(sorts.bubbleSort(renderer.createContext(array.slice(), 0))));
    sortRenderers.push(new SortRenderer(sorts.heapSort(renderer.createContext(array.slice(), 1))));
    // for (const render of )
        // console.log(render);
    
    // sorts.shellSort(renderer.createContext(array.slice(), 0));
    // sorts.quickSort(renderer.createContext(array.slice(), 1));
    // sorts.heapSort(renderer.createContext(array.slice(), 2));
    // sorts.mergeSort(renderer.createContext(array.slice(), 3), renderer.createContext(array.slice(), 4));
    
    
    prevTime = performance.now();
    window.requestAnimationFrame(testRender);
}

init();
