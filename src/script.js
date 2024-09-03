import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";
import { RenderContext, SortRenderer } from "./context.js";

function dist(i) {
    // return 6 * i * i * i * i * i - 15 * i * i * i * i + 10 * i * i * i;
    // return 2*i*i*i - 3*i*i + 2*i;
    return -8*i*i*i*i*i + 20*i*i*i*i - 14*i*i*i + 1*i*i + 2*i
}

function createArray(size) {
    let array = new Array(size);

    for (let i = 0; i < array.length; i++) {
        array[i] = Math.ceil(dist(i / (array.length - 1)) * 100);
    }

    shuffle(array);
    
    return array;
}

let array = createArray(300);

let prevTime;
let time = 0;

let context;
let sortRenderers = [];

function findOpenRegion(num) {
    outer: for (let i = 0; i < renderer.regions; i++) {
        for (const renderer of sortRenderers) {
            if (renderer.done)
                continue;
            for (const ctx of renderer.contexts)
                if (ctx.region >= i && ctx.region < i + num)
                    continue outer;
        }
        return i;
    }
    return -1;
}

function addSort(currTime, contexts, sort) {
    let sortRenderer = new SortRenderer(sort, contexts, currTime);
    for (const ctx of contexts) {
        timeElems[ctx.region].innerText = `Time: N/A`;
    }

    sortRenderers = sortRenderers.filter((sortRenderer) => {
        for (const ctx of sortRenderer.contexts)
            for (const ctx2 of contexts)
                if (ctx.region == ctx2.region)
                    return false;
        return true;
    });

    sortRenderers.push(sortRenderer);
    console.log(sortRenderers);
}

let x = false;

document.getElementById("quicksort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.quickSort(contexts[0]));
});

document.getElementById("mergesort-btn").addEventListener("click", function() {
    let region = findOpenRegion(2);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region), renderer.createContext(array.slice(), region + 1)];
    addSort(time - 1, contexts, sorts.mergeSort(contexts[0], contexts[1]));
});

document.getElementById("heapsort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.heapSort(contexts[0]));
});

document.getElementById("shellsort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.shellSort(contexts[0]));
});

document.getElementById("insertionsort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.insertionSort(contexts[0]));
});

document.getElementById("selectionsort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.selectionSort(contexts[0]));
});

document.getElementById("bubblesort-btn").addEventListener("click", function() {
    let region = findOpenRegion(1);
    if (region == -1)
        return;
    let contexts = [renderer.createContext(array.slice(), region)];
    addSort(time - 1, contexts, sorts.bubbleSort(contexts[0]));
});

const arraySizeSlider = document.getElementById("array-size");
arraySizeSlider.addEventListener("input", function(e) {
    const arraySize = parseInt(arraySizeSlider.value);
    const arraySizeElem = document.getElementById("array-size-elem");
    arraySizeElem.innerText = `Array size: ${arraySize}`;
    array = createArray(arraySize);
});

function timeScaleFn(x) {
    let val = Math.pow(100, x - 0.5);
    return Math.round(val * 1000) / 1000;
}

let timeScale = 1;
const timeScaleSlider = document.getElementById("time-scale");
timeScaleSlider.addEventListener("input", function(e) {
    timeScale = timeScaleFn(parseFloat(timeScaleSlider.value));
    const timeScaleElem = document.getElementById("time-scale-elem");
    timeScaleElem.innerText = `Time scale: ${timeScale}`;
});

const timeElems = document.getElementsByClassName("time");

function testRender() {
    let currTime = performance.now();
    let dt = currTime - prevTime;
    prevTime = currTime;

    time += dt * timeScale;
    for (const sortRenderer of sortRenderers) {
        for (const ctx of sortRenderer.contexts) {
            timeElems[ctx.region].innerText = `Time: ${sortRenderer.time()}ms\nComparisons: ${sortRenderer.comparisons()}\nSwaps: ${sortRenderer.swaps()}`;
        }
        if (sortRenderer.done) {
            continue;
        }
        renderer.render(sortRenderer.getNextRender(time));
    }

    window.requestAnimationFrame(testRender);
}
async function init() {
    renderer.setSize(1200, 600, 1);
    
    await sleep(250);
    
    prevTime = performance.now() - 100;
    window.requestAnimationFrame(testRender);
}

init();
