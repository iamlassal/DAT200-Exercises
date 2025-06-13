document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");

    let n = 8;
    let param = 0.1;
    let columns = 1;
    let rows = 1;
    const drawSpiral = (x, y, width, length, p) => {
        ctx.moveTo(x,y);
        ctx.fillStyle = "black";

        let x0 = x;
        let y0 = y;

        let x1 = x + width;
        let y1 = y;

        let x2 = x + width;
        let y2 = y + length;

        let x3 = x;
        let y3 = y + length;

        for (let i = 0; i < n; i++) {
            ctx.beginPath()
            ctx.lineTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x0, y0);
            ctx.stroke();
            let x0t = x0;
            let y0t = y0;

            x0 = (1 - p) * x0 + p * x1;
            y0 = (1 - p) * y0 + p * y1;
            x1 = (1 - p) * x1 + p * x2;
            y1 = (1 - p) * y1 + p * y2;
            x2 = (1 - p) * x2 + p * x3;
            y2 = (1 - p) * y2 + p * y3;
            x3 = (1 - p) * x3 + p * x0t;
            y3 = (1 - p) * y3 + p * y0t;
        }
    }

    const draw = (col, row) => {
        let width = c.width / col;
        let height = c.height / row;
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, c.width, c.height);


        for (let i = 0; i < col; i++) {
            let x = i * width;
            for (j = 0; j < row; j++) {
                let y = j * height;
                let p = Math.abs(((j+i)%2) - param);
                drawSpiral(x, y, width, height, p);
            }
        }
    }

    document.getElementById("nss").addEventListener("click", e => {
        n = parseInt(e.target.value);
        draw(columns, rows);
    });

    document.getElementById("nrs").addEventListener("click", e => {
        rows = parseFloat(e.target.value);
        draw(columns, rows);
    });

    document.getElementById("nks").addEventListener("click", e => {
        columns = parseFloat(e.target.value);
        draw(columns, rows);
    });

    document.getElementById("nps").addEventListener("click", e => {
        param = parseFloat(e.target.value);
        draw(columns, rows);
    });

    draw(1, 1);
});