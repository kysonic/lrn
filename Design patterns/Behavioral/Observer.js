var pubSub = {};

(function (q) {
    var topics = {},
        subUid = -1;
    q.subscribe = function (topic, cb) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            cb: cb
        });
        return token;
    };
    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].cb(topic, args);
        }
        return this;
    };
    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
})(pubSub);


var testHandler = function (topics, data) {
    console.log(topics + ": " + data);
};

var testSubscription = pubSub.subscribe('example1', testHandler);
pubSub.publish('example1', 'hello world!');
pubSub.publish('example1', ['test', 'a', 'b', 'c']);