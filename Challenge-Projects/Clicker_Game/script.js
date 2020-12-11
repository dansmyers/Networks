//*** THE NUMBER: make this go up ***//
            let number = 0;            
        
            //** Resources ***//
        
            // Increase the counter by this much on each button click
            let popIncrement = 1;
            let greaterPoppabilityCost = 50;
            
            // Automatically increment by this much every second
            let totalPoppers = 0;            
            
            /* format of each entry:
            
                [number,cost, html number name, html cost name, increment]
            
            */
            // greaterPoppability has its own function
            let upgradeInfo = [
                [0,10,"num-autopoppers","autopopper-cost",1], // poppers
                [0,100,"num-thumbTackCannons","thumbTackCannon-cost",5], // tack
                [0,500,"num-kindergartenClass","kindergartenClass-cost",10], // kindergarteners
                [0,2500,"num-porcupines","porcupines-cost",25], // porcupines-cost
                [0,10000,"num-seaUrchin","seaUrchin-cost",100], // sea urchins
                [0,100000,"num-knifeFactory","knifeFactory-cost",1000] // knife factory
                ];
            
            //*** Achievement object ***//
            achievements = {upAndRunning: false, industrialRevolution: false, classInSession:false, secondIndustrialRevolution: false, animalAbuse: false, childAbuse: false};
            
            
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
            
            //*** Buy an upgrade ***//
            function buyUpgrade(entry){
                // Check that the number is big enough to purchase
                if (number < upgradeInfo[entry][1]) {
                    return;
                }
                
                // Reduce the number to pay for the upgrade
                changeNumber(-upgradeInfo[entry][1]);
                
                // Add one more autopopper
                totalPoppers += upgradeInfo[entry][4];
                // Add one more of this upgrade
                upgradeInfo[entry][0] += 1;
                
                document.getElementById(upgradeInfo[entry][2]).innerHTML = upgradeInfo[entry][0];
                
                document.getElementById("total-poppers").innerHTML = totalPoppers;
                
                // Upgrade cost scales nonlinearly
                // There's nothing special about this function choice    
                upgradeInfo[entry][1] = Math.round(2 * Math.pow(upgradeInfo[entry][1], 1.1));
                document.getElementById(upgradeInfo[entry][3]).innerHTML = upgradeInfo[entry][1];
            }
            
            //*** Increase finger strength ***//
            function buyGreaterPoppability() {
                if (number < greaterPoppabilityCost) {
                    return;
                }
                
                changeNumber(-greaterPoppabilityCost);
                
                popIncrement *= 2;
                document.getElementById("num-finger-poppability").innerHTML = popIncrement;
                
                greaterPoppabilityCost = Math.round(2 * Math.pow(greaterPoppabilityCost, 1.1));
                document.getElementById("greater-poppability-cost").innerHTML = greaterPoppabilityCost;
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
                
                if (upgradeInfo[0][0] >= 1 && !achievements.industrialRevolution) {
                    achievements.industrialRevolution = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Industrial revolution</b>: Buy an autoclicker";
                }
                
                if (upgradeInfo[2][0] >= 1 && !achievements.classInSession) {
                    achievements.classInSession = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Class is in session</b>: Buy a kindergarten class";
                }
                
                if (upgradeInfo[5][0] >= 1 && !achievements.secondIndustrialRevolution) {
                    achievements.secondIndustrialRevolution = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Second industrial revolution</b>: Buy a knife factory";
                }
                
                if (upgradeInfo[3][0] >= 1 && upgradeInfo[4][0] >= 1 && !achievements.animalAbuse) {
                    achievements.animalAbuse = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Animal abuse</b>: Buy a prickle of porcupines and a sea urchin aquarium";
                }
                
                if (upgradeInfo[3][0] >= 10 && !achievements.childAbuse) {
                    achievements.childAbuse = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Child labor</b>: Buy 10 kindergarten classes (is this even legal?)";
                }
            }
            
            
            //*** Main loop ***//
            //
            // Function runs every 1000 ms
            
            window.setInterval(function() {
                changeNumber(totalPoppers);
                checkAchievements();
            }, 1000);
            