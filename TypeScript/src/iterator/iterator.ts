interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;

    return?(value?: any): IteratorResult<T>;

    throw?(e?: any): IteratorResult<T>;
}

class Component {
    constructor(public name: string) {
        this.name = name;
    }
}

class Frame implements Iterator<Component> {
    private pointer = 0;

    constructor(public name: string, public components: Component[]) {
        this.name = name;
        this.components = components;
    }

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }

    }
    [Symbol.iterator]() {
        return this;
    }
}

let frame: Frame = new Frame('Door', [
    new Component('top'),
    new Component('right'),
    new Component('bottom'),
    new Component('left')
]);

for(let c of frame) {
    console.log(c);
}



