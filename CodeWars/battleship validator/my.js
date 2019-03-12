// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7/train/javascript

let cache = [];
const SCHEMA = {1:4, 2:3, 3:2, 4:1};
let shipsCount = {};

function validateBattlefield(a) {
    for (let i = 0; i<a.length; i++) {
        for(let j = 0; j<a.length; j++) {
            // Catch overlapping or wrong shape
            if(a[i][j+1] && a[i+1] && a[i+1][j]) return false;
            if(a[i][j] && !~cache.indexOf(""+i+j)) findAShip(a,i,j);
        }
    }
    return validateSchema();
}

function validateSchema() {
    return Object.keys(SCHEMA).every((key)=>SCHEMA[key]===shipsCount[key]);
}


function findAShip(a,i,j) {
    var ii = 0,
        ji = 0; // I incrementor - ii
    if(a[i][j+1]) ji = 1; // Horizontal
    if(a[i+1][j]) ii = 1; // Vertical
    cache.push(""+i+j);
    // Go through
    let shipBlocksCount = 1;
    // Only one block
    if(!ii && !ji) {
        shipsCount[shipBlocksCount] = shipsCount[shipBlocksCount] ? ++shipsCount[shipBlocksCount] : 1;
        return true;
    }
    // Check a ship
    while(a[i+ii][j+ji]) {
        cache.push(""+(i+ii)+(j+ji));
        ii ? ii++ : ji++;
        shipBlocksCount++;
    }
    shipsCount[shipBlocksCount] = shipsCount[shipBlocksCount] ? ++shipsCount[shipBlocksCount] : 1;
    return shipBlocksCount<=4;
}
