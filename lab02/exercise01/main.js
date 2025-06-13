class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    let points = [];
    let num_points = 8;
    let kx = 0;

    const createPath = (path) => {
        let result = new Path2D();
        result.moveTo(path[0].x, path[0].y);

        for (let i = 1; i < path.length; i++) {
            result.lineTo(path[i].x, path[i].y);
        }

        result.closePath();
        return result;
    }


    const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        points = [];

        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, c.width, c.height);

        const a = c.height / 2;
        const b = c.width / 2;
        for (let i = 0; i < num_points; i++) {
            const v = (2 * Math.PI * i) / num_points;
            const x = a * Math.cos(v) + c.width / 2;
            const y = b * Math.sin(v) + c.height / 2;
            points.push(new Point(x, y));
        }

        if (kx > 0) {
            for (let i = 0; i < num_points; i++) {
                const kxi = (kx * i) % num_points;
                if (kxi >= num_points) {
                    break;
                }

                const p0 = points[i];
                const p1 = points[kxi];

                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.stroke();
            }
        }

        path0 = createPath(points);
        ctx.stroke(path0);
    }

    document.getElementById("np-selection").addEventListener("click", e => {
        num_points = parseInt(e.target.value);
        draw();
    });

    document.getElementById("kx-selection").addEventListener("click", e => {
        kx = parseInt(e.target.value);
        draw();
    });

    draw();
});

