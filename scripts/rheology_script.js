const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const firstHarmonicPhase = document.getElementById("slider")

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    firstharmonic = firstHarmonicPhase.value
    drawPoints(generatePoints(100, canvas.width, canvas.height, firstHarmonicPhase.value),"blue", true);
    drawPoints(generatePoints(100, canvas.width, canvas.height, 0),"black",false);
}

function generatePoints(i, n, m, firstharmonic) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const x =count/i * n;
        const y = Math.sin(count/i*3.14*2+3.14+firstharmonic/180*3.14)*m/4+m/4;
        points.push({ x, y });
    }

    return points;
}

function drawPoints(points, color, clear) {
    if (clear){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
        

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    });
}


// Add event listener to the slider input
const slider = document.getElementById('slider');
const selectedValue = document.getElementById('selectedValue');

slider.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    setCanvasSize();
});


window.addEventListener('resize', setCanvasSize);

setCanvasSize();