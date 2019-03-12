class MyMessage extends HTMLElement {
    get clicked() {
        return this.getAttribute('clicked');
    }
    set clicked(v) {
        if (v) {
            this.setAttribute('clicked', '');
        } else {
            this.removeAttribute('clicked');
        }
    }
    constructor() {
        super();
        this.addEventListener('click', (e)=>{
            this.clicked = true;
        });
    }
    connectedCallback(){
        const messageTemplate = document.createElement('template');
        messageTemplate.innerHTML = `
                          <style>
                                :host {
                                    color: black;
                                }
                        
                                :host(.error) {
                                    color: red;
                                }
                          </style>
                          <div class="container">
                            <slot></slot>
                          </div>`;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(messageTemplate.content.cloneNode(true));
    }
}

window.customElements.define('my-message-v', MyMessage);
