// Module defined with object literal

var myModule = {
    myProperty: 'someValue',
    myConfig: {
        useCaching: true,
        language: 'en'
    }
}

// IIFE

var testModule = (function () {
    var counter = 0;
    return {
        incrementCounter: function () {
            return counter++;
        },
        getCounter: function () {
            return counter;
        },
        resetCounter: function () {
            console.log('counter value prior to reset:' + counter);
            counter = 0;
        }
    };
})();

testModule.incrementCounter();
testModule.incrementCounter();
console.log(testModule.getCounter());

// Revealing

var myRevealing = (function () {
    var name = 'John Smith';
    var age = 40;

    function updatePerson() {
        name = 'John Smith Updated';
    }

    function setPerson() {
        name = 'John Smith Set';
    }

    function getPerson() {
        return name;
    }

    return {
        set: setPerson,
        get: getPerson
    };
})();
