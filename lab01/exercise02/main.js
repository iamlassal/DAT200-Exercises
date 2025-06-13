document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");

    class Target {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
        }
    }

    const target = new Target(c.width / 2, c.height / 2, 10);
    let grabbed = false;

    const targetDist = (x, y) => {
        return Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2)
    }

    const toLocalXY = ((e) => {
        if (!(e instanceof MouseEvent)) {
            alert(e + " is not a MouseEvent, you silly goose.");
            return 0, 0;
        }

        const x = e.clientX - c.offsetLeft;
        const y = e.clientY - c.offsetTop;

        return { x, y };
    });

    const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "red"
        margin = 100
        ctx.fillRect(margin, margin, c.width - 2 * margin, c.height - 2 * margin);

        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.moveTo(margin, c.height / 2);
        ctx.lineTo(target.x, target.y)
        ctx.stroke();

        ctx.moveTo(c.width - margin, c.height / 2);
        ctx.lineTo(target.x, target.y)
        ctx.stroke();
    }

    c.addEventListener("mousedown", (e) => {
        const { x, y } = toLocalXY(e);
        if (targetDist(x, y) < target.r) {
            target.x = x;
            target.y = y;
            grabbed = true;
        }
    });

    c.addEventListener("mousemove", (e) => {
        const { x, y } = toLocalXY(e);
        if (grabbed) {
            target.x = x;
            target.y = y;
            draw();
        }
    });

    c.addEventListener("mouseup", () => {
        grabbed = false;
        target.x = c.width / 2;
        target.y = c.height / 2;
        draw();
    });
    draw();
});