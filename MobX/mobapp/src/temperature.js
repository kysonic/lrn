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

import {action, extendObservable, useStrict} from "mobx";

useStrict(true);

class Temperature {
    constructor(location){
        extendObservable(this, {
            id: Math.random(),
            location: 'Russia, RU',
            loading: true,
            unit: 'C',
            temperatureCelsius: 25,
            get temperatureKelvin(){
                return this.temperatureCelsius * (9/5) + 32
            },
            get temperatureFahrenheit(){
                return this.temperatureCelsius + 273.15
            },
            get temperature(){
                switch (this.unit) {
                    case "K":
                        return this.temperatureKelvin + 'K';
                    case "F":
                        return this.temperatureFahrenheit + 'F';
                    default:
                        return this.temperatureCelsius + 'C';
                }
            },
            setUnit: action('set unit', function (newUnit) {
                this.unit = newUnit;
            }),
            inc: action('inc temperature', function(){
                this.temperatureCelsius++;
            }),
            fetch: action('fetch data', function(){
                setTimeout(action('data is fetched', ()=>{
                    this.temperatureCelsius = Math.round(Math.random()*25);
                    this.loading = false;
                }),Math.random()*1000);
            })
        });
        this.location = location;
        this.fetch();
    }

}

export default Temperature;