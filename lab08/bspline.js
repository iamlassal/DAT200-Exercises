import { Point } from "./models.js";
import { createPath } from "./utils.js";

export function drawBSpline(points, n, clamped, ctx) {
    const delta = 1 / n;
    const degree = 3;
    if (points === undefined || points.length < 1) {
        return;
    }

    if (clamped) {
        const startPoint = points[0];
        const endPoint = points[points.length - 1];
        points = [
            new Point(startPoint.x, startPoint.y),
            new Point(startPoint.x, startPoint.y),
            new Point(startPoint.x, startPoint.y),
            ...points,
            new Point(endPoint.x, endPoint.y),
            new Point(endPoint.x, endPoint.y),
            new Point(endPoint.x, endPoint.y)
        ];
    }

    const numKnots = points.length + degree + 1;
    let knots = [];

    for (let i = 0; i < numKnots; i++) {
        if (clamped) {
            if (i < degree + 1) {
                knots[i] = 0;
            } else if (i >= numKnots - (degree + 1)) {
                knots[i] = points.length - degree;
            } else {
                knots[i] = i - degree;
            }
        } else {
            knots[i] = i;
        }
    }

    console.log(knots)

    const tStart = knots[degree];
    const tEnd = knots[numKnots - degree - 1];

    const result = [];
    for (let t = tStart; t <= tEnd; t += delta) {
        let x = 0;
        let y = 0;

        for (let i = 0; i < points.length; i++) {
            const ni = basis(i, degree, t, knots);
            x += ni * points[i].x;
            y += ni * points[i].y;
        }
        result.push(new Point(x, y));
    }
    const path = createPath(result, false);
    ctx.stroke(path);
}

function basis(i, p, t, knot) {
    if (p == 0) {
        if (knot[i] <= t && t < knot[i + 1]) {
            return 1;
        } else {
            return 0;
        }
    }

    const na = t - knot[i];
    const da = knot[i + p] - knot[i];

    const nb = knot[i + p + 1] - t;
    const db = knot[i + p + 1] - knot[i + 1];

    const a = da !== 0 ? (na / da) * basis(i, p - 1, t, knot) : 0;
    const b = db !== 0 ? (nb / db) * basis(i + 1, p - 1, t, knot) : 0;

    return a + b;
}

