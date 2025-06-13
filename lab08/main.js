import { createSplineSegments, drawBezier } from "./bezier.js";
import { drawBSpline } from "./bspline.js";
import { Point } from "./models.js"
import * as utils from './utils.js';

const Type = Object.freeze({
    BEZIER: 0,
    BSPLINE: 1,
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const btnNew = document.getElementById("new");
    const btnMove = document.getElementById("move");
    const btnAdd = document.getElementById("add");
    const btnRemove = document.getElementById("remove");
    const btnBezier = document.getElementById("bezier");
    const btnBSpline = document.getElementById("bspline");
    const selSamples = document.getElementById("samples");
    const checkClamp = document.getElementById("clamp");
    const dotRadius = 5;

    let points = [];
    let grabbed = false;
    let type = Type.BEZIER;
    let targetPointIndex = -1;
    let samples = parseInt(selSamples.value);
    let clamped = checkClamp.checked;

    const draw = () => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        utils.drawOpenPath(points, ctx);
        points.forEach(p => {
            utils.drawDot(p.x, p.y, dotRadius, ctx);
        });

        if (type == Type.BEZIER) {
            const splines = createSplineSegments(points);
            drawBezier(splines, samples, ctx);
        } else {
            drawBSpline(points, samples, clamped, ctx);
        }
    }

    const stateCreate = (e) => {
        const { x, y } = utils.mouseEventToLocalXY(e, canvas);
        points.push(new Point(x, y));
        draw();
    }

    const stateMove = (e) => {
        console.log("state move");
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            const mousePoint = utils.mouseEventToLocalPoint(e, canvas);
            if (utils.dist(mousePoint, p) <= dotRadius) {
                console.log(p)
                targetPointIndex = i;
                grabbed = true;
                return;
            }
        }
    }

    const stateRemove = (e) => {
        console.log("state remove");
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            const mousePoint = utils.mouseEventToLocalPoint(e, canvas);
            if (utils.dist(mousePoint, p) <= dotRadius) {
                points.splice(i, 1);
                draw();
                return;
            }
        }
    }

    const removeEventListeners = () => {
        canvas.removeEventListener("click", stateCreate);
        canvas.removeEventListener("mousedown", stateMove);
        canvas.removeEventListener("click", stateRemove);
    }

    btnNew.addEventListener("click", (e) => {
        points = [];
        canvas.addEventListener("click", stateCreate);
        draw();
    });

    btnMove.addEventListener("click", (e) => {
        console.log("btn move");
        removeEventListeners();
        canvas.addEventListener("mousedown", stateMove);
    });

    btnAdd.addEventListener("click", (e) => {
        removeEventListeners();
        canvas.addEventListener("click", stateCreate);
    });

    btnRemove.addEventListener("click", (e) => {
        removeEventListeners();
        canvas.addEventListener("click", stateRemove);
    });

    btnBezier.addEventListener("click", (e) => {
        type = Type.BEZIER;
        draw();
    });

    btnBSpline.addEventListener("click", (e) => {
        type = Type.BSPLINE;
        draw();
    });

    selSamples.addEventListener("change", e => {
        samples = parseInt(e.target.value);
        draw();
    });

    canvas.addEventListener("click", stateCreate);

    canvas.addEventListener("mousemove", (e) => {
        const mousePoint = utils.mouseEventToLocalPoint(e, canvas);
        if (grabbed) {
            points[targetPointIndex] = mousePoint;
            console.log(points.targetPointIndex);
            console.log(mousePoint);
            draw();
        }
    });

    canvas.addEventListener("mouseup", () => {
        grabbed = false;
        draw();
    });

    checkClamp.addEventListener("change", (e) => {
        clamped = e.target.checked;
        draw();
    });

    draw();
});