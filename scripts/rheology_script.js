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


// JavaScript function to handle the toggle
function toggleButton() {
    var button = document.getElementById("toggleButton");
    button.classList.toggle("active");

    // Toggle the text content
    if (button.textContent === "On") {
        button.textContent = "Off";
    } else {
        button.textContent = "On";
    }
}

window.addEventListener('resize', setCanvasSize);

setCanvasSize();









function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    firstharmonic = firstHarmonicPhase.value
    thirdharmonic = thirdHarmonicPhase.value
    intensity = three_to_one_intensity.value;
    denominator = intensity+ 1;
    first_intensity = 1 - intensity;
    third_intensity = intensity / denominator;


    drawPoints(generatePoints(100, canvas.width, canvas.height, firstharmonic, 1,first_intensity),"blue", true);
    drawPoints(generatePoints(100, canvas.width, canvas.height, thirdharmonic, 3,intensity),"red", false);
    drawPoints(generatePoints(100, canvas.width, canvas.height, 0, 1 , 1),"black",false);
}

function generatePoints(i, n, m, phasedelay, multiplier, intensity) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const x = count/i * n;
        const y =
            (Math.sin((count / i)*multiplier * Math.PI * 2 + Math.PI + (phasedelay / 180) * Math.PI) * m) / 4 * intensity +
            m / 2;
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


