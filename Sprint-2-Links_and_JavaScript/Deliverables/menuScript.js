// Declare lists of menu components
let appIngredients = [
  "sea scallop",
  "reindeer",
  "chicken bone",
  "haricots vertes",
  "langoustine",
  "ham",
  "cuttlefish",
  "kale",
  "pommes",
  "aubergine",
  "bone marrow",
  "rocket",
];

let appPreparations = [
  "globules",
  "cubes",
  "granules",
  "pasta",
  "risotto",
  "sashimi",
  "crunchwrap",
  "snowcone",
  "tacos",
  "mist",
  "hash",
  "wellington",
  "mush",
  "graupel",
];

let appAdjectives = [
  "eldritch",
  "frightened",
  "farm-to-table",
  "sea-salt",
  "ominous",
  "non-euclidean",
  "carbonized",
  "spectral",
  "argyle",
  "korean bbq",
  "cilantro-lime",
  "oblique",
  "ketchuped",
  "curried",
  "inverted",
  "digitized",
];

let mainIngredients = [
  "lamb chop",
  "kangoroo",
  "monkey bone",
  "brussel sprout",
  "angel wing",
  "turducken",
  "swordfish",
  "baby carrot",
  "goat saliva",
  "broccolini",
  "bone marrow",
  "clam",
];

let mainSauce = [
    "ketchup",
    "chic-fil-a sauce",
    "Ragu",
    "jalepeno sauce",
    "dinasour spit sauce",
    "shimmering coconut water",
    "mayo drizzle",
    "goat milk",
    "purple flower sauce",
    "prune sauce",
    "balsamic drizzle"
    ];

let mainPreparations = [
  "globules",
  "triangles",
  "granules",
  "ravioli",
  "sushi",
  "quesadilla",
  "stew",
  "McFlurry",
  "taquitos",
  "steam",
  "hash",
  "panini",
  "mush",
  "skewers",
];

let mainAdjectives = [
  "awakening",
  "enriching",
  "mars-to-table",
  "fresh-pepper",
  "keto",
  "gently-buttered",
  "oxygen-infused",
  "calorie-free",
  "eloquent",
  "garlic-coated",
  "flexed",
  "engulfed",
  "magical",
  "secret",
  "hollographic",
];


let celebrities = [
    "Dr. Elva's",
    "Michael Jordan's",
    "Alex Morgan's",
    "Beyonce's",
    "Luke Combs'",
    "Babe Ruth's",
    "Yoda's",
    "Harry Potter's",
    "Carrie Underwood's",
    "Michelle Obama's",
    "Ghandi's",
    "Your cat's",
    "Scooby Doo's",
    "Elmo's",
    "Leonardo DiCaprio's",
    "Jerry Seinfeld's"
    ];

let dessertIngredients = [
  "spicy chocolate",
  "lavender",
  "dried pineapple",
  "pumpkin spice",
  "rainbow-jello",
  "mint-chocolate-bar",
  ".2-pound cake",
  "jalepeno",
  "ginger-muffin",
  "zuccini",
  "ricotta",
  "Onion slices",
];

let dessertPreparations = [
  "custard",
  "slime",
  "moist-goo",
  "browned-pastry",
  "french-ice",
  "thickened-gelato",
  "spongecake",
  "loaf",
  "in tofu pie shell",
  "skewer",
  "thick bread",
  "cold-souplike liquid",
];

let dessertAdjectives = [
  "fruit-infused",
  "carbonated",
  "nitrogen-attacked",
  "6-year aged",
  "effortfully-frozen",
  "rainbow-sprinkled",
  "calorie-intensified",
  "regurgitated",
  "melted",
  "smelly",
  "sliced",
  "carmalized",
  "sun-dried",
  "eye-opening",
  "sinus-clearing",
  "revitalizing",
];

const MAX_APP_PRICE = 20;
const MAX_MAIN_PRICE = 66;
const MAX_DESSERT_PRICE = 30;

function choose(arr) {
  // Choose a random element from the input array
  let index = Math.floor(Math.random() * arr.length);
  let choice = arr[index];

  // Splice out the random choice so it doesn't get
  // picked again
  //
  // splice takes an array position and the number of
  // elements to cut out beginning at that position
  arr.splice(index, 1);

  return choice;
}

function generateAppetizer() {
  let result = choose(appAdjectives) + " ";
  result += choose(appIngredients) + " ";
  result += choose(appPreparations);

  return result;
}

function generateMain() {
  let result = choose(mainAdjectives) + " ";
  result += choose(mainIngredients) + " ";
  result += choose(mainPreparations);
  result += " covered in " + choose(mainSauce);

  return result;
}

function generateDessert() {
  let result = choose(celebrities) + " favorite ";
  result += choose(dessertAdjectives) + " ";
  result += choose(dessertIngredients) + " ";
  result += choose(dessertPreparations);

  return result;
}

function generateDesserts() {
  for (let i = 0; i < 5; i++) {
    let result = generateDessert();
    let price = Math.floor(Math.random() * (MAX_DESSERT_PRICE - 1)) + 1;

    let section = document.getElementById("desserts");

    let para = document.createElement("p");

    // The name and price go in <span> tags with classes that
    // will style them to be aligned left and right respectively
    para.innerHTML = '<span class="name">' + result + "</span>";
    para.innerHTML += '<span class="price">' + price + "</span>";

    // The last piece of HTML makes an empty div with a
    // special clear setting that undoes the left and right
    // floating on the previous line
    //
    // This is required to position the next line properly
    para.innerHTML += '<div class="clear"></div>';

    // Append the new <p> node to the list of appetizers
    section.appendChild(para);
  }
}

function generateMainCourses() {
  for (let i = 0; i < 5; i++) {
    let result = generateMain();
    let price = Math.floor(Math.random() * (MAX_MAIN_PRICE - 1)) + 1;

    let section = document.getElementById("main_courses");

    let para = document.createElement("p");

    // The name and price go in <span> tags with classes that
    // will style them to be aligned left and right respectively
    para.innerHTML = '<span class="name">' + result + "</span>";
    para.innerHTML += '<span class="price">' + price + "</span>";

    // The last piece of HTML makes an empty div with a
    // special clear setting that undoes the left and right
    // floating on the previous line
    //
    // This is required to position the next line properly
    para.innerHTML += '<div class="clear"></div>';

    // Append the new <p> node to the list of appetizers
    section.appendChild(para);
  }
}

function generateAppetizers() {
  for (let i = 0; i < 3; i++) {
    // Generate a random item and price
    let result = generateAppetizer();
    let price = Math.floor(Math.random() * (MAX_APP_PRICE - 1)) + 1;

    // Insert the new item into the appetizers div
    //
    // Basic strategy: use DOM functions to make a new
    // node representing the new menu item, then add it
    // into the existing DOM at the correct position

    // Get a reference to the appetizers div
    let section = document.getElementById("appetizers");

    // Create a new <p> node
    let para = document.createElement("p");

    // Set the internal contents of the new <p> node
    // to hold the randomized menu item
    //
    // The name and price go in <span> tags with classes that
    // will style them to be aligned left and right respectively
    para.innerHTML = '<span class="name">' + result + "</span>";
    para.innerHTML += '<span class="price">' + price + "</span>";

    // The last piece of HTML makes an empty div with a
    // special clear setting that undoes the left and right
    // floating on the previous line
    //
    // This is required to position the next line properly
    para.innerHTML += '<div class="clear"></div>';

    // Append the new <p> node to the list of appetizers
    section.appendChild(para);
  }
}

function main() {
  generateAppetizers();
  generateMainCourses();
  generateDesserts();
}

// The onload property sets a function that will run once
// the page has finished loading
document.onload = main();
