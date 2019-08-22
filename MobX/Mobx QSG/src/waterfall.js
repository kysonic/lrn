const delay = time => new Promise(resolve => setTimeout(() => {
    console.log(`Time passed ${time}`);
    resolve();
}, time));

const array = [300, 100, 200, 100, 200];

// Waterfall
array.reduce((previousPromise, nextValue) => {
    return previousPromise.then(() => delay(nextValue))
}, Promise.resolve()).then(result => console.log('Waterfall Done!'));
// Parallel
//Promise.all(array.map(time => delay(time))).then(() => console.log('Parallel done!'));

