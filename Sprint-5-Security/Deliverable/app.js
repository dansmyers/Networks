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
    tsParticles.loadJSON("tsparticles", "particles-rain.json");
    tsParticles.dom()[0].refresh();
})

/* Snow Particles */
let snowButton = document.getElementById("snow-btn");

snowButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles-snow.json");
    tsParticles.dom()[0].refresh();
})

/* Clear */
let clearButton = document.getElementById("clear-btn");

clearButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles-clear.json");
    tsParticles.dom()[0].refresh();
})

/* Cloudy */
let cloudyButton = document.getElementById("cloudy-btn");

cloudyButton.addEventListener('click', function() {
    tsParticles.loadJSON("tsparticles", "particles-cloudy.json");
    tsParticles.dom()[0].refresh();
})

/* Dropdown Menu */
let elements = document.getElementsByClassName('dropdown-item');

Array.from(elements).forEach((element) => {
    element.addEventListener('click', (event) => {

        currentCityID = cities.get(event.target.textContent);
        console.log(currentCityID);
        weatherBalloon( currentCityID );

    });
});

/* Future City Hashmap Index */
let cities = new Map();
cities.set('Orlando', 4167147);
cities.set('New York City', 5128581);
cities.set('Piedmont', 4083004);
cities.set('Osaka', 1853908);
cities.set('Atlanta', 4180439);
cities.set('Selmer', 4656442);
cities.set('Tokyo', 1850147);
cities.set('London', 2643743);5780993
cities.set('Salt Lake City', 5780993);
cities.set('Egypt', 357994);

let currentCityID = 4167147;