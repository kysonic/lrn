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

import React, {Component} from "react";
import {observer} from "mobx-react";

class TView extends Component {
    render() {
        const t = this.props.t;
        return (
            <li className="temperatures__item" key={t.id}
                onClick={() => t.inc()}>{`Location: ${t.location}: ${t.loading ? 'Loading...' : t.temperature}`}</li>
        )
    }
}

export default observer(TView);