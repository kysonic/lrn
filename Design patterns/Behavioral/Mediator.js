var mediator = (function () {
    var channels = {};
    // Create a channel and attach a callback
    var subscribe = function (channel, fn) {
        if (!channels[channel]) channels[channel] = [];
        channels[channel].push({context: this, callback: fn});
        return this;
    }
    var publish = function (channel) {
        if (!channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = channels[channel].length; i < l; i++) {
            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function (obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})();

(function (m) {
// Set a default value for 'person'
    var person = "Luke";
// Subscribe to a topic/event called 'nameChange' with // a callback function which will log the original
// person's name and (if everything works) the incoming // name
    m.subscribe('nameChange', function (arg) {
        console.log(person); // Luke
        person = arg;
        console.log(person); // David
    });
// Publish the 'nameChange' topic/event with the new data
    m.publish('nameChange', 'David');
})(mediator);