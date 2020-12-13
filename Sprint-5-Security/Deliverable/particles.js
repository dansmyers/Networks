
/* Toggle Particle Animation */
let toggleButton = document.getElementById("toggle-btn");

toggleButton.addEventListener('click', function() {
    if (tsParticles.dom()[0].getAnimationStatus() === true)
        tsParticles.dom()[0].pause();
    else
        tsParticles.dom()[0].play();
})

/* Rain Particles */
let rainButton = document.getElementById("rain-btn");

rainButton.addEventListener('click', function() {
    
    tsParticles.loadJSON("tsparticles", "particles/particles-rain.json");
    tsParticles.dom()[0].refresh();
    
})

/* Snow Particles */
let snowButton = document.getElementById("snow-btn");

snowButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-snow.json");
    tsParticles.dom()[0].refresh();
})

/* Clear */
let clearButton = document.getElementById("clear-btn");

clearButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-clear.json");
    tsParticles.dom()[0].refresh();
})

/* Cloudy */
let cloudyButton = document.getElementById("cloudy-btn");

cloudyButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-cloudy.json");
    tsParticles.dom()[0].refresh();
})

