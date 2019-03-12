import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {observable, when} from 'mobx';
import {Provider} from 'mobx-react';

const store = observable([]);

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

// Some reaction
when(()=>store.some(t=>t.temperatureCelsius>10),
     ()=>console.log('After we find first location with temperature higher than 10 degree'));

registerServiceWorker();
