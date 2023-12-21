// Add event listener to the slider input
const slider = document.getElementById('slider');
const selectedValue = document.getElementById('selectedValue');

slider.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue.textContent = slider.value;
});

// Add event listener to the slider input
const slider1 = document.getElementById('slider1');
const selectedValue1 = document.getElementById('selectedValue1');

slider1.addEventListener('input', function() {
    // Update the displayed value as the slider is moved
    selectedValue1.textContent = slider1.value;
});