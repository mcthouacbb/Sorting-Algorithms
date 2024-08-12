import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";
import { RenderContext } from "./context.js";

function dist(i) {
    // return 6 * i * i * i * i * i - 15 * i * i * i * i + 10 * i * i * i;
    return i;
}

const array = new Array(600);

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
    renderer.renderContexts(time);

    window.requestAnimationFrame(testRender);
}

let context;
async function init() {
    renderer.setSize(1200, 500, 2, 1);
    
    await sleep(250);

    sorts.shellSort(renderer.createContext(array.slice(), 0));
    sorts.quickSort(renderer.createContext(array.slice(), 1));
    sorts.heapSort(renderer.createContext(array.slice(), 2));
    sorts.mergeSort(renderer.createContext(array.slice(), 3), renderer.createContext(array.slice(), 4));
    
    prevTime = performance.now();
    window.requestAnimationFrame(testRender);
}

init();
