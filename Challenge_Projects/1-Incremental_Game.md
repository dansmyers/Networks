# Challenge Project: Incremental Game

## Due October 31

<img src="https://www.decisionproblem.com/paperclips/title.png" width="33%"/>

*You are an AI tasked with manufacturing as many paperclips as possible. It turns out that the Universe can be made into **a lot** of paperclips.*

## Overview

An incremental game &ndash; also called a clicker game or an idle game &ndash; is a game where the main mechanic is clicking to make numbers go up. Click on a button,
get a thing. Keep clicking, get more things. Spend some of your things to get upgrades that let you get things even faster. The "things" can be whatever fits the theme of the  game: [*Cookie Clicker*](https://orteil.dashnet.org/cookieclicker/) is probably the [trope codifier](https://tvtropes.org/pmwiki/pmwiki.php/Main/TropeCodifier), but I think [*Universal Paperclips*](https://www.decisionproblem.com/paperclips/) is the apex of the genre thus far.

**I love these games**. There's something about the narcotizing repetition combined with an underlying level of optimization and wacky theming that I find
irresistable. Or maybe it's just a [Skinner Box](https://en.wikipedia.org/wiki/Operant_conditioning_chamber).

In this project, you're going to use front-end techniques to **build your own clicker game**. I've given you some code, described below, to help you get started, but everything
that you need is a straightforward application of the front-end techniques we've used in Sprints 1 and 2. After doing this project, you should feel very good about using
DOM manipulation techniques in a moderately large front-end web app. This project will also force you to think about how to manage a larger HTML/CSS/JS code base.


## Submission

Use the workspace on Repl.it. When you finish, submit your project using the button in the upper-right corner so that I know it's complete.


## Details

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaNOoReFLBts1n8mJHOEnbxQaipZodpcq41Q&usqp=CAU" width="33%" />

If you aren't familiar with the genre, start by playing Cookie Clicker. I'll see you in 7-10 days.

Okay, welcome back.

Use the code below as a starting point. It shows a basic incremental game (called "Incremental Game") that has a button that makes a number go up, some upgrades you can buy,
and some example achievements that you can unlock by doing things in the game.

You need to do the following:

- Come up with a theme for your game. Why are we clicking? What is this number that we're so concerned about increasing? I encourage to change the style and layout of my page
to work better with your theme.

- Add more upgrades. There should be a series of things the user can buy that all contribute to the goal of making the number go up.

  At least one of your upgrades must be initially hidden using the CSS `display: none` property until the user unlocks a prerequisite upgrade.

  There should be **one final upgrade** that counts as "winning" the game. In a lot of incremental games, purchasing the winning upgrade allows you to "ascend" and restart the game, but with new special perks. You 
don't have to implement ascensions.

- Add more achievements that are appropriate for your theme.

- Finally, add at at least one special element that isn't already part of the example program. There's all kinds of options and you can get ideas by checking out more games.
  
  Many games have more than one resource and introduce dependencies between them: you might start off chopping wood, then unlock the ability to burn wood to smelt iron, but now
you have to balance your wood and iron production to keep the numbers going up. [Kittens Game](https://kittensgame.com/web/) has a time mechanic: the years advance as you play and some activities are easier 
or harder in different seasons. *Universal Paperclips* actually changes the goal and mechanics of the game as you advance through different phases. 
[Clicker Heroes](https://www.clickerheroes.com/) has boss battles.


## Grading

This project is **optional**. If you complete it, you'll raise your grade by **one part of one letter** (e.g., B to B+).

## Getting Started

### Reference

This code was inspired by [dhmstark's tutorial](https://kastark.co.uk/articles/incrementals.html). If you want another perspective on the features that we're using, check
out that article.

### Starter Code

Start by saving the code below to a file named `index.html`.

```
<!doctype html>
<html>
    
    <head>
        
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        
        <style>
            body {
                font-size: 15pt;
                font-family: Helvetica, Arial, sans-serif;
            }
            
            /* Change upgrade blocks when the user mouses over them */
            .upgrade-block:hover {
                color: #0275d8;  /* Bootstrap primary blue */
                cursor: pointer;  /* Make mouse into a finger */
            }
            
            .float-left {
                float: left;
            }
            
            .float-right {
                float: right;
            }
        
            .small-text {
                font-size: .85em;
            }
            
            #achievements {
                height: 250px;
            }
        
        </style>
    </head>
   
    <body>

        <div class="container">
            
            <!-- First row: title and main number -->
            <div class="row mt-5">
                <div class="col-lg-12">
                    <h1 class="float-left">Incremental Game</h1>  
                    
                    <h1 id="number" class="float-right">0</h1>
                    
                    <div class="clear"></div> <!-- Required to reset float positioning -->
                </div>
            </div> <!-- /row -->
            
            
            <!-- Second row: buttons, resources, and upgrades -->
            <div class="row mt-5">
              
                <!-- Button and resource counts -->
                <div class="col-lg-7">
                      
                    <button class="btn btn-dark" id="click" onclick="changeNumber(clickIncrement)">
                        Click to increase the number
                    </button>
                    
                    <div class="mt-5">
                        Finger strength: <span id="num-finger-strength">1</span>
                    </div>

                    <div>
                        Autoclickers: <span id="num-autoclickers">0</span>
                    </div>
                    
                </div>
                
                
                <!-- Upgrades column -->
                <div class="col-lg-5">
                                      
                    <div class="upgrade-block" id="autocoder" onclick="buyAutoclicker()">
                        <span class="float-left">Autoclicker</span>
                        <span class="float-right" id="autoclicker-cost">10</span>
                        
                        <div class="clear"></div> <!-- Required to reset float positioning -->
                        
                        <br/>
                        
                        <span class="small-text">Clicks once per second</span>
                    </div>
                    
                    <div class="upgrade-block mt-3" id="stronger-fingers" onclick="buyStrongerFingers()">
                        <span class="float-left">Stronger fingers</span>
                        <span class="float-right" id="stronger-fingers-cost">100</span>
                        
                        <div class="clear"></div> <!-- Required to reset float positioning -->
                        
                        <br/>
                        
                        <span class="small-text">Double the strength of button clicks</span>
                    </div>
        
                </div>
            </div> <!-- /row -->
            
            
            <!-- Log and achievements -->
            <div class="row mt-5">
                <div class="col-lg-12 overflow-auto small-text" id="achievements">
                    This is your log of achievements. Make your mother proud!
                </div>          
            </div>  <!-- /row -->
            
        </div> <!-- /container -->
        
        
        <!-- JS, Popper.js, and jQuery -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  
        <script>
        
            //*** THE NUMBER: make this go up ***//
            let number = 0;            
        
            //** Resources ***//
        
            // Increase the counter by this much on each button click
            let clickIncrement = 1;
            let strongerFingersCost = 100;
            
            // Automatically increment by this much every second
            let autoclickers = 0;            
            let autoclickerCost = 10;
            
            //*** Achievement object ***//
            achievements = {upAndRunning: false, industrialRevolution: false};
            
            
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
            
            
            //*** Upgrade purchase functions ***//
            //
            // Each of these is triggered by clicking on its relevant
            // name in the Upgrades menu
            
            //*** Buy an autoclicker ***//
            function buyAutoclicker() {
                // Check that the number is big enough to purchase
                if (number < autoclickerCost) {
                    return;
                }
                
                // Reduce the number to pay for the upgrade
                changeNumber(-autoclickerCost);
                
                // Add one more autoclicker
                autoclickers += 1;
                document.getElementById("num-autoclickers").innerHTML = autoclickers;
                
                // Upgrade cost scales nonlinearly
                // There's nothing special about this function choice    
                autoclickerCost = Math.round(2 * Math.pow(autoclickerCost, 1.25));
                document.getElementById("autoclicker-cost").innerHTML = autoclickerCost;
            }
            
            //*** Increase finger strength ***//
            function buyStrongerFingers() {
                if (number < strongerFingersCost) {
                    return;
                }
                
                changeNumber(-strongerFingersCost);
                
                clickIncrement *= 2;
                document.getElementById("num-finger-strength").innerHTML = clickIncrement;
                
                strongerFingersCost = Math.round(2 * Math.pow(strongerFingersCost, 1.1));
                document.getElementById("stronger-fingers-cost").innerHTML = strongerFingersCost;
            }
            
            //*** Check achievements ***//
            //
            // Runs every cycle and posts any new achievements to the log
            function checkAchievements() {
                if (number >= 1 && !achievements.upAndRunning) {
                    achievements.upAndRunning = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Up and running</b>: Click one time";
                }
                
                if (autoclickers >= 1 && !achievements.industrialRevolution) {
                    achievements.industrialRevolution = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Industrial revolution</b>: Buy an autoclicker";
                }
            }
            
            
            //*** Main loop ***//
            //
            // Function runs every 1000 ms
            
            window.setInterval(function() {
                changeNumber(autoclickers);
                checkAchievements();
            }, 1000);
            
        </script>
  
    </body>
    
</html>
```

### The Button and the Number

Let's start by examining the two most important elements: the button and the number. The basic interaction is simple: clicking on a button triggers a JS function that
increases the number and updates its field on the page.

The first row of the Bootstrap HTML contains the game title and an `<h1>` field that holds the number. Both elements use the `float-left` and `float-right` trick from the
Restaurant Menu Generator project to position the title at the far left of the row and the number at the far right.

The button is defined in the second row. It uses the Bootstrap `btn` and `btn-dark` classes, which are required to get the default Bootstrap button styling. On a click,
it runs the `changeNumber` function, which is defined in the script at the bottom of the page.

```
function changeNumber(amount) {
    number += amount;

    // Update the number field    
    document.getElementById("number").innerHTML = number;
}
```

`changeNumber` is called **every time** we need to modify the number by any amount. It does what you'd expect: it updates the number and then writes the new value to the
page element using `document.getElementById()`. 

The `clickIncrement` variable controls how much to update the number on each press. Upgrades can modify its value.

### Upgrades

The right column of the second row holds a list of upgrades.

There are a few different elements at play here:

- The name and pricing of the upgrades also use the `float-left` and `float-right` trick.

- The entire upgrade block has a `:hover` property set in CSS. This property activates a set of changes when the user hovers the cursor over the element. In this case, the
upgrade block turns blue and changes the mouse into a finger pointer, like you'd use for a link.

- Clicking on an upgrade block activates a JS function that purchases the upgrade.

There are two upgrades, one to buy an autoclicker and the other to strengthen the user's finger. Both use similar functions:

```
//*** Buy an autoclicker ***//
function buyAutoclicker() {
    // Check that the number is big enough to purchase
    if (number < autoclickerCost) {
        return;
    }

    // Reduce the number to pay for the upgrade
    changeNumber(-autoclickerCost);

    // Add one more autoclicker
    autoclickers += 1;
    document.getElementById("num-autoclickers").innerHTML = autoclickers;

    // Upgrade cost scales nonlinearly
    // There's nothing special about this function choice    
    autoclickerCost = Math.round(2 * Math.pow(autoclickerCost, 1.25));
    document.getElementById("autoclicker-cost").innerHTML = autoclickerCost;
}
```

The function is again straightforward: it reduces your number by the purchase price, adds one autoclicker, and updates the relevant fields. The upgrade cost increases
according to a nonlinear function, so each subsequent autoclicker becomes harder to purchase. There's nothing special about my choice, so you may want to play with
the cost function.

**Notice**: both `buy` functions are similar. Maybe you want to think about refactoring to remove some of this redundancy? Could be a good idea.

### The Main Game Loop

The bottom of the JS script contains this function:

```
//*** Main loop ***//
//
// Function runs every 1000 ms

window.setInterval(function() {
    changeNumber(autoclickers);
    checkAchievements();
}, 1000);
```

`window.setInterval` is part of the built-in browser API. It sets a function to run repeatedly according to a timer. In this case, the provided function runs every 1000 ms
and drives all of the automatic interactions in the game.

On every iteration, the main function autoincrements the number (based on the player's autoclickers), then checks for new achievements.

If you want to add any features that run automatically or in the background, put them inside the main loop. It's possible to have multiple `setInterval` functions that run
on different cycles, but you can't guaranteed that they'll all remain in synch or have precise timing.

### Achievements

The third row of the HTML is a log for achievements or other messages to the player. It uses the `overfill-auto` class to automatically add a vertical scroll bar if the
content goes beyond the specified row height.

The `checkAchievements` function just uses a series of statements to test for conditions and a set of booleans that keep track of whether a given objective has
already been met or not:

```
function checkAchievements() {
    if (number >= 1 && !achievements.upAndRunning) {
        achievements.upAndRunning = true;

        document.getElementById("achievements").innerHTML +=
            "<br/> <b>Up and running</b>: Click one time";
    }

    if (autoclickers >= 1 && !achievements.industrialRevolution) {
        achievements.industrialRevolution = true;

        document.getElementById("achievements").innerHTML +=
            "<br/> <b>Industrial revolution</b>: Buy an autoclicker";
    }
}
```

The function prints an appropriate message to the log field when each objective is met for the first time.

### Tips

- **Keep your developer console open**. You need to be able to see error messages right away.

- For debugging, you can type in the console and set the value of a variable. For example, `number = 10000` will instantly set the number to 10,000.

- Right now, the `number` variable is a regular `let` declaration. If you want to get truly huge numbers, you will need the special [`BigInt` class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), which can represent an arbitrary number of digits. You may also want
to upgrade number printing to [add commas](https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript).

- This program is not that complicated, but it does have more variables and interactions that our previous programs. Think carefully about how to keep your code
organized as you add new features.

- I've placed everything in one file, but that may be unwieldy as the program grows. Consider breaking out separate `script.js` and `style.css` files and linking them into
`index.html` as a way to keep your code organized.

- Again, there is a fair amount of duplication, because many of the functions do similar things. It's generally a good idea to avoid writing copies of nearly identical code, so
think about how you might refactor some of the similar operations into shared functions.

- Names are tricky. Keep your variable names, classes, and element ids logical and organized or you'll get overwhelmed.

- There are some cool CSS effects that you can try. For example, you could gray out upgrades that are too expensive.

- Have fun!
