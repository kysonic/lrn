const a = {
    method(){
        console.log('Method1');
    }
}

a.method();

function method2(){
    console.log('Method2');
}

a.__proto__ = Object.assign(a.__proto__,{method2:method2});

a.method2();