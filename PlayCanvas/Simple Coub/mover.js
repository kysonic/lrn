var Mover = pc.createScript('mover');

Mover.attributes.add('speed',{
    type: 'number',
    default: 0.5,
    min: 0.1,
    max: 5,
    precision: 2,
    description: "Speed of the entity"
});

// initialize code called once per entity
Mover.prototype.initialize = function() {
    this.force = new pc.Vec3();
    this.camera = this.app.root.findByName('Camera');
};

// update code called every frame
Mover.prototype.update = function(dt) {

    this.force.set(0, 0, 0);

    var direction = new pc.Vec3();
    direction.sub2(this.entity.position, this.camera.position);
    direction.normalize();

    if(this.app.keyboard.isPressed(pc.KEY_UP)) {
        this.force.set(direction.x, 0, direction.z);
    }

    if(this.app.keyboard.isPressed(pc.KEY_DOWN)) {
        this.force.set(-direction.x, 0, -direction.z);
    }

    if(this.app.keyboard.isPressed(pc.KEY_LEFT)) {
        this.force.set(direction.z, 0, -direction.x);
    }

    if(this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
        this.force.set(-direction.z, 0, direction.x);
    }


    if (this.force.length() > this.speed) {
        this.force.normalize().scale(this.speed);
    }

    this.entity.rigidbody.applyImpulse(this.force);

};
