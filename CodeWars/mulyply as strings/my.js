// http://www.codewars.com/kata/55911ef14065454c75000062/train/javascript

function addition(x,y) {
    let i = x.length - 1;
    let j = y.length - 1;
    let carryOver = 0;
    let sum = '';
    while(i>=0 || j>=0) {
        const a = x.charAt(i) || '0';
        const b = y.charAt(j) || '0';
        const m = ((+a + +b ) + carryOver);
        sum+= m % 10;
        carryOver = Math.floor(m/10);
        i--;
        j--;
    }
    if(carryOver) sum+=carryOver;
    return Array.from(sum).reverse().join('');
}

function multiplyOneDig(x,y) {
    let mul = '';
    let carryOver = 0;
    Array.from(x).reverse().forEach((dig)=>{
        const m = ((+dig * +y) + carryOver);
        mul+= m % 10;
        carryOver = Math.floor(m/10);
    });
    if(carryOver) mul+=carryOver;
    return Array.from(mul).reverse().join('').replace(/^([0]{0,})/,'') || '0';
}

function multiply(x,y){
    let mul = '0';
    Array.from(y).reverse().forEach((dig,i)=>{
        const m = multiplyOneDig(x,dig) + '0'.repeat(i);
        mul= addition(mul,m);
    });
    return mul.toString().replace(/^([0]{0,})/,'') || '0';
}


console.log(multiply("9007199254740992", "9007199254740991"),"81129638414606663681390495662081");
