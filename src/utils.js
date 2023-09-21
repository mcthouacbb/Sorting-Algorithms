export function shuffle(array, begin = 0, end = array.length) {
    while (end > begin) {
        let idx = begin + Math.floor(Math.random() * (end - begin));
        end--;
        [array[end], array[idx]] = [array[idx], array[end]];
    }
}