// https://www.codewars.com/kata/5547cc7dcad755e480000004/train/javascript

function removeNb (n) {
    const s = ((1+n)/2)*n;
    let found = [];
    for(let b=1;b<=n;b++) {
        const a = (s+1)/(b+1) - 1;
        if(Number.isInteger(a) && a<n && b<n) found.push([a,b]);
    }
    return found.sort((a,b)=>a[0]-b[0]);
}

console.log(removeNb(10));


