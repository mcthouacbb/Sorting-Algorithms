import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";
import { RenderContext } from "./context.js";

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

    let render = context.selectRender(time);
    console.log(render);
    if (!render)
        return;
    renderer.renderArray(render.array, context.region, render.markers);

    window.requestAnimationFrame(testRender);
}

let context;
async function init() {
    renderer.setSize(1200, 500, 4, 1);
    renderer.renderArray(array, 0);
    
    await sleep(1000);

    context = new RenderContext(renderer, 0, array.slice());
    sorts.quickSort(context);


    
    prevTime = performance.now();
    window.requestAnimationFrame(testRender);
}

init();
