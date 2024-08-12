export function shuffle(array, begin = 0, end = array.length) {
    while (end > begin) {
        let idx = begin + Math.floor(Math.random() * (end - begin));
        end--;
        [array[end], array[idx]] = [array[idx], array[end]];
    }
}

export class Range {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
    }
}

export async function sleep(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

export function mapInit(keys, values) {
    let m = new Map();
    for (let i = 0; i < keys.length; i++)
        m.set(keys[i], values[i]);
    return m;
}
