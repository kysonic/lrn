import { spy, trace } from 'mobx';

const disposer = spy(event => console.log(event));

setTimeout(disposer, 5000);

trace(true); // as debugger;
