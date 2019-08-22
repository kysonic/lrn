import {observable, action, reaction} from 'mobx';

class Cart {
    @observable modified = new Date();
    @observable items = [];

    cancelPriceTracker = null;

    @action trackPriceChangeForItem(name) {
        if (this.cancelPriceTracker) {
            this.cancelPriceTracker();
        }
        this.cancelPriceTracker = reaction(
            () => {
                const item = this.items.find(x => x.name === name);
                return item ? item.price : null;
            },
            price => {
                console.log(`Price changed for ${name}: ${price !== null ? price : 0}`);
            },
        );
    }

    @action addItem(name, price) {
        this.items.push({ name, price});
        this.modified = new Date();
    }

    @action changePrice(name, price) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.price = price;
        }
    }
}

const cart = new Cart();
cart.addItem('Shoes', 20);
cart.trackPriceChangeForItem('Shoes');
cart.changePrice('Shoes', 30);
cart.changePrice('Shoes', 100);
