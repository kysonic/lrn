import { autorun, $mobx, getDependencyTree, observable, computed } from 'mobx';

class Coupon {
    @observable isValid = false;

    /*...*/
}

class CouponManager {
    @observable.ref coupons = [];

    @computed
    get validCoupons() {
        return this.coupons.filter(coupon => coupon.isValid);
    }

    /*...*/
}

class ShoppingCart {
    @observable.shallow items = [];

    couponManager = new CouponManager();

    @computed
    get coupons() {
        return this.couponManager.validCoupons;
    }

    @computed
    get description() {
        return `Cart has ${this.items.length} item(s) with ${
            this.coupons.length
            } coupon(s) applied.`;
    }

    /*...*/
}



const cart = new ShoppingCart();
const disposer = autorun(() => {
    console.log(cart.description);
});

const descriptionAtom = cart[$mobx].values.get('description');
console.log(descriptionAtom, getDependencyTree(descriptionAtom));
