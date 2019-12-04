import {createAtom, autorun} from 'mobx';

class AtomicClock {
    constructor() {
        this.clock = createAtom('Clock', () => this.setTimer(), () => this.resetTimer())
    }

    setTimer() {
        this.timer = setInterval(this.tick, 1000);
    }

    resetTimer() {
        clearTimeout(this.timer);
    }

    tick = () => {
        this.clock.reportChanged();
    }

    get() {
        this.clock.reportObserved();
        return new Date();
    }
}

const atomicClock = new AtomicClock();

const disposer = autorun(() => {
    console.log(atomicClock.get())
});

setTimeout(disposer, 3000);
