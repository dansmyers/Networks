//*** THE NUMBER: make this go up ***//
let number = 0;


//** Resources ***//

// Increase the counter by this much on each button click
let clickIncrement = 1;
let strongerPetsCost = 100;

// Automatically increment by this much every second
let autopetters = 0;
let autopetterCost = 10;

// Automatically increment by this much every second
let catnip = 0;
let catnipCost= 500;

// Increase the counter by this much on each button click
let laserPointerIncrement = 0;
let laserPointerCost = 1000;

// Increase the counter by this much on each button click

let adoptionCost = 5000;
//*** Achievement object ***//
achievements = {
  catLover: false,
  firstAutoPetter: false,
  catnipUnlock: false,
  catnipCrazy: false,
  laserUnlock: false,
  adoptable: false,
  superPetter: false,
  laserVision: false,
  toughLove: false
};


//*** Change function ***//
//
// Called by any action that changes the number
//
// amount: the amount to increment or decrement
function changeNumber(amount) {
  number += amount;

  // Update the number field
  document.getElementById("number").innerHTML = number;
}


//*** Store functions ***//

//*** Buy an autopetter ***//
function buyAutopetter() {
  // Check that the number is big enough to purchase
  if (number < autopetterCost) {
    return;
  }

  // Reduce the number to pay for the upgrade
  changeNumber(-autopetterCost);
  autopetters += 1; // Add one more autopetter
  document.getElementById("num-autopetters").innerHTML = autopetters;

  // Upgrade cost scales
  autopetterCost+= 10;
  document.getElementById("autopetter-cost").innerHTML = autopetterCost;
}

//*** Increase pet strength ***//
function buyStrongerPets() {
  if (number < strongerPetsCost) {
    return;
  }

  changeNumber(-strongerPetsCost);

  clickIncrement *= 2;
  document.getElementById("num-pet-strength").innerHTML = clickIncrement;

  if(clickIncrement<7){
    strongerPetsCost+=100;
  } else {
    strongerPetsCost *=2;
  }

    document.getElementById("stronger-pets-cost").innerHTML = strongerPetsCost;
}

//*** Buy catnip ***//
function buyCatnip() {
  // Check that the number is big enough to purchase
  if (number < catnipCost) {
    return;
  }

  // Reduce the number to pay for the upgrade
  changeNumber(-catnipCost);
  catnip += 1; // Add one more autopetter
  document.getElementById("num-catnip").innerHTML = catnip;

  // Upgrade cost scales
  if(catnip<3){
    catnipCost+=100;
  } else {
    catnipCost *=2;
  }

  document.getElementById("catnip-cost").innerHTML = catnipCost;
}

//*** Buy an laser pointer ***//
function buyLaserPointer() {
  // Check that the number is big enough to purchase
  if (number < laserPointerCost) {
    return;
  }

  // Reduce the number to pay for the upgrade
  changeNumber(-laserPointerCost);
  laserPointerIncrement += 10;
  document.getElementById("num-laser-pointers").innerHTML = laserPointerIncrement;

  // Upgrade cost scales
  laserPointerCost+= 500;
  document.getElementById("laser-pointer-cost").innerHTML = laserPointerCost;

  document.getElementById("laser-pointer-strength").innerHTML = laserPointerIncrement+10;
}

//*** Buy an laser pointer ***//
function adoptCat() {
  // Check that the number is big enough to purchase

  if (number < adoptionCost) {
    return;
  }
  endGame = true;
  number = 0;
  autopetters=0;
  catnip=0;

  document.getElementById("container").classList.add("hidden");
  document.getElementById("laser-pointer").style.visibility = "hidden";
  document.getElementById("laser-pointer-counter").style.visibility = "hidden";
  document.getElementById("laser-img").style.visibility = "hidden";
  document.getElementById("catnip").style.visibility = "hidden";
  document.getElementById("catnip-counter").style.visibility = "hidden";
  document.getElementById("adopt").style.visibility = "hidden";
  document.getElementById("achievement-box").classList.add("end-screen");

  document.getElementById("achievement-text").innerHTML = "Congrats on your new cat! Here are your achievements:";
  document.getElementById("achievement-text").classList.add("end-screen-text");
  document.body.classList.add("bg");
}

//*** Check achievements ***//
// Runs every cycle and posts any new achievements to the log
function checkAchievements() {
  if (number >= 1 && !achievements.catLover) {
    achievements.catLover = true;
    document.getElementById("intro-msg").style.visibility = "hidden";
    document.getElementById("achievements").innerHTML +=
      "<b>Cat Lover</b>: Pet one time";
  }

  if (autopetters >= 1 && !achievements.firstAutoPetter) {
    achievements.firstAutoPetter = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Robot Love</b>: Buy an autopetter";
  }

  if (autopetters >= 3) {
    document.getElementById("catnip").style.visibility = "visible";
    document.getElementById("catnip-counter").style.visibility = "visible";
  }

  if (autopetters >= 10 && !achievements.superPetter) {
    achievements.superPetter = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Super Petter</b>: Buy more than 10 autopetters";
  }

  if (clickIncrement >= 2 && !achievements.toughLove) {
    achievements.toughLove = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Tough Love </b>: Buy stronger pets for the first time";
  }


  if (catnip >= 1  && !achievements.catnipUnlock) {
    achievements.catnipUnlock = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Playful Pal</b>: Buy first catnip";
  }

  if (catnip >= 3 && !achievements.catnipCrazy) {
    achievements.catnipCrazy = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Catnip Crazy</b>: Buy catnip 3 times";
  }

  if (number >= 1000 && achievements.catnipUnlock) {

    document.getElementById("laser-pointer").style.visibility = "visible";
    document.getElementById("laser-pointer-counter").style.visibility = "visible";
    document.getElementById("laser-img").style.visibility = "visible";
  }

  if(laserPointerIncrement>0 && !achievements.laserUnlock){
      achievements.laserUnlock = true;
      document.getElementById("achievements").innerHTML +=
        "<br/> <b> Laser Unlocked</b>: Buy first laser pointer";
  }

  if (laserPointerIncrement >= 30 && !achievements.laserVision) {
    achievements.laserVision = true;
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Laser Vision </b>: Buy 3 or more laser pointers";
  }

  if (number >= 2000 && achievements.laserUnlock && !achievements.adoptable) {

    achievements.adoptable=true;
    document.getElementById("adopt").style.visibility = "visible";
    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Adoptable</b>: Produce enough purrs to unlock adopting a furry friend";
  }

}


//*** Main loop ***//
// Function runs every 1000 ms
window.setInterval(function() {
  changeNumber(autopetters);
  changeNumber(catnip*5);
  checkAchievements();
}, 1000);
