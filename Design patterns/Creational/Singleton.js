// Simple object
var mySingleton = {
    property1: "something",
    property2: "something else",
    method1: function () {
        console.log('hello world');
    }
};
// Singleton constructor
var mySingleton = function () {
// here are our private methods and variables
    var privateVariable = 'something private';

    function showPrivate() {
        console.log(privateVariable);
    }

// public variables and methods (which can access // private variables and methods )
    return {
        publicMethod: function () {
            showPrivate();
        },
        publicVar: 'the public can see this!'
    };
};
// instantiation

var Singleton = (function () {
    var instantiated = false;

    function init() {
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        }
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    }
})();

Singleton.getInstance().publicMethod();


var SingletonTester = (function () {

    function Singleton(options) {
        options = options || {};
        this.name = 'SingletonTester';
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    var instance;

    var _static = {
        name: 'SingletonTester',
        getInstance: function (options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }
            return instance;
        }
    }
    return _static;
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5});