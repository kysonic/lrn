import { fromPromise, PENDING, FULFILLED, REJECTED, lazyObservable, fromResource, createViewModel } from 'mobx-utils';
import {autorun, observable} from 'mobx';

class Worker {
    operation = null;

    start() {
        this.operation = fromPromise(this.performOperation)
    }

    performOperation() {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
               clearTimeout(timeoutId);
               Math.random() > 0.25 ? resolve('200 OK') : reject('500 FAIL');
            }, 1000)
        });
    }
}
// From Promise
function render() {
    const { operation } = this.worker;
    return operation.case({
        [PENDING]: () => 'Render Pending State',
        [FULFILLED]: value => (`Render fulfilled state ${value}`),
        [REJECTED]: error => (`Render rejected state ${error}`)
    });
}

class ExpensiveWorker {
    operation = null;

    constructor() {
        this.operation = lazyObservable(async sink => {
            sink(null); // push an empty value before the update
            const result = await this.performOperation();
            sink(result);
        });
    }

    performOperation() {
        return new Promise(resolve => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                resolve('200 OK');
            }, 1000);
        });
    }
}

// Lazy observable
function render() {
    const { operation } = this.worker;
    const result = operation.current();

    if (!result) {
       return 'Operation in progress';
    }

    return `Something with result ${result}`;
}

class WebSocketConnection {}

class DataService {
    data = null;
    socket = null;

    constructor() {
        this.data = fromResource(
            async sink => {
                this.socket = new WebSocketConnection();
                await this.socket.subscribe('data');
                const result = await this.socket.get();

                sink(result);
            },
            () => {
                this.socket.unsubscribe('data');
                this.socket = null;
            });
    }
}

const service = new DataService();
console.log(service.data.current());
// When it's not needed
service.data.dispose();


class FormData {
    @observable name = 'Unnamed';
    @observable email = '';
    @observable favouriteColor = '';
}

const formViewModel = createViewModel(new FormData());

autorun(() => {
    console.log(`View model ${formViewModel.name}, Model ${formViewModel.model.name}, Dirty ${formViewModel.isDirty}`);
});

formViewModel.name = 'Anton';
formViewModel.email = 'soooyc@gmail.com';
formViewModel.favouriteColor = 'red';

// We need to reset from

formViewModel.reset();

formViewModel.name = 'ZUPPPA';

formViewModel.submit();
