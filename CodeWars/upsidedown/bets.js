String.prototype.map = Array.prototype.map;
function solve(x,y) {
    const flip = s => s.map( v => "01____9_86"[v] ).reverse().join("") ;
    return Array.from( { length: y-x }, (_,i) => String(x+i) ).filter( x => x===flip(x) ).length;
}

console.log(solve('1','6'),1);
console.log(solve('10','25'),1);