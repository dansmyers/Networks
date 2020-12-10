
window.addEventListener('load', ()=>{
//set up important variables
let lon;
let lat;
let tempDesc = document.querySelector('.temp-description');
let tempDegree = document.querySelector('.temp-degree');
let locationZone = document.querySelector('.location-timezone');


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{

        lon = position.coords.longitude;
        lat = position.coords.latitude;
        const apiKey = '4d9534f3a14a0f2346837165b7dd3223';
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}` ;
        const api2 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
          //grab temp, summary, and icon from JSON
          const temp = data.main.temp;
          const summary = data.weather[0].description;
          const icon = data.weather[0].icon;
          const iconURL = `http://openweathermap.org/img/w/${icon}.png`


          //set temp, summary, and icon
          tempDegree.textContent = Math.floor(temp);
          tempDesc.textContent = summary;
          document.querySelector('.icon').src = iconURL;
        })

          // update location
        fetch(api2)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
          //grab location
            const {city, neighbourhood, state} = data.address;
            abbrState(state,'abbr');

            locationZone.textContent = neighbourhood + ", " + city;

        })

    });


}else{
    console.log("error");
    alert("Can't get location");
}


});
