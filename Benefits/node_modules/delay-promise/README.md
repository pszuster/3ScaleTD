## Delay promise
A ES6 promise wrapper library to throttle and batch promises
```javascript
const delayed = require('delay-promise');

// A sample promise which takes an argument
function promise(name) {
    console.log('Begin task', name);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Finish task', name);
            return resolve();
        }, 1000);
    });
};
```
`delayed.creator` creates a wrapper function the promise which allows the delaying of the promise execution
```javascript
const promiseCreator = delayed.creator(promise, 'promise param');
```
Both `delayed.series` and `delayed.parallel` accepts an array of `delayed.creator` objects

Sequentially execute an array of `delayed creators` with the delay of 1 second between each promise
```javascript
delayed.series([
    delayed.creator(promise, 'Series A'),
    delayed.creator(promise, 'Series B'),
    delayed.creator(promise, 'Series C')
], 1000).then((promisesArray) => {
    // returns an array of resolved values of the promises just like Promise.all
});
```
To produce a throttled or staggered effect use `delayed.parallel`

Parallelly execute an array of `delayed creators` with the delay of 1 second between each promise
```javascript
delayed.parallel([
    delayed.creator(promise, 'Parallel A'),
    delayed.creator(promise, 'Parallel B'),
    delayed.creator(promise, 'Parallel C')
], 1000).then((promisesArray) => {
    // returns an array of resolved values of the promises just like Promise.all
});
```
Use both `parallel` and `series` for throttling and batching
```javascript
const batch1 = delayed.creator(delayed.parallel, [
    delayed.creator(promise, 'batch task1'),
    delayed.creator(promise, 'batch task2'),
    delayed.creator(promise, 'batch task3')
], 1000); // 1 second delay between each parallel promise

const batch2 = delayed.creator(delayed.parallel, [
    delayed.creator(promise, 'batch task4'),
    delayed.creator(promise, 'batch task5'),
    delayed.creator(promise, 'batch task6')
], 1000); // 1 second delay between each parallel promise

// 1 second delay between each batch
delayed.series([ batch1, batch2 ], 1000).then((batchArray) => {
    // Array of batches
});
```