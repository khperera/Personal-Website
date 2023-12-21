const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const firstHarmonicPhase = document.getElementById("slider")
const thirdHarmonicPhase = document.getElementById("slider1")
const three_to_one_intensity = document.getElementById("slider2")


// Add event listener to the slider input

const selectedValue = document.getElementById('selectedValue');
const selectedValue1 = document.getElementById('selectedValue1');
const selectedValue2 = document.getElementById('selectedValue2');

firstHarmonicPhase.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue.textContent = firstHarmonicPhase.value;
    setCanvasSize();
});

thirdHarmonicPhase.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue1.textContent = thirdHarmonicPhase.value;
    setCanvasSize();
});
three_to_one_intensity.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue2.textContent = three_to_one_intensity.value;
    setCanvasSize();
});


window.addEventListener('resize', setCanvasSize);

setCanvasSize();









function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    firstharmonic = firstHarmonicPhase.value
    thirdharmonic = thirdHarmonicPhase.value
    intensity1 = three_to_one_intensity.value
    intensity = 0.6
    first_intensity = 1/(intensity+1)
    third_intensity = intensity/(intensity+1)


    drawPoints(generatePoints(100, canvas.width, canvas.height, firstharmonic, first_intensity),"blue", true);
    drawPoints(generatePoints(100, canvas.width, canvas.height, thirdharmonic, third_intensity),"red", false);
    drawPoints(generatePoints(100, canvas.width, canvas.height, 0 , 1),"black",false);
}

function generatePoints(i, n, m, phasedelay, intensity) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const x =count/i * n;
        const y = (Math.sin(count/i*3.14*2+3.14+phasedelay/180*3.14)*intensity*m/4)+m/4;
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


