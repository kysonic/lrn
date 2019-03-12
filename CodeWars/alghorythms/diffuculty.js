function max(a) {
    let max = a[0][0];
    for(let i=0; i<a.length; i++) {
        for(let j=0; j<a.length; j++) {
            if(a[i][j]>max) max = a[i][j];
        }
    }
    return max;
}

const a = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

console.log(max(a));
