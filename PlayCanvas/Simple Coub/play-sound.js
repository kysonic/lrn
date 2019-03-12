var PlaySound = pc.createScript('playSound');

// initialize code called once per entity
PlaySound.prototype.initialize = function() {

};

// update code called every frame
PlaySound.prototype.update = function(dt) {
    if(this.app.keyboard.isPressed(pc.KEY_SPACE)) {
        this.entity.sound.play('click');
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// PlaySound.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
