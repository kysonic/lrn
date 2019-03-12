"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../interfaces/interfaces");
class Point2d {
    constructor(point) {
        this.x = 1;
        this.printPoint = (prefix, optional) => {
            console.log(this.x, this.y, prefix);
        };
        this.x = point.x;
        this.y = point.y;
    }
    add(point) {
        return new Point2d({ x: this.x + point.x, y: this.y + point.y });
    }
}
exports.Point2d = Point2d;
class Point3d extends Point2d {
    constructor(point) {
        super(point);
        this.z = point.z;
    }
    add(point) {
        return new Point3d({ x: this.x + point.x, y: this.y + point.y, z: this.z + point.z });
    }
}
exports.Point3d = Point3d;
//# sourceMappingURL=Point.js.map