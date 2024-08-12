import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";

function dist(i) {
    // return 6 * i * i * i * i * i - 15 * i * i * i * i + 10 * i * i * i;
    return i;
}

const array = new Array(300);

for (let i = 0; i < array.length; i++) {
    array[i] = Math.ceil(dist(i / (array.length - 1)) * 100);
}

shuffle(array);
const array2 = array.slice();
const array3 = array.slice();
const array4 = array.slice();
const array5 = array.slice();
async function init() {
    renderer.setSize(1200, 500, 4, 1);
    renderer.renderArray(array, 0);
    renderer.renderArray(array2, 1);
    renderer.renderArray(array3, 2);
    // renderer.renderArray(array4, 3);
    // renderer.renderArray(array5, 4);
    
    await sleep(1000);

    sorts.quickSort(array, renderer, 0);
    sorts.shellSort(array2, renderer, 1);
    sorts.heapSort(array3, renderer, 2);
    // sorts.insertionSort(array4, renderer, 3);
    // sorts.selectionSort(array5, renderer, 4);
}

init();
