import { Point } from "./point.js";

document.addEventListener("DOMContentLoaded", () => {
    const newBtn = document.getElementById("new");
    const translateBtn = document.getElementById("translate");
    const scaleBtn = document.getElementById("scale");
    const rotateBtn = document.getElementById("rotate");
    const centroidBox = document.getElementById("centroid");

    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");

    let mode = "new";
    let polygon = [];

    let lastMousePos = new Point(0, 0);
    let grabbed = false;
    let centroidEnabled = false;

    /*
     * Helper functions
     */
    const createPath = (path) => {
        let result = new Path2D();
        if (path.length == 0) {
            return result;
        }
        result.moveTo(path[0].x, path[0].y);

        path.forEach((p) => {
            result.lineTo(p.x, p.y);
        });

        result.closePath();
        return result;
    }

    const toLocalXY = (e) => {
        if (!(e instanceof MouseEvent)) {
            alert(e + " is not a MouseEvent, you silly goose.");
            return 0, 0;
        }

        const x = e.clientX - c.offsetLeft;
        const y = e.clientY - c.offsetTop;

        return { x, y };
    };

    const getCentroid = () => {
        let result = new Point(0, 0);
        polygon.forEach(p => {
            result.x += p.x;
            result.y += p.y;
        });

        result.x = result.x / polygon.length;
        result.y = result.y / polygon.length;

        return result;
    }


    /*
     * Draw function
     */
    const draw = () => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, c.width, c.height);
        const path = createPath(polygon);
        ctx.fillStyle = "black";
        ctx.stroke(path);
        ctx.fillStyle = "red";
        if (centroidEnabled) {
            let centroid = getCentroid();
            ctx.fillRect(centroid.x - 3, centroid.y - 3, 6, 6);
        }
    }


    /*
     * Translations
     */
    const translate = (x, y) => {
        const result = []
        polygon.forEach(p => {
            var point = new Point(p.x + x, p.y + y);
            result.push(point);
        });
        polygon = result;
    }

    const rotate = (theta) => {
        const result = [];
        let centroid = getCentroid();

        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        polygon.forEach(p => {

            const tx = p.x - centroid.x;
            const ty = p.y - centroid.y;

            const rx = tx * cosTheta - ty * sinTheta;
            const ry = tx * sinTheta + ty * cosTheta;

            const x = rx + centroid.x;
            const y = ry + centroid.y;

            result.push(new Point(x, y));
        });

        polygon = result;
    }

    const scale = (factor) => {
        if (factor == 0) {
            return;
        }
        const result = [];
        const centroid = getCentroid();

        polygon.forEach(p => {
            const tx = p.x - centroid.x;
            const ty = p.y - centroid.y;

            const sx = tx * factor;
            const sy = ty * factor;

            const x = sx + centroid.x;
            const y = sy + centroid.y;

            result.push(new Point(x, y))
        });

        polygon = result;
    }

    /*
     * Event handlers
     */

    c.addEventListener("mousedown", (e) => {
        const { x, y } = toLocalXY(e);
        lastMousePos = new Point(x, y);
        grabbed = true;
        if (mode == "new") {
            polygon.push(new Point(x, y));
        }


        draw();
    });

    c.addEventListener("mousemove", e => {
        if (!grabbed) {
            return;
        }

        const { x, y } = toLocalXY(e);

        const dx = x - lastMousePos.x;
        const dy = y - lastMousePos.y;

        switch (mode) {
            case "translate":
                translate(dx, dy);
                break;
            case "scale":
                scale(1 + (dx + dy) * 0.01);
                break;
            case "rotate":
                rotate((dx - dy) * 0.01)
                break;
        }

        lastMousePos = new Point(x, y);
        draw();
    });

    c.addEventListener("mouseup", e => {
        grabbed = false;
    });

    newBtn.addEventListener("click", (e) => {
        polygon = [];
        mode = e.target.id;
        draw();
    });

    translateBtn.addEventListener("click", (e) => {
        mode = e.target.id;
    });

    scaleBtn.addEventListener("click", (e) => {
        mode = e.target.id;
    });

    rotateBtn.addEventListener("click", (e) => {
        mode = e.target.id;
    });

    centroidBox.addEventListener("click", (e) => {
        centroidEnabled = e.target.checked;
        draw();
    })

    draw();
});