"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./basics/readonly");
class Queue {
    constructor() {
        this.stack = [];
    }
    in(item) {
        this.stack.push(item);
    }
    out() {
        this.stack.pop();
    }
    trace() {
        console.log(this.stack);
    }
}
const queue = new Queue();
queue.in(1);
queue.in('stirng');
queue.in(true);
queue.out();
queue.trace();
//# sourceMappingURL=index.js.map