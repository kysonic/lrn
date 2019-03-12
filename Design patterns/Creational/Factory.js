function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.toString = function () {
    return this.model + " has done " + this.miles + " miles";
}

function VehicleFactory() {
}
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.getVehicle = function (model, year, miles) {
    return new this.vehicleClass(model, year, miles);
};
var carFactory = new VehicleFactory();
var car = carFactory.getVehicle('ford', 2012, 1000);
console.log(car instanceof Car); // => true
console.log(car.toString());

// Abstract factory
// Collect different implementation to create any object we want

var AbstractVehicleFactory = (function () {
    var types = {};
    return {
        getVehicle: function (type, customizations) {
            var Vehicle = types[type];
            return (Vehicle) ? new Vehicle(customizations): null;
        },
        registerVehicle: function (type, Vehicle) {
            var proto = Vehicle.prototype;
// only register classes that fulfill the vehicle contract
            if (proto.drive && proto.breakDown) {
                types[type] = Vehicle;
            }
            return AbstractVehicleFactory;
        }
    };
})();


AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

var car = AbstractVehicleFactory.getVehicle("car", { color: "yellow", turbo: true });
var truck = AbstractVehicleFactory.getVehicle("truck", { monster: true, cylinders: 12 });

