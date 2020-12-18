let currentSound = document.getElementById("sunnySound"); // default sound

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
    loopSound("rainSound");
})

/* Snow */
let snowButton = document.getElementById("snow-btn");

snowButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-snow.json");
    tsParticles.dom()[0].refresh();
    loopSound("snowSound");
})

/* Cloudy */
let cloudyButton = document.getElementById("cloudy-btn");

cloudyButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-cloudy.json");
    tsParticles.dom()[0].refresh();
    loopSound("cloudSound");
})

/* Clear */
let clearButton = document.getElementById("clear-btn");

clearButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-clear.json");
    tsParticles.dom()[0].refresh();
    loopSound("sunnySound");
})

/* Mist */
let mistButton = document.getElementById("mist-btn");

mistButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles/particles-mist.json");
    tsParticles.dom()[0].refresh();
    loopSound("cloudSound");
})

/* Sound Toggle */
let soundToggleButton = document.getElementById("mute-btn");

soundToggleButton.addEventListener('click', function() {
    if (currentSound.paused) {
        currentSound.play();
    }
    else {
        currentSound.pause();
    }
})

/* Sound Play Loop */
function loopSound(soundName) {
    currentSound.pause();
    currentSound = document.getElementById(soundName);
    currentSound.loop = true;
    currentSound.play();
}