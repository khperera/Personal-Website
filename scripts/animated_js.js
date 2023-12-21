document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('animated-element');
  
    anime({
      targets: element,
      opacity: 1,
      color: '#ff6600', // Set the target color (e.g., orange)
      easing: 'easeInOutQuad',
      duration: 1000,
    });
  });


    anime({
        targets: ".circle",
        translateX: 250,
        delay: anime.stagger(200, {start: 1000}),
        direction: "alternate"
    })
