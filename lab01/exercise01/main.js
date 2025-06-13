

function createPath(path) {
    let result = new Path2D();
    result.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; i++) {
        result.lineTo(path[i].x, path[i].y);
    }

    result.closePath();
    return result;
}

document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    /*
        Paths
    */

    // Ground Rectangle
    const ground = [new Point(0, 400), new Point(600, 600)];
    const groundColor = "rgb(116, 168, 52)";

    // Mountain
    const mountain = [
        new Point(0, 400),
        new Point(0, 350),
        new Point(150, 300),
        new Point(300, 150),
        new Point(500, 350),
        new Point(600, 380),
        new Point(600, 400)
    ];
    const moutainPath = createPath(mountain);

    // House Front
    const houseFront = [
        new Point(100, 350),
        new Point(200, 100)
    ];

    // Roof
    const houseRoof = [
        new Point(70, 350),
        new Point(200, 290),
        new Point(330, 350),
    ];
    const roofPath = createPath(houseRoof);

    // Window
    const window = [
        new Point(120, 370),
        new Point(40, 45),
    ];

    // Door
    const door = [
        new Point(180, 370),
        new Point(40, 80)
    ];

    /*
        Colors
    */

    // Sky color
    const skyColor = ctx.createLinearGradient(0, 0, 0, c.height);
    skyColor.addColorStop(0, "lightblue");
    skyColor.addColorStop(1, "blue");

    // Mountain Color
    const mountainColor = ctx.createLinearGradient(0, 400, 100, 150);
    mountainColor.addColorStop(0, "rgb(50,50,50)");
    mountainColor.addColorStop(1, "rgb(150,150,150)");

    // Sun Color
    const sunColor = "rgb(252, 220, 106)";

    // Roof Color
    const roofColor = "rgb(167, 106, 31)";

    /*
        Draw
    */

    // Sky
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, c.width, c.height);

    // Sun
    ctx.arc(540, 75, 50, 0, 2 * Math.PI);
    ctx.fillStyle = sunColor;
    ctx.fill();
    ctx.stroke();

    // Mountain
    ctx.fillStyle = mountainColor;
    ctx.fill(moutainPath);
    ctx.stroke(moutainPath);

    // Ground
    ctx.fillStyle = groundColor;
    ctx.fillRect(ground[0].x, ground[0].y, ground[1].x, ground[1].y);
    ctx.strokeRect(ground[0].x, ground[0].y, ground[1].x, ground[1].y);

    ctx.fillStyle = "beige";
    ctx.fillRect(houseFront[0].x, houseFront[0].y, houseFront[1].x, houseFront[1].y);
    ctx.strokeRect(houseFront[0].x, houseFront[0].y, houseFront[1].x, houseFront[1].y);

    // Roof
    ctx.fillStyle = roofColor;
    ctx.fill(roofPath);
    ctx.stroke(roofPath);

    // Window 1
    ctx.fillStyle = "white";
    ctx.fillRect(window[0].x, window[0].y, window[1].x, window[1].y);
    ctx.strokeRect(window[0].x, window[0].y, window[1].x, window[1].y);

    // Window 2
    ctx.fillStyle = "white";
    ctx.fillRect(window[0].x + 120, window[0].y, window[1].x, window[1].y);
    ctx.strokeRect(window[0].x + 120, window[0].y, window[1].x, window[1].y);

    ctx.fillStyle = "crimson";
    ctx.fillRect(door[0].x, door[0].y, door[1].x, door[1].y);
    ctx.strokeRect(door[0].x, door[0].y, door[1].x, door[1].y);

    ctx.fillStyle = "black";
    ctx.fillText("iamlassal", 20, 570);
    ctx.fillText("Universitetet i Agder", 20, 585);
});