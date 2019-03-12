let [firstName, lastName] = ["Anton", "Miroshnichenko"];
console.log(firstName,lastName);

'use strict';

let animal = {
    walk() {
        console.log("I'm walking");
    }
};

let rabbit = {
    __proto__: animal,
    walk() {
        console.log(super.walk); // walk() { … }
        super.walk(); // I'm walking
    }
};

rabbit.walk();
