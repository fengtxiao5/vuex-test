const data = require('./mock-data')

export function initPng() {
    let tmpArr = JSON.parse(JSON.stringify(data))
    const shuffledArray = shuffle(tmpArr)
    console.trace('调用了initPng方法，返回的数组是', shuffledArray)
    return shuffledArray
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

