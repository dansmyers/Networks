/* script file for gadfly clicker game */

    //*** THE NUMBER: make this go up ***//
    let number = 0;            
        
    //** resources ***//
        
    // increase the counter by this much on each button click
    let clickIncrement = 1;
    let megaphoneCost = 100;
            
    // automatically increment by this much every second
    let followers = 0;            
    let followerCost = 10;
    
    // the cost of lowering the clicks needed for new followers
    let discountCost = 300;
            
    //*** Achievement object ***//
    achievements = {whatIsAchievement: false, swarm: false, aporia: false};
            
            
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
            
    //*** get a follower ***//
    function getFollower() {
        // Check that the number is big enough to purchase
        if (number < followerCost) {
            return;
        }
        
        // Reduce the number to pay for the upgrade
        changeNumber(-followerCost);
                
        // Add one more follower
        followers += 1;
        document.getElementById("num-followers").innerHTML = followers;
            
        // Upgrade cost scales nonlinearly
        // There's nothing special about this function choice    
        followerCost = Math.round(2 * Math.pow(followerCost, 1.25));
        document.getElementById("follower-cost").innerHTML = followerCost;
    }

    //*** increase megaphone/number of athenians in range ***//
    function buyMegaphone() {
        if (number < megaphoneCost) {
            return;
        }
        
        changeNumber(-megaphoneCost);
        
        clickIncrement *= 2;
        
        document.getElementById("num-megaphone").innerHTML = clickIncrement;
        
        megaphoneCost = Math.round(2 * Math.pow(megaphoneCost, 1.1));
        
        document.getElementById("megaphone-cost").innerHTML = megaphoneCost;
    }
    
    function lowerCost() {
        if (number < discountCost) {
            return;
        }
        
        changeNumber(-discountCost);
        
        followerCost /= 2;
        
        document.getElementById("follower-cost").innerHTML = followerCost;
    }

    //*** check achievements ***//
    // runs every cycle and posts any new achievements to the log
            function checkAchievements() {
                
                // what is an achievement: ask your first question.
                if (number >= 1 && !achievements.whatIsAchievement) {
                    achievements.whatIsAchievement = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>★ What is an Achievement:</b> Ask your first question.";
                }
                
                // form a swarm: gain your first follower.
                if (followers >= 1 && !achievements.swarm) {
                    achievements.swarm = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>★ Form a Swarm:</b> Get a new follower.";
                }
                
                // aporia: ask 100 questions (confuse 100 athenians)
                if (number >= 100 && !achievements.aporia) {
                    achievements.aporia = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>★ Aporia:</b> Ask 100 questions.";
                    
                }
                
                
            }
            
            
            //*** Main loop ***//
            //
            // Function runs every 1000 ms
            
            window.setInterval(function() {
                changeNumber(followers);
                checkAchievements();
            }, 1000);
