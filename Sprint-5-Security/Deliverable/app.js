
// ---------------------------------------------------------------------------------------------
/* Weather*/
// ---------------------------------------------------------------------------------------------
let currentWeather = "";

window.onload = function() {
    // 4083004
  weatherBalloon( 4083004 );
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
    } else if( description.indexOf('cloud') > 0 ) {
  	    document.body.className = 'cloudy';
  	    currentWeather = 'cloudy';
    } else if( description.indexOf('sunny') > 0 ) {
  	    document.body.className = 'sunny';
  	    currentWeather = 'sunny';
    }
    
    // Particle start moving from here
    // Reason being is particles need to init after weather balloon starts
    init();
    animate();
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

const particlesArray = [];

class Particle {
    constructor(){
        if (currentWeather === 'rainy')
            this.toRainy();
        else if (currentWeather === 'cloudy')
            this.toCloudy();
        else if (currentWeather === 'sunny')
            this.toSunny();
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (currentWeather === 'rainy')
            ctx.fillStyle = 'blue';
        else if (currentWeather === 'cloudy')
            ctx.fillStyle = 'gray';
        else if (currentWeather === 'sunny')
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
        
        // mouse collision
        // not working rn
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
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
    toSunny() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() * 10) + 2;
        this.speedX = (Math.random() * 3) - 1.5;
        this.speedY = (Math.random() * 3) - 1.5;
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

// Mouse Movement position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log("mosue moved");
    }
    
);




