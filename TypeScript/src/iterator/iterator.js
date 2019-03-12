class Component {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
}
class Frame {
    constructor(name, components) {
        this.name = name;
        this.components = components;
        this.pointer = 0;
        this.name = name;
        this.components = components;
    }
    next() {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
let frame = new Frame('Door', [
    new Component('top'),
    new Component('right'),
    new Component('bottom'),
    new Component('left')
]);
for (let c of frame) {
    console.log(c);
}
//# sourceMappingURL=iterator.js.map