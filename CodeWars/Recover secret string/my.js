// https://www.codewars.com/kata/53f40dff5f9d31b813000774/train/javascript

var recoverSecret = function(triplets) {
    const data = {};
    triplets.forEach((t)=>{
        t.forEach((letter,i)=>{
            data[letter] = data[letter] || [];
            for(let k = i-1;k>=0;k--) {
                if(data[letter].indexOf(t[k])==-1) data[letter].push(t[k]);
            }
        });
    });
    let secret = '';
    const letters = Object.keys(data);
    let previousLetter = letters.find((l)=>!data[l].length);
    delete data[previousLetter];
    let i = 1;
    secret+=previousLetter;
    while(i<letters.length) {
        previousLetter = findNextLetter(data,previousLetter,i);
        delete data[previousLetter];
        secret+=previousLetter;
        i++;
    }
    return secret;
};

function findNextLetter(data,previousLetter,lessThan){
    const candidate = Object.keys(data).find((l)=>data[l].indexOf(previousLetter)!==-1 && data[l].length<=lessThan && !isThereAnyFromRest(data,l));
    return candidate || 'x';
}

function isThereAnyFromRest(data,candidate) {
    const lessThan = data[candidate];
    const letters = Object.keys(data);
    let isThere = false;
    return lessThan.find((l)=>letters.indexOf(l)!=-1);
}


const secret1 = "whatisup";
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
