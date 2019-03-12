import AFRAME from 'aframe';

export default AFRAME.registerComponent('set-event', {
    schema: {
        on: {type: 'string'},
        target: {type: 'selector'},
        src: {type: 'string'},
        duration: {type: 'number', default: 300}
    },

    init() {
        this.setupFadeAnimation();

        this.el.addEventListener(this.data.on, () => {

            this.data.target.emit('set-image-fade');

            setTimeout(() => {
                this.data.target.setAttribute('material', 'src', this.data.src);
            }, this.data.duration);

        });
    },

    setupFadeAnimation() {
        var data = this.data;
        var targetEl = this.data.target;

        // Only set up once.
        if (targetEl.dataset.setImageFadeSetup) { return; }
        targetEl.dataset.setImageFadeSetup = true;

        // Create animation.
        targetEl.setAttribute('animation__fade', {
            property: 'material.color',
            startEvents: 'set-image-fade',
            dir: 'alternate',
            dur: data.duration, 
            from: '#FFF',
            to: '#000'
        });
    }

})
