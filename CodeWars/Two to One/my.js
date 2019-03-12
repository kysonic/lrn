// http://www.codewars.com/kata/two-to-one/train/javascript

function longest(s1, s2) {
    const a = Array.from(s1+s2);
    return a.filter((item, pos)=>a.indexOf(item) == pos).sort().join('');
}

console.log(longest("aretheyhere", "yestheyarehere"),'aehrsty');