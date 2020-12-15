
let dropdown = $('#city-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>-- Select a City --</option>');
dropdown.prop('selectedIndex', 0);

const url = 'cities-big.json';

let cities = new Map();
let cityArray = [];
let currentCityIndex = 0;

// Parse JSON data into city hashmap and cityArray array for future use
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    let fullCityInfo = entry.name + ", " + entry.subcountry + ", " + entry.country;
    cities.set(fullCityInfo, entry.geonameid);
    cityArray[currentCityIndex] = fullCityInfo;
    currentCityIndex++;
  })
});

// autocomplete makes looking for desired city much easier
$("#citytextbox").autocomplete(
    {
        source: cityArray,
        select: function findCity(event, ui) {
            currentCityID = cities.get(ui.item.label);
            weatherBalloon( currentCityID );
        }
    },
    {
        autoFocus: true,
        delay: 0,
        minLength: 4
    }
);

