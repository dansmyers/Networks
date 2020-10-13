
  // Declare lists of menu components

  //appetizers
  let appIngredients = ['sea scallop', 'reindeer', 'chicken bone', 'haricots vertes',
                          'langoustine', 'ham', 'cuttlefish', 'kale'];

  let appPreparations = ['globules', 'cubes', 'granules', 'pasta', 'risotto',
                           'sashimi', 'crunchwrap', 'snowcone', 'tacos',
                           'mist', 'hash', 'wellington', 'mush', 'graupel'];

  let appAdjectives = ['frightened', 'farm-to-table', 'sea-salt',
                         'ominous', 'non-euclidean', 'carbonized', 'spectral',
                         'argyle', 'korean bbq', 'cilantro-lime', 'oblique',
                         'ketchuped', 'curried', 'inverted', 'digitized'];

  //main Courses
  let mainIngredients = ['kombucha','soy', 'tofu','bacon', 'sprout', 'beer cheese', 'poke', 'kimchi', 'craft beer'];

  let mainPreparations = ['plate', 'burrito', 'roll', 'tower', 'burger', 'pasta'];

  let mainAdjectives = ['mini', 'instagramable', 'vegan', 'zero calorie'];

  //desserts

  let dessertIngredients = ['cold brew','coconut milk', 'matcha', 'oat', 'water'];

  let dessertPreparations = ['pie', 'bowl', 'cone', 'smoothie'];

  let dessertAdjectives = ['low carb', 'cute', 'enviornmentally friendly'];

  const MAX_APP_PRICE = 20;

  function choose(arr) {

    // Choose a random element from the input array
    let index = Math.floor(Math.random() * arr.length);
    let choice = arr[index];

    // Splice out the random choice so it doesn't get
    // picked again
    arr.splice(index, 1);

    return choice;
  }


// Generate appetizers
  function generateAppetizer() {
    let result = choose(appAdjectives) + ' ';
    result += choose(appIngredients) + ' ';
    result += choose(appPreparations);

    return result;
  }

  function generateAppetizers() {
    for (let i = 0; i < 3; i++) {

      // Generate a random item and price
      let result = generateAppetizer();
      let price = Math.floor(Math.random() * (MAX_APP_PRICE - 1)) + 1;

      // Insert the new item into the appetizers div

      // Get a reference to the appetizers div
      let section = document.getElementById('appetizers');

      // Create a new <p> node
      let para = document.createElement('p');

      // Set the internal contents of the new <p> node
      // to hold the randomized menu item and set class
      para.innerHTML = '<span class="name">' + result + '</span>';
      para.innerHTML += '<span class="price">' + price + '</span>';

      // This is required to position the next line properly
      para.innerHTML += '<div class="clear"></div>'

      // Append the new <p> node to the list of appetizers
      section.appendChild(para);
    }
  }

  // Generate Main Courses

  function generateMainCourse() {
    let result = choose(mainAdjectives) + ' ';
    result += choose(mainIngredients) + ' ';
    result += choose(mainPreparations);

    return result;
  }

  function generateMainCourses() {
    for (let i = 0; i < 3; i++) {

      // Generate a random item and price
      let result = generateMainCourse();
      let price = Math.floor(Math.random() * (MAX_APP_PRICE - 1)) + 1;

      // Insert the new item into the main course div

      // Get a reference to the main courses div
      let section = document.getElementById('main_courses');

      // Create a new <p> node
      let para = document.createElement('p');

      // Set the internal contents of the new <p> node
      // to hold the randomized menu item and set class
      para.innerHTML = '<span class="name">' + result + '</span>';
      para.innerHTML += '<span class="price">' + price + '</span>';

      // This is required to position the next line properly
      para.innerHTML += '<div class="clear"></div>'

      // Append the new <p> node to the list of main course
      section.appendChild(para);
    }
  }

  function generateDessert() {
    let result = choose(dessertAdjectives) + ' ';
    result += choose(dessertIngredients) + ' ';
    result += choose(dessertPreparations);

    return result;
  }

  function generateDesserts() {
    for (let i = 0; i < 3; i++) {

      // Generate a random item and price
      let result = generateDessert();
      let price = Math.floor(Math.random() * (MAX_APP_PRICE - 1)) + 1;

      // Insert the new item into the desserts div

      // Get a reference to the desserts div
      let section = document.getElementById('desserts');

      // Create a new <p> node
      let para = document.createElement('p');

      // Set the internal contents of the new <p> node
      // to hold the randomized menu item and set class
      para.innerHTML = '<span class="name">' + result + '</span>';
      para.innerHTML += '<span class="price">' + price + '</span>';

      // This is required to position the next line properly
      para.innerHTML += '<div class="clear"></div>'

      // Append the new <p> node to the list of desserts
      section.appendChild(para);
    }
  }

  //Generate desserts

  function main() {
    generateAppetizers();
    generateMainCourses();
    generateDesserts();
  }

  // The onload property sets a function that will run once
  // the page has finished loading
  document.onload = main();
