function delay(timeout) {
    return new Promise(resolve => setTimeout(() => {
        console.log(`time pass ${timeout}`);
        resolve();
    }, timeout));
}

const array = [100, 200, 300, 400, 500, 600];

const promiseArray = array.map(item => delay(item));

// Parallel flow

Promise.all(promiseArray);

// Waterfall

promiseArray.reduce((acc, value) => {
    return acc.then(() => {
        return value;
    });
});
