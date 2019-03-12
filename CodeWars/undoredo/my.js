// https://www.codewars.com/kata/531489f2bb244a5b9f00077e/train/javascript

function undoRedo(object) {
    let store = [];
    let count = 0;
    let maxcount = 0;

    function save(o) {
        count++;
        maxcount=count;
        store[count]=Object.assign({},o);
    }

    save(object);

    return {
        set: function(key, value) {
            object[key] = value;
            save(object);
        },
        get: function(key) {
            return object[key];
        },
        del: function(key) {
            delete object[key];
            save(object);
        },
        undo: function() {
            if (count>1){
                count--;
                object = Object.assign({},store[count]);
            } else throw new Error('There is no operations to undo');
        },
        redo: function() {
            if(count<maxcount){
                count++;

                object = Object.assign({},store[count]);
                console.log(object,'<<<<');
            }
            else throw new Error('There is no operations to redo');
        }
    };
}

var obj = {};
var unRe = undoRedo(obj);
unRe.set('x', 5);
console.log(unRe.get('y'),5);
unRe.set('y', 10);
console.log(unRe.get('y'),10);
unRe.set('y', 8);
console.log(unRe.get('y'),8);
unRe.del('y');

console.log(unRe.get('y'),undefined);
unRe.undo();
console.log(unRe.get('y'),8);
unRe.undo();
console.log(unRe.get('y'),10);
unRe.undo();
console.log(unRe.get('x'),undefined);

unRe.redo();
unRe.redo();
unRe.redo();



