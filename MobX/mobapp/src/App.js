import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import TView from './TView';
import TemperatureInput from './TemperatureInput';


class App extends Component {
    render() {
        return (
            <div className="App">
                <TemperatureInput></TemperatureInput>
                <ul className="temperatures">
                    {this.props.store.map((t) => <TView key={t.id} t={t}></TView>)}
                </ul>
                <DevTools></DevTools>
            </div>
        );
    }

}


export default inject((stores) => {
    return {store: stores.store}
})(observer(App));
