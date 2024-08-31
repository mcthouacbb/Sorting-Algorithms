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
const sortRenderers = [];

function addSort(currTime, sort) {
    let sortRenderer = new SortRenderer(sort, currTime);
    console.log(sortRenderer);
    sortRenderers.push(sortRenderer);
}

let x = false;

document.getElementById("quicksort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.quickSort(renderer.createContext(array.slice(), 0)));
});

document.getElementById("mergesort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.mergeSort(renderer.createContext(array.slice(), 1), renderer.createContext(array.slice(), 2)));
});

document.getElementById("heapsort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.heapSort(renderer.createContext(array.slice(), 3)));
});

document.getElementById("shellsort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.shellSort(renderer.createContext(array.slice(), 4)));
});

document.getElementById("insertionsort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.insertionSort(renderer.createContext(array.slice(), 5)));
});

document.getElementById("selectionsort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.selectionSort(renderer.createContext(array.slice(), 5)));
});

document.getElementById("bubblesort-btn").addEventListener("click", function() {
    addSort(time - 1, sorts.bubbleSort(renderer.createContext(array.slice(), 5)));
});

const arraySizeSlider = document.getElementById("array-size");
arraySizeSlider.addEventListener("input", function(e) {
    const arraySize = parseInt(arraySizeSlider.value);
    const arraySizeElem = document.getElementById("array-size-elem");
    arraySizeElem.innerText = `Array size: ${arraySize}`;
    array = createArray(arraySize);
});

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
async function init() {
    renderer.setSize(1200, 600, 4, 1); 
    
    await sleep(250);
    
    prevTime = performance.now() - 100;
    window.requestAnimationFrame(testRender);
}

init();
