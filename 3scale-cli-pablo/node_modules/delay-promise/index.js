function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

function delayedPromise(promiseCreator, ms) {
    return delay(ms).then(() => promiseCreator());
}

function creator(...args) {
    const slice = [].slice;
    const asyncFunc = args[0];
    const asyncFuncParams = (arguments.length >= 2) ? slice.call(args, 1) : [];
    return () => asyncFunc(...asyncFuncParams);
}

const series = (promiseCreatorArray, delay = 0, delayFirst = false) => {
    let chain = delayedPromise(promiseCreatorArray.shift(), delayFirst ? delay : 0);
    const values = [];

    promiseCreatorArray.forEach((promiseCreator) => {
        chain = chain.then((value) => {
            values.push(value); // push the previous chain result
            return delayedPromise(promiseCreator, delay);
        });
    });

    return chain.then((value) => {
        values.push(value); // push the last chain result
        return values;
    });
};

const parallel = (promiseCreatorArray, delay = 0, delayFirst = false) => {
    let currentDelay = delay;
    const promises = [
        delayedPromise(promiseCreatorArray.shift(), delayFirst ? currentDelay : 0),
    ];

    currentDelay = delayFirst ? currentDelay + delay : currentDelay;
    promiseCreatorArray.forEach((promiseCreator) => {
        promises.push(delayedPromise(promiseCreator, currentDelay));
        currentDelay += delay;
        return;
    });
    return Promise.all(promises);
};

module.exports = {
    creator,
    series,
    parallel,
};