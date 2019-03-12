function validateBattlefield(field) {
    var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
    for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
        for (var col = 0; col < 10; col++) {
            if ( hit(row,col) ) {
                if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
                if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
                if ( ( field[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
                ships[field[row][col]]++; ships[field[row][col] - 1]--;
            } } }
    return [0,4,3,2,1].every((s,i) => s == ships[i]);
}


function validateBattlefield(field) {
    var s = "000000000000", f = s + field.join("0").replace(/,/g, "") + s;
    var ships = [4, 3, 2, 1], h = "0(?=00........010........000)", v = h;
    if (f.match(/1.{9}(..)?1/)) return false;
    for (var i = 0; i < ships.length; ++ i) {
        if ((f.match(new RegExp(h + "|" + v, "g")) || []).length != ships[i]) return false;
        h = h.replace(/([01])0(\.|(?=\)))/g, "$1$10");
        v = v.replace(/(01+0\.+)/, "$1$1");
    }
    return true;
}