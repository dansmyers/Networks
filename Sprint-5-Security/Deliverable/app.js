
// ---------------------------------------------------------------------------------------------
/* Weather*/
// ---------------------------------------------------------------------------------------------
let currentWeather = "";
let currentCityID = 2130629;

let myAudio = new Audio();


// hashmap to store city name (key) to their id (value)
let cities = new Map();
cities.set('Orlando', 4167147);
cities.set('New York City', 5128581);
cities.set('Piedmont', 4083004);
cities.set('Osaka', 1853908);
cities.set('Atlanta', 4180439);

window.onload = function() {
    // 4083004
    // Orlando: 4167147
  weatherBalloon( currentCityID );
}

function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	var description = d.weather[0].description;
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
	
	if( description.indexOf('rain') > 0 ) {
      	document.body.className = 'rainy';
      	currentWeather = 'rainy';
      	stopSound();
      	playRain();
    } else if( description.indexOf('cloud') > 0 ) {
  	    document.body.className = 'cloudy';
  	    currentWeather = 'cloudy';
  	    stopSound();
    } else if( description.indexOf('clear') > 0 ) {
  	    document.body.className = 'clear';
  	    currentWeather = 'clear';
  	    stopSound();
    } else if( description.indexOf('clear') > 0 ) {
  	    document.body.className = 'clear';
  	    currentWeather = 'clear';
  	    stopSound();
    } else {
        document.body.className = 'sunny';
  	    currentWeather = 'sunny';
  	    stopSound();
    }
    
    
    // Particle start moving from here
    // Reason being is particles need to init after weather balloon starts
    
    init();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
}

function weatherBalloon( cityID ) {
	var key = '27dc2ecb9b04d810f8ec9d991876dfa4';
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		drawWeather(data); // Call drawWeather
	})
	.catch(function() {
		// catch any errors
	});
}

// ---------------------------------------------------------------------------------------------
/* Particles*/
// ---------------------------------------------------------------------------------------------

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numberOfParticles = 200;
let particlesArray = [];

class Particle {
    constructor(){
        if (currentWeather === 'rainy')
            this.toRainy();
        else if (currentWeather === 'cloudy')
            this.toCloudy();
        else if (currentWeather === 'clear')
            this.toClear();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (currentWeather === 'rainy')
            ctx.fillStyle = 'blue';
        else if (currentWeather === 'cloudy')
            ctx.fillStyle = 'gray';
        else if (currentWeather === 'clear')
            ctx.fillStyle = 'orange';
            
        ctx.fill();
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0){
                this.speedX = -this.speedX * (Math.floor(Math.random() * (1 - 0.5 + 1)) + 0.5);
        }
        if (this.y + this.radius > canvas.height ||
            this.y + this.radius < 0){
                this.y = 0;
        }
        
        this.draw();
    }
    toCloudy() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height / 4;
        this.radius = (Math.random() * 100) + 50;
        this.speedX = 1;
        this.speedY = 0;
    }
    toRainy() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() * 7) + 1;
        this.speedX = 0;
        this.speedY = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
    }
    toClear() {
        this.x = canvas.width / 2;
        this.y = 150;
        this.radius = 100;
        this.speedX = 0;
        this.speedY = 0;
    }
    

}
function init(){
    for (let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle());
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  init();
})

animate();

// Background noise (e.g. rain, snow, wind, etc.)

function playRain() {
    myAudio = new Audio('sounds/rain.mp3');
    myAudio.loop = true;
    myAudio.play();
}

function stopSound() {
    myAudio.pause();
}


// Dropdown menu listener
var elements = document.getElementsByClassName('dropdown-item');

Array.from(elements).forEach((element) => {
  element.addEventListener('click', (event) => {
    
    currentCityID = cities.get(event.target.innerText);
    particlesArray = [];
    weatherBalloon( currentCityID );
    
  });
});