var Orbital = pc.createScript('orbital');

Orbital.attributes.add('traget', {
    type: 'entity',
    title: 'Target',
    description: 'The Entity to orbit around'
});

Orbital.attributes.add('distance', {
    type: 'number',
    default: 10,
    title: 'Distance',
    description: 'How far from the Entity should the follower be'
});

Orbital.prototype.initialize = function() {
    this.vec = new pc.Vec3();
    this.target = this.app.root.findByName('Plane');
};

// update code called every frame

var delta = 0;

Orbital.prototype.update = function(dt) {
    if (!this.target) return;

    delta+=0.01;

    // get the position of the target entity
    var pos = this.target.getPosition();

    // calculate the desired position for this entity
    pos.x += Math.sin(delta) * 20;
    pos.z += Math.cos(delta) * 20;
    pos.y += 20;

    // smoothly interpolate towards the target position
    this.vec.lerp(this.vec, pos, 0.1);

    this.entity.lookAt(this.target.getPosition());
    // set the position for this entity
    this.entity.setPosition(this.vec);

};

// swap method called for script hot-reloading
// inherit your script state here
// Orbital.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
