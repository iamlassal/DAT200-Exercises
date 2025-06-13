import { Point } from "./models.js";

export function mouseEventToLocalXY(e, c) {
    if (!(e instanceof MouseEvent)) {
        alert(e + " is not a MouseEvent, you silly goose.");
        return 0, 0;
    }

    const x = e.clientX - c.offsetLeft;
    const y = e.clientY - c.offsetTop;

    return { x, y };
};

export function mouseEventToLocalPoint(e, c) {
    if (!(e instanceof MouseEvent)) {
        alert(e + " is not a MouseEvent, you silly goose.");
        return 0, 0;
    }

    const x = e.clientX - c.offsetLeft;
    const y = e.clientY - c.offsetTop;

    return new Point(x, y);
};

export function createPath(path, closed) {
    let result = new Path2D();
    if (path.length == 0) {
        return result;
    }
    result.moveTo(path[0].x, path[0].y);

    path.forEach((p) => {
        result.lineTo(p.x, p.y);
    });

    if (closed) {
        result.closePath();
    }
    return result;
}

export function drawDot(x, y, r, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

export function drawOpenPath(points, ctx) {
    const path = createPath(points, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "green";
    ctx.stroke(path);
}

export const dist = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}