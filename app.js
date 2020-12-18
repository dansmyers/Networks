/* Atmosphere: GROUP 2 FINAL PROJECT */
/* Jaysa, Eric, Kyle, Nikola */
    
    "use strict";
    
    /* GLOBAL VARIABLES */
    
    // variable for the weather in given city
    let currentWeather = "";
    
    // mappings for weather -> genre
    let mappings = {
        
        "Thunderstorm":"metal",
        "Drizzle":"focus",
        "Rain":"sleep",
        "Snow":"jazz",
        "Clear":"pop",
        "Clouds":"classical",
        "Mist":"wellness",
        "Smoke":"rock",
        "Haze":"folk",
        "Dust":"country",
        "Fog":"indie",
        "Sand":"edm",
        "Ash":"soundtrack",
        "Squall":"hip hop",
        "Tornado":"workout"
    };
    
    function getWeather() {
        
        let cityElement = document.getElementById("input-city");
        let cityName = cityElement.value;
        
        // get weather for city name
        let key = '511cdd7deea9175651ad977feec2c94e';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
        
        .then(function(resp) { return resp.json() }) // convert data to json
        
        .then(function(data) {
            console.log(data.weather[0].main); // output main description in console
            currentWeather = data.weather[0].main; // current weather for given city
            document.getElementById("curr-weather").innerHTML = currentWeather; // display weather
            
            showPlaylist();
        })
        .catch(function() {
            // catch any errors
        });
    }
    
    function showPlaylist() {
        
        console.log("showPlaylist has been called");
        
        // get reference to playlist image object
        let playlistDiv = document.getElementById('playlist-art');
        
        // get reference to playlist name
        let nameDiv = document.getElementById('playlist-name');
        
        // get reference to button
        let goButton = document.getElementById('goDiv');
        
        // "Thunderstorm"
        if (currentWeather === "Thunderstorm") {
            playlistDiv.src = "metal.png"; // change icon
            nameDiv.innerHTML = "metal essentials"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWWOaP4H0w5b0"; // add playlist link
        } 
        // "Drizzle"
        else if (currentWeather === "Drizzle") {
            playlistDiv.src = "focus.png"; // change icon
            nameDiv.innerHTML = "lo-fi beats"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn"; // add playlist link
        }
        // "Rain"
        else if (currentWeather === "Rain") {
            playlistDiv.src = "sleep.png"; // change icon
            nameDiv.innerHTML = "Deep Sleep"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWYcDQ1hSjOpY"; // add playlist link
        }
        // "Snow"
        else if (currentWeather === "Snow") {
            playlistDiv.src = "jazz.png"; // change icon
            nameDiv.innerHTML = "jazz class"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWTR4ZOXTfd9K"; // add playlist link
        }
        // "Clear"
        else if (currentWeather === "Clear") {
            playlistDiv.src = "pop.png"; // change icon
            nameDiv.innerHTML = "top pop"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DX92MLsP3K1fI"; // add playlist link
        }
        // "Clouds"
        else if (currentWeather === "Clouds") {
            playlistDiv.src = "classical.png"; // change icon
            nameDiv.innerHTML = "classical essentials"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0?si=q1RkJ7C4S02cLyJ1f1OyUA"; // add playlist link
        }
        // "Mist"
        else if (currentWeather === "Mist") {
            playlistDiv.src = "wellness.png"; // change icon
            nameDiv.innerHTML = "spa treatment"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DX4Q2SnB3glnP"; // add playlist link
        }
        // "Smoke"
        else if (currentWeather === "Smoke") {
            playlistDiv.src = "rock.png"; // change icon
            nameDiv.innerHTML = "rock classics"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U"; // add playlist link
        }
        // "Haze"
        else if (currentWeather === "Haze") {
            playlistDiv.src = "folk.png"; // change icon
            nameDiv.innerHTML = "essential folk"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWVmps5U8gHNv"; // add playlist link
        }
        // "Dust"
        else if (currentWeather === "Dust") {
            playlistDiv.src = "country.png"; // change icon
            nameDiv.innerHTML = "forever country"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DX9hWdQ46pHPo"; // add playlist link
        }
        // "Fog"
        else if (currentWeather === "Fog") {
            playlistDiv.src = "indie.png"; // change icon
            nameDiv.innerHTML = "indie mixtape"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWZ36WmBvUunS"; // add playlist link
        }
        // "Sand"
        else if (currentWeather === "Sand") {
            playlistDiv.src = "edm.png"; // change icon
            nameDiv.innerHTML = "mint"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n"; // add playlist link
        }
        // "Ash"
        else if (currentWeather === "Ash") {
            playlistDiv.src = "ska.png"; // change icon
            nameDiv.innerHTML = "essential ska"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DX7WJ4yDmRK8R"; // add playlist link
        }
        // "Squall"
        else if (currentWeather === "Squall") {
            playlistDiv.src = "hiphop.png"; // change icon
            nameDiv.innerHTML = "hip-hop mixtape"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWVdgXTbYm2r0"; // add playlist link
        }
        // "Tornado"
        else if (currentWeather === "Tornado") {
            playlistDiv.src = "workout.png"; // change icon
            nameDiv.innerHTML = "workout hits"; // add playlist name
            goButton.href = "https://open.spotify.com/playlist/37i9dQZF1DWVciwe52Zt0R"; // add playlist link
        }
        // Unknown Weather/No Entry
        else {
            nameDiv.innerHTML = "something went wrong"; // add playlist name
        }
        
    }
    
    
