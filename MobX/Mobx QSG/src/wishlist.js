import {observable, computed, action} from 'mobx';

class WishListStore {
    @observable.shallow lists = [];

    @computed get isEmpty() {
        return this.lists.length === 0;
    }

    @action addWishList(wishList) {
        this.lists.push(wishList);
    }

    @action removeWishList(wishList) {
        this.lists.remove(wishList);
    }
}

class WishList {
    @observable name = '';
    @observable.shallow items = [];

    constructor(name) {
        this.name = name;
    }

    @computed get isEmpty() {
        return this.items.length === 0;
    }

    @action renameWishList(name) {
        this.name = name;
    }

    @action addItem(item) {
        this.items.push(item);
    }

    @action removeItem(item) {
        this.items.remove(item);
    }
}

class WishListItem {
    @observable title = '';
    @observable purchased = false;

    constructor(title) {
        this.title = title;
    }
}

const store = new WishListStore();



