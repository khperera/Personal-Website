const section = document.getElementById('canvassection_rheology');
const canvas = document.getElementById('myCanvas');
const original_window_width = window.innerWidth
const original_window_height = window.innerHeight
const ctx = canvas.getContext('2d');
const firstHarmonicPhase = document.getElementById("slider")
const thirdHarmonicPhase = document.getElementById("slider1")
const three_to_one_intensity = document.getElementById("slider2")
const waveform_speed = document.getElementById("slider3")


// Add event listener to the slider input

const selectedValue = document.getElementById('selectedValue');
const selectedValue1 = document.getElementById('selectedValue1');
const selectedValue2 = document.getElementById('selectedValue2');
const selectedValue3 = document.getElementById('selectedValue3');


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

waveform_speed.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue3.textContent = waveform_speed.value;
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









function setCanvasSize(timeFactor) {
    

    //canvas.width = original_window_width;
    //canvas.height = original_window_height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    harmonic_data_height = canvas.height*0.5

    firstharmonic = firstHarmonicPhase.value
    thirdharmonic = thirdHarmonicPhase.value
    intensity = three_to_one_intensity.value;
    waveform_speed_ = waveform_speed.value;
    denominator = intensity+ 1;
    first_intensity = 1 - intensity;
    third_intensity = intensity / denominator;
    points1 = generatePoints(100, canvas.width, harmonic_data_height, 0, 1 , 1, timeFactor*waveform_speed_)
    points2 = generatePoints_2(100, canvas.width, harmonic_data_height, firstharmonic,first_intensity, thirdharmonic , intensity, timeFactor*waveform_speed_)
    points_all = generatePoints_all(100, canvas.width, harmonic_data_height, firstharmonic,first_intensity, thirdharmonic , intensity, timeFactor*waveform_speed_)
    //drawPoints(points1,points2,"black",true);
    drawPoints2(points_all,"red", false)
    //drawPoints(generatePoints(100, canvas.width, canvas.height, firstharmonic, 1,first_intensity),"blue", false);
    //drawPoints(generatePoints(100, canvas.width, canvas.height, thirdharmonic, 3,intensity),"red", false);

}


function generatePoints_all(i, n, m, phasedelay1, intensity1, phasedelay2,intensity2, timeFactor) {
    const points = [];

    for (let count = 0; count < i; count++) {
        color = "black"
        if (count/i < 0.05) {
            color = "yellow"
        } 
        else { 
            color = "black"
        }


        const scaling_y1 = m/ 4 * intensity1
        const scaling_y2 = m/ 4 * intensity2

        const scaling_x = 1/i * n*0.50
        const offset = m / 2*0.75
        const x = count*scaling_x+10;
        const strain = Math.sin((count / i)*1 * Math.PI * 2 + Math.PI+timeFactor*Math.PI)* scaling_y1
        const y_1 =
            (Math.sin((count/i) *1* Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI))  * scaling_y1 +
            offset;
        const y_3 =
            (Math.sin((count/i) *3* Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*Math.PI*3))  * scaling_y2 +
            offset;
        const y_derivative_1 = (Math.cos((count/i) *1* Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI))  * scaling_y1 *1  +
        offset;
        const y_derivative_3 = (Math.cos((count/i) *3* Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*Math.PI))  * scaling_y2  +
        offset;

        y_total = y_1 +y_3
        y_derivative_total = y_derivative_1+y_derivative_3

        points.push({ x, y_1,y_3,y_derivative_1, y_derivative_3, y_derivative_total,y_total, strain, color });
    }

    return points;
}


function generatePoints(i, n, m, phasedelay, multiplier, intensity, timeFactor) {
    const points = [];

    for (let count = 0; count < i; count++) {
        const scaling = m/ 4 * intensity
        const scaling_x = 1/i * n*0.85
        const offset = m / 2*0.75
        const x = count*scaling_x+10;
        const color = "red"
        const y =
            (Math.sin((count/i) *multiplier* Math.PI * 2 + Math.PI + (phasedelay / 180) * Math.PI+timeFactor*Math.PI))  * scaling +
            offset;
        const y_derivative = (Math.cos((count/i) *multiplier* Math.PI * 2 + Math.PI + (phasedelay / 180) * Math.PI))  * scaling *multiplier  +
        offset;
        points.push({ x, y, y_derivative, color });
    }

    return points;
}

function generatePoints_2(i, n, m, phasedelay1, intensity1, phasedelay2,intensity2, timeFactor) {
    const points = [];


    for (let count = 0; count < i; count++) {
        color = "black"
        if (count/i < 0.05) {
            color = "yellow"
        } 
        else { 
            color = "purple"
        }
        const scaling_y1 = m/ 4 * intensity1
        const scaling_y2 = m/ 4 * intensity2

        const scaling_x = 1/i * n*0.85
        const offset = m / 2*0.75
        const x = count*scaling_x+10;
        
        const y =
            (Math.sin((count / i)*1 * Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI)* scaling_y1+
            Math.sin((count / i)*3 * Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*3*Math.PI)* scaling_y2) +
            offset;
        const y_derivative =
            (Math.cos((count / i)*1 * Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI)* scaling_y1+
            Math.cos((count / i)*3 * Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*3*Math.PI)* scaling_y2) +
            offset;
        
        points.push({ x, y, y_derivative, color });
    }

    return points;
}




//It should take in a list of points and draw them out.
function drawPoints(point,points2, color, clear) {
    if (clear){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    //const point = [].concat(pointslist)
    //point = pointslist[0]

    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.y, point.y_derivative, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    });
    points2.forEach(point2 => {
        ctx.beginPath();
        ctx.arc(point2.y, point2.y_derivative, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    });

    


    /*
        point.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y+550, 5, 0, 2 * Math.PI);
            ctx.fillStyle = point.color;
            ctx.fill();
            ctx.stroke();
        });*/
    
    console.log(point);

}
//It should take in a list of points and draw them out.
function drawPoints2(point, color, clear) {
    if (clear){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    //const point = [].concat(pointslist)
    //point = pointslist[0]


    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, -point.y_total+600, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.stroke();
    });
    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.y_total-200, -1*point.strain+600, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.stroke();
    });


    


    /*
        point.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y+550, 5, 0, 2 * Math.PI);
            ctx.fillStyle = point.color;
            ctx.fill();
            ctx.stroke();
        });*/
    
    console.log(point);

}

// Create a timeline with anime.js
const timeline = anime.timeline({
    loop: true, // Loop the animation
});

// Add a delay of 500 milliseconds before starting the animation

// Update the time variable every 500 milliseconds
timeline.add({
    update: function(anim) {
        const timeFactor = anim.progress; // Use the animation progress as the time factor
        setCanvasSize(timeFactor/2);
    },
    duration: 60000, // Duration of the update
});
timeline.add({
    targets: {},
    duration: 0,
});