import './basics/readonly';

class Queue<T> {
    private stack: T[] = [];

    public in(item: T): void {
        this.stack.push(item);
    }

    public out(): void {
        this.stack.pop();
    }

    public trace(): void {
        console.log(this.stack);
    }
}

const queue = new Queue<number>();
queue.in(1);
queue.in('stirng');
queue.in(true);
queue.out();
queue.trace();
