
/* Toggle Particle Animation */
let toggleButton = document.getElementById("toggle-btn");

toggleButton.addEventListener('click', function() {
    if (tsParticles.dom()[0].getAnimationStatus() === true)
        tsParticles.dom()[0].pause();
    else
        tsParticles.dom()[0].play();
})

/* Restart Particle Animation */
let restartButtom = document.getElementById("restart-btn");

restartButtom.addEventListener('click', function() {
        console.log("restarting particle animation");
        tsParticles.dom()[0].refresh();
})

/* Rain */
let rainButton = document.getElementById("rain-btn");

rainButton.addEventListener('click', function() {
    
    tsParticles.loadJSON("tsparticles", "particles/particles-rain.json");
    tsParticles.dom()[0].refresh();
    
})

/* Snow */
let snowButton = document.getElementById("snow-btn");

snowButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-snow.json");
    tsParticles.dom()[0].refresh();
})

/* Cloudy */
let cloudyButton = document.getElementById("cloudy-btn");

cloudyButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-cloudy.json");
    tsParticles.dom()[0].refresh();
})

/* Clear */
let clearButton = document.getElementById("clear-btn");

clearButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-clear.json");
    tsParticles.dom()[0].refresh();
})

/* Mist */
let mistButton = document.getElementById("mist-btn");

mistButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-mist.json");
    tsParticles.dom()[0].refresh();
})