function reverse<T>(items: T[]): T[] {
    const toreturn = [];
    for (let i=items.length - 1; i >=0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

const sample = [3,2,1];
const reversed = reverse(sample);
console.log(reversed);
