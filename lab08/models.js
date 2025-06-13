export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class SplineSegment {
    constructor(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}