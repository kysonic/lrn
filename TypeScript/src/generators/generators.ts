function * myGen() {
    let index = 0;

    while(index <3 ) {
        yield index++;
    }
}

const gen = myGen();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
