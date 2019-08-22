import {
    onBecomeObserved,
    onBecomeUnobserved,
    observable,
    autorun,
} from 'mobx';

const obj = observable.box(10);
const cart = observable({
    items: [],
    totalPrice: 0,
});

onBecomeObserved(obj, () => {
    console.log('Started observing obj');
});

onBecomeUnobserved(obj, () => {
    console.log('Stopped observing obj');
});

onBecomeObserved(cart, 'totalPrice', () => {
    console.log('Started observing cart.totalPrice');
});
onBecomeUnobserved(cart, 'totalPrice', () => {
    console.log('Stopped observing cart.totalPrice');
});

const disposer = autorun(() => {
    console.log(obj.get(), `Cart total: ${cart.totalPrice}`);
});
setTimeout(disposer);

obj.set(20);
cart.totalPrice = 100;
