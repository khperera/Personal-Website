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