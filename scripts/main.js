// Include anime.js in your HTML before this script

// Define the animation
anime({
  targets: '#wave',
  d: [
    { value: 'M10,100 Q50,50 90,100 T170,100' }, // starting shape
    { value: 'M10,100 Q50,0 90,100 T170,100' }, // bigger sine wave
    { value: 'M10,100 Q50,50 90,100 T170,100' }  // back to starting shape
  ],
  stroke: [
    { value: '#FCA311' }, // starting color
    { value: '#EB5111' }, // starting color
    { value: '#FCA311' }   // ending color
  ],
  easing: 'easeInOutSine',
  duration: 5000,
  loop: true
});


anime({
  targets: '#wave2',
  d: [
    { value: 'M10,100 C23,75 37,50 50,50 C63,50 77,75 90,100 C103,125 117,150 130,150 C143,150 157,125 170,100'  },  // Single sine wave
    { value: 'M10,100 C23,50 37,50 50,100 C63,150 77,150 90,100 C103,50 117,50 130,100 C143,150 157,150 170,100' } // Three sine waves
  ],
  stroke: [
    { value: '#6495ED' }, // starting color
    { value: '#FF6347' }  // ending color
  ],
  easing: 'easeInOutSine',
  duration: 5000,
  loop: true
});
