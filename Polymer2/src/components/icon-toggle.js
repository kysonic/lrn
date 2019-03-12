import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class IconToggle extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                 display: inline-block;
                }
                span {
                    color: blue; 
                }
                iron-icon {
                    fill: var(--icon-toggle-color, rgba(0,0,0,0));
                    stroke: var(--icon-toggle-outline-color, currentcolor);
                } 
                :host([pressed]) iron-icon {
                    fill: var(--icon-toggle-pressed-color, currentcolor);
                }
            </style>
            <iron-icon on-click="toggle" icon="[[toggleIcon]]"></iron-icon>
            <slot></slot>
        `
    }
    static get properties() {
        return {
            toggleIcon: {
                type: String,
                value: 'polymer'
            },
            pressed: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            }
        }
    }
    toggle(){
        this.pressed = !this.pressed;
    }
    constructor(){
        super();
    }
}

window.customElements.define('icon-toggle', IconToggle);
