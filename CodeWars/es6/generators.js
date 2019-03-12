/** Iterators **/

let a = {
    left:1,
    right:5
}

a[Symbol.iterator] = function(){
    let current = this.left;
    let last = this.right;
    return {
        next(){
            if(current==last) return {done:true};
            return {
                value: current++,
                done:false
            }
        }
    }
}

for(let val of a) {
    console.log(val);
}

/** generator example **/
const asyncCall = new Promise((resolve,reject)=>setTimeout(()=>resolve('Result'+Math.random()),Math.random()+1000));
const asyncCall2 = new Promise((resolve,reject)=>setTimeout(()=>resolve('Result'+Math.random()),Math.random()+1500));

/*function* generateSequence() {
    const result = yield asyncCall;
    console.log(result,'<<<');
    yield 2;
    return 3;
}

let generator = generateSequence();

let async = generator.next().value;
async.then((result)=>generator.next(result));*/

function execute(generator,yieldValue,cb) {
    let next = generator.next(yieldValue);
    if(next.done) return cb(null,next.value);
    next.value.then((res)=>execute(generator,res,cb))
        .catch((err)=>cb(err))
}
execute((function* (){
    let res = yield asyncCall;
    console.log(res,'<<<');
    let res2 = yield asyncCall2;
    console.log(res2,'<<<');
    return res+res2;
})(),null,(err,res)=>{
    console.log(res);
});

