import AFRAME from 'aframe';

export default AFRAME.registerComponent('scale-on-mouseenter', {
    schema: {
        to: {
            default: '2.5 2.5 2.5'
        }
    },

    init(){
        this.el.addEventListener('mouseenter', () => {
            this.el.setAttribute('scale', this.data.to);
        });
    }

})
