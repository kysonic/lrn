var someCar = {
    drive: function() {}, name: 'Mazda 3'
};
// Use Object.create to generate a new car
var anotherCar = Object.create( someCar );
console.log(anotherCar.name); // Now you'll hopefully see that one is a prototype of the other

var vehicle = {
    getModel: function(){
        console.log(this.model);
    }
}

var car = Object.create(vehicle, {
    id: {
        value: 1, // ID_HANDLER.nextId(),
        enumerable: true
    },
    model: {
        value: 'Ford',
        enumerable: true
    }
});

car.getModel()