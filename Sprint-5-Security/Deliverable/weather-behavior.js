let currentWeather = "";
let currentCityID = "4167147";

function weatherBalloon( cityID ) {
    var key = '27dc2ecb9b04d810f8ec9d991876dfa4';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            drawWeather(data);
        })
        .catch(function() {
            console.log("Sorry, the requested city does not exist in the OpenWeatherMap database.");
        });
}

function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    var description = d.weather[0].description;

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name;

    if( description.includes("rain") ) {
        document.body.className = 'rainy';
        currentWeather = "rainy";
        tsParticles.loadJSON("tsparticles", "particles/particles-rain.json");
        tsParticles.dom()[0].refresh();
        console.log("rainy");
    } else if( description.includes("snow") ) {
        document.body.className = 'snow';
        currentWeather = "snow";
        tsParticles.loadJSON("tsparticles", "particles/particles-snow.json");
        tsParticles.dom()[0].refresh();
        console.log("snowy");
    } else if( description.includes("clear") ) {
        document.body.className = 'clear';
        currentWeather = "clear";
        tsParticles.loadJSON("tsparticles", "particles/particles-clear.json");
        tsParticles.dom()[0].refresh();
        console.log("clear");
    } else if( description.includes("cloud") ) {
        document.body.className = 'cloud';
        currentWeather = "cloud";
        tsParticles.loadJSON("tsparticles", "particles/particles-cloudy.json");
        tsParticles.dom()[0].refresh();
        console.log("cloud");
    }

}

window.onload = function() {
    weatherBalloon( currentCityID );
}