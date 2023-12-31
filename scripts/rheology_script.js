const section = document.getElementById('canvassection_rheology');
const canvas = document.getElementById('myCanvas');
const original_window_width = window.innerWidth
const original_window_height = window.innerHeight
const ctx = canvas.getContext('2d');
const firstHarmonicPhase = document.getElementById("slider")
const thirdHarmonicPhase = document.getElementById("slider1")
const three_to_one_intensity = document.getElementById("slider2")
const waveform_speed = document.getElementById("slider3")
var strain_position = 0
var stress_position = 0
var phase_angle = 0

// Add event listener to the slider input

const selectedValue = document.getElementById('selectedValue');
const selectedValue1 = document.getElementById('selectedValue1');
const selectedValue2 = document.getElementById('selectedValue2');
const selectedValue3 = document.getElementById('selectedValue3');

const top_plate_position_x = 100


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



window.addEventListener('resize', setCanvasSize);

setCanvasSize();






function drawwords(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "Black"
    ctx.fillText("Strain", 300, 200);
    ctx.fillText("Stress", 300, 100);

    ctx.fillText("Elastic Projection", 40, 650);
    ctx.fillText("Viscous Projection", 300, 650);
    ctx.fillText("Strain Rate", 340, 580);
    ctx.fillText("Strain", 100, 580);



    ctx.save()
    ctx.font = "25px Arial";
    ctx.translate(30,450)
    ctx.rotate(-Math.PI/2)
    
    ctx.fillText("Stress", 0, 0);


    ctx.restore()



    ctx.beginPath();
    ctx.arc(400, 190, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(430, 190, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 90, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(430, 90, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5
    ctx.rect(40, 300, 250, 250);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(290, 300, 250, 250);
    ctx.stroke();

}



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
    first_intensity = 1 - intensity;

    points_all = generatePoints_all(100, canvas.width, harmonic_data_height, firstharmonic,first_intensity, thirdharmonic , intensity, timeFactor*waveform_speed_)
    //drawPoints(points1,points2,"black",true);
    drawPoints2(points_all,"red", true)
    //drawPoints(generatePoints(100, canvas.width, canvas.height, firstharmonic, 1,first_intensity),"blue", false);
    //drawPoints(generatePoints(100, canvas.width, canvas.height, thirdharmonic, 3,intensity),"red", false);

}


function generatePoints_all(i, n, m, phasedelay1, intensity1, phasedelay2,intensity2, timeFactor) {
    const points = [];

    for (let count = 0; count < i; count++) {
        color = "white"
        color1 = "black"
        if (count/i < 0.05) {
            color = "yellow"
            color1 = "red"
        } 
        else { 
            color = "white"
        }

        if (count == 0){

        }

        


        const x = count/i
        const strain = Math.sin((count / i)*1 * Math.PI * 2 + Math.PI+timeFactor*Math.PI)
        const strain_der = Math.cos((count / i)*1 * Math.PI * 2 + Math.PI+timeFactor*Math.PI)
        const y_1 =
            (Math.sin((count/i) *1* Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI));
        const y_3 =
            (Math.sin((count/i) *3* Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*Math.PI*3));
        const y_derivative_1 = (Math.cos((count/i) *1* Math.PI * 2 + Math.PI + (phasedelay1 / 180) * Math.PI+timeFactor*Math.PI)) *1 ;
        const y_derivative_3 = (Math.cos((count/i) *3* Math.PI * 2 + Math.PI + (phasedelay2 / 180) * Math.PI+timeFactor*Math.PI));

        y_total = y_1*intensity1 +y_3*intensity2
        y_derivative_total = y_derivative_1*intensity1+y_derivative_3*intensity2
        if (count == 0) {
           strain_position = strain 
           stress_position = y_total
        }

        
        points.push({ x, y_1,y_3,y_derivative_1, y_derivative_3, y_derivative_total,y_total, strain, color, color1, strain_der });
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
function drawPoints2(point, color, clear) {
    if (clear){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    //const point = [].concat(pointslist)
    //point = pointslist[0]

    //Waveform data
    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x*200+50, point.y_total*-100 + 140, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.stroke();
    });
    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x*200+50, point.strain*-100+140, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color1;
        ctx.fill();
        ctx.stroke();
    });
    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(40, point.x*-250+250, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    });
    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x*-250+275, 135, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    });



    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.strain*100+160, point.y_total*-100+430, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.stroke();
    });



    point.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.strain_der*100+410, point.y_total*-100+435, 5, 0, 2 * Math.PI);
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
/*
// Update the time variable every 500 milliseconds
timeline.add({
    update: function(anim) {
        const timeFactor = anim.progress; // Use the animation progress as the time factor
        setCanvasSize(timeFactor/2);
    },
    duration: 60000, // Duration of the update
});
*/


// Update the time variable every 500 milliseconds
timeline.add({
    update: function(anim) {
        const timeFactor = anim.progress; // Use the animation progress as the time factor
        setCanvasSize(timeFactor/2);
        drawwords()

        var newXPosition = (strain_position*100)+105;
        var newStressPosition = (stress_position*100)+105;

        var element = document.querySelector('#top-plate-side-marker');
        var element_stress = document.querySelector('#top-plate-side-bottom');
        var element_stress_rotation = document.querySelector('#top-plate-top-marker');
        var element_strain_rotation = document.querySelector('#bottom-plate-top-marker');

        var sample = document.querySelector('#sample');

        var color_red = String(255- phase_angle*255/90)
        var color_blue = String(phase_angle*255/90)
        var color = "rgb("+color_red +",0," + color_blue+")"

        


        
        if (element) {
            element.setAttribute('x', newXPosition);
            var rotationAngle = stress_position*90; // Example rotation angle, adjust as needed
            var cx = 450; // X coordinate of the center of rotation
            var cy = 75; // Y coordinate of the center of rotation
            element_strain_rotation.setAttribute('transform', `rotate(${rotationAngle} ${cx} ${cy})`);

        }

        if (element_stress) {
            element_stress.setAttribute('x', newStressPosition);
            sample.setAttribute("fill",color)
            var rotationAngle = strain_position*90; // Example rotation angle, adjust as needed
            var cx = 300; // X coordinate of the center of rotation
            var cy = 75; // Y coordinate of the center of rotation
            element_stress_rotation.setAttribute('transform', `rotate(${rotationAngle} ${cx} ${cy})`);
        }


    },
    duration: 60000, // Duration of the update
});



timeline.add({
    targets: {},
    duration: 0,
});