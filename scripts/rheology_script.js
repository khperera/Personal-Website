const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const firstHarmonicPhase = document.getElementById("slider")

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    firstharmonic = firstHarmonicPhase.value
    drawPoints(generatePoints(10, canvas.width, canvas.height, firstharmonic),"blue");
}

function generatePoints(i, n, m, firstharmonic) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const x = count/i * n;
        const y = count/i * m;
        points.push({ x, y });
    }

    return points;
}

function drawPoints(points, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    });
}



window.addEventListener('resize', setCanvasSize);

setCanvasSize();