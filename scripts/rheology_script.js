const section = document.getElementById('canvassection_rheology');
const canvas = document.getElementById('myCanvas');
const original_window_width = window.innerWidth
const original_window_height = window.innerHeight
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
    

    canvas.width = original_window_width;
    canvas.height = original_window_height;
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    harmonic_data_height = canvas.height*0.5

    firstharmonic = firstHarmonicPhase.value
    thirdharmonic = thirdHarmonicPhase.value
    intensity = three_to_one_intensity.value;
    denominator = intensity+ 1;
    first_intensity = 1 - intensity;
    third_intensity = intensity / denominator;

    drawPoints(generatePoints(100, canvas.width, harmonic_data_height, 0, 1 , 1),"black",true);
    //drawPoints(generatePoints(100, canvas.width, canvas.height, firstharmonic, 1,first_intensity),"blue", false);
    //drawPoints(generatePoints(100, canvas.width, canvas.height, thirdharmonic, 3,intensity),"red", false);

    drawPoints(generatePoints_2(100, canvas.width, harmonic_data_height, firstharmonic,first_intensity, thirdharmonic , intensity),"purple",false);
}





function generatePoints(i, n, m, phasedelay, multiplier, intensity) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const scaling = m/ 4 * intensity
        const scaling_x = 1/i * n*0.85
        const offset = m / 2*0.75
        const x = count*scaling_x+10;
        const y =
            (Math.sin((count/i) *multiplier* Math.PI * 2 + Math.PI + (phasedelay / 180) * Math.PI))  * scaling +
            offset;
        points.push({ x, y });
    }

    return points;
}

function generatePoints_2(i, n, m, phasedelay1, intensity1, phasedelay2,intensity2) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const scaling_y1 = m/ 4 * intensity1
        const scaling_y2 = m/ 4 * intensity2

        const scaling_x = 1/i * n*0.785
        const offset = m / 2*0.75
        const x = count*scaling_x+10;
        const y =
            (Math.sin((count / i)*1 * Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI)* scaling_y1+
            Math.sin((count / i)*3 * Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI)* scaling_y2) +
            offset;
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


