import '../interfaces/interfaces';

export class Point2d {
    public x: number = 1;
    public y: number;
    private p: string;

    constructor(point: Point2D) {
        this.x = point.x;
        this.y = point.y;
    }

    add(point: Point2D) {
        return new Point2d({x: this.x + point.x, y: this.y + point.y});
    }

    public printPoint = (prefix?: string, optional?: number): void => {
        console.log(this.x, this.y, prefix);
    }
}

export class Point3d extends Point2d {
    z: number;

    constructor(point: Point3D) {
        super(point);
        this.z = point.z;
    }

    add(point: Point3D) {
        return new Point3d({x: this.x + point.x, y: this.y + point.y, z: this.z + point.z});
    }
}
