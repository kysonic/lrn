/*
 * Copyright (c) 2018 Omnigon Communications, LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of Omnigon Communications, LLC
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall access and use it only
 * in accordance with the terms of the license agreement you entered into with Omnigon Communications, LLC, its
 * subsidiaries, affiliates or authorized licensee. Unless required by applicable law or agreed to in writing, this
 * Confidential Information is provided on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the license agreement for the specific language governing permissions and limitations.
 */

import {action, extendObservable} from "mobx";
import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Temperature from './temperature';


class TemperatureInput extends Component {
    constructor(props) {
        super(props);

        extendObservable(this, {
            input: "",

            onChange: action('set temperature input value', (e) => {
                this.input = e.target.value;
            }),

            onSubmit: action('submit new location', () => {
                this.props.store.push(new Temperature(this.input));
                this.input = '';
            })
        });
    }

    render() {
        return (
            <div className="temperature-input">
                <span>Destination:</span><br/>
                <input type="text" onChange={this.onChange} value={this.input}/>
                <button onClick={this.onSubmit}>Add</button>
            </div>
        )
    }
}

export default inject((stores) => {
    return {store: stores.store}
})(observer(TemperatureInput));