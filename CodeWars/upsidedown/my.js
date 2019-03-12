// https://www.codewars.com/kata/upside-down-numbers-challenge-edition/train/javascript
function mirror(s){
    return Array.prototype.map.call(s, v => "01____9_86"[v] ).reverse().join("")
}

function upsideDown(x,y){
    let sum = 0;
    for(var i=x.length;i<=y.length-1;i++) {
        sum+=fn(i);
    }
    const leftBorer = x.length - 1 ? 1 + '0'.repeat(x.length - 1): '0';
    const rightBorder = 1 + '0'.repeat(y.length - 1);

    const leftDelta = countByNext(leftBorer,x);
    const rightDelta = countByNext(rightBorder,y);

    return sum - leftDelta + rightDelta;
}

function countByNext(x,y){
    let count = 0;
    while(+x < +y) {
        !isWrong(x) && count++;
        x=getNext(x);
    }
    return count;
}

function isWrong(x) {
    if(x.length % 2 === 0) return false;
    const index = Math.round(x.length / 2) - 1;
    const m = x.charAt(index);
    return m==='6' || m==='9';
}

function fn(n) {
    if(n===1) return 3;
    if(n===2) return 4;
    return 4*(fn(n-2) + Math.floor((fn(n-2)/4)));
}
const LINE = [0,1,6,8,9];
function getNext(c) {
    let isEven = c.length % 2 === 0;
    const median = Math.round(c.length / 2);
    const divided = c.substr(0,median);
    let next = inc(divided);
    if(next.length > c.length) {
        isEven = next.length % 2 === 0;
        next = next.substr(0, Math.round(next.length / 2));
    }
    return next + mirror(isEven ? next : next.substr(0,next.length-1))
}

function inc(s){
    let i = s.length - 1;
    let sum = '';
    let incNextChar = true;
    while(i>=0) {
        const next = incNextChar ? findNextDigit(s.charAt(i)) : s.charAt(i);
        incNextChar = incNextChar && s.charAt(i)==='9';
        sum = next + sum;
        i--;
    }
    if(sum==='0'.repeat(s.length)) sum = 1 + sum;
    return sum;
}
function findNextDigit(f){
    const map = LINE.map((s)=>Math.abs(s- +f));
    let index = map.indexOf(Math.min.apply(null, map));
    if(+f >= LINE[index]) index++;
    return LINE[index] || '0';
}

// "01689"
// "01____9_86"[v]

//console.log(getNext('9'));
console.log(upsideDown('100000','12345678900000000'),718650);
// 10000000000000000 12345678900000000