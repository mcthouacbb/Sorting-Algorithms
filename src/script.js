import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";
import { RenderContext, SortRenderer } from "./context.js";

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

let context;
const sortRenderers = [];

function addSort(currTime, sort) {
    let sortRenderer = new SortRenderer(sort, currTime);
    sortRenderers.push(sortRenderer);
}

let x = false;

function testRender() {
    let currTime = performance.now();
    let dt = currTime - prevTime;
    prevTime = currTime;

    time += dt;
    if (time > 10000 && !x) {
        x = true;
        addSort(time, sorts.quickSort(renderer.createContext(array.slice(), 1)));
    }
    for (const sortRenderer of sortRenderers) {
        if (sortRenderer.done)
            continue;
        renderer.render(sortRenderer.getNextRender(time));
    }

    window.requestAnimationFrame(testRender);
}
async function init() {
    renderer.setSize(1200, 500, 4, 1);
    
    await sleep(250);

    addSort(10, sorts.shellSort(renderer.createContext(array.slice(), 0)));
    // addSort(sorts.quickSort(renderer.createContext(array.slice(), 1)));
    // addSort(sorts.heapSort(renderer.createContext(array.slice(), 2)));
    // addSort(sorts.mergeSort(renderer.createContext(array.slice(), 3), renderer.createContext(array.slice(), 4)));
    
    prevTime = performance.now() - 100;
    window.requestAnimationFrame(testRender);
}

init();
