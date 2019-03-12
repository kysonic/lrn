var recoverSecret = function(triplets) {
    for(var [first] of triplets)
    {
        console.log(first,'<<<First tuple\n\n');
        console.log(triplets.every(tuple => tuple.indexOf(first) <= 0),'<<<Every triplets');
        if (triplets.every(tuple => tuple.indexOf(first) <= 0))
        {
            triplets.filter(([item]) => item == first).forEach(tuple => {
                console.log(tuple,'<<<Shift tuple');
                tuple.shift()
            });
            return first + recoverSecret(triplets.filter(tuple => tuple.length > 0));
        }
    }
    return '';
}

const triplets1 = [
    ['t','u','p'],
    ['w','h','i'],
    ['t','s','u'],
    ['a','t','s'],
    ['h','a','p'],
    ['t','i','s'],
    ['w','h','s']
];

console.time('r1')
console.log(recoverSecret(triplets1));
console.timeEnd('r1')