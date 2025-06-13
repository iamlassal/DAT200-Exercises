import { Point, SplineSegment } from "./models.js";
import { createPath } from "./utils.js";

export function createSplineSegments(points) {
    if (points.length < 4) {
        return;
    }
    const result = [];

    let p1 = new Point(points[0].x, points[0].y);
    let p2;
    let p3;
    let p4;

    for (let i = 3; i < points.length; i += 3) {
        p2 = points[i - 2]
        p3 = points[i - 1]
        p4 = points[i]
        result.push(new SplineSegment(p1, p2, p3, p4));
        p1 = p4;
    }

    return result;
}

export function drawBezier(splines, n, ctx) {

    if (splines === undefined) {
        return;
    }

    const delta = 1.0 / n;

    const result = [];

    splines.forEach(s => {
        for (let i = 0; i <= n; i++) {
            const a = i * delta;

            const x =
                s.p1.x * Math.pow((1.0 - a), 3) +
                s.p2.x * 3.0 * a * Math.pow((1.0 - a), 2) +
                s.p3.x * 3.0 * a * a * (1.0 - a) +
                s.p4.x * a * a * a;

            const y =
                s.p1.y * Math.pow((1.0 - a), 3) +
                s.p2.y * 3.0 * a * Math.pow((1.0 - a), 2) +
                s.p3.y * 3.0 * a * a * (1.0 - a) +
                s.p4.y * a * a * a;

            result.push(new Point(x, y))
        }
    });

    const path = createPath(result, false);
    ctx.stroke(path)
}