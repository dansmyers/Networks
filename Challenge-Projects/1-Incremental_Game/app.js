 //*** THE NUMBER: make this go up ***//
            let number = 3000000;  //represents monetary/capitol units gained for producing gravel.
            
            let profit = 0;
        
            //** Resources ***//
        
            // Increase the counter by this much on each button click
            let hammerStrength = 1;
            let strongerHammerCost = 100;
            
            // Automatically increment by this much every second
            let workers = 150; 
            let workRate = 1;
            let workerCost = 10;
            
            //Commit workers to factories to increase their productivity by a large factor (initially 8)
            let factories = 5;
            let factoryCost = 10000;
            let workersPerFactory = 25;
            let workerProductivityFactor = 8;
            
            //Build your Corporate HQ
            let costHQ = 1000000;
            let factoriesForHQ = 5;
            let hqStatus = "closed";
            
            //Make Efficiency Upgrades
            let workRateIncrease = 1;
            let costWRUpgrade = 100000;
            let productivityFactorIncrease = 2;
            let costPFUpgrade = 1000000;
            
            //Hire Contractors
            let hiringContractors = 0;
            let costHiringContractor = 2000000;
            let constructionContractors = 0;
            let hiringPerConstruction = 25;
            let costConstructionContractor = 200000000;
            
            //*** Achievement object ***//
            achievements = {upAndRunning: false, managerStatus: false, industrialRevolution: false, bigBusiness: false, industrialPowerHouse: false, industryLeader: false, worldDomination: false};
            
            
            //*** Change function ***//
            //
            // Called by any action that changes the number
            //
            // amount: the amount to increment or decrement
            function changeNumber(amount) {
                if(number >= 1000000000000000){
                    alert("World Domination: Congratulations! You have successfully dominated the gravel market on planet earth to the extent that noone else can compete! Victory is yours!");
                }
                
                number += amount;
                
                // Update the number field    
                document.getElementById("number").innerHTML = number;
                
            }
            
            //Function to Initially Hide HQ Module
            function hideHQ(){
                
                let hqHead = document.getElementById("hqHead");
                hqHead.style.display = "none";
                
                let hq = document.getElementById("hq");
                hq.style.display = "none";
                
            }
            
            //Functionn to Show HQ Module
            function showHQ(){
                
                let hqHead = document.getElementById("hqHead");
                hqHead.style.display = "block";
                
                let hq = document.getElementById("hq");
                hq.style.display = "inline-block";
                
            }
            
            
            //*** Upgrade purchase functions ***//
            //
            // Each of these is triggered by clicking on its relevant
            // name in the Upgrades menu
            
            //*** Increase hammer strength ***//
            function increaseHammerStrength() {
                if (number < strongerHammerCost) {
                    return;
                }
                
                changeNumber(-strongerHammerCost);
                
                hammerStrength *= 2;
                document.getElementById("num-hammer-strength").innerHTML = hammerStrength;
                
                strongerHammerCost = Math.round(2 * Math.pow(strongerHammerCost, 1.1));
                document.getElementById("stronger-hammer-cost").innerHTML = strongerHammerCost;
            }
            
            //*** Hire a Worker ***//
            function hireWorker() {
                // Check that the number is big enough to purchase
                if (number < workerCost) {
                    return;
                }
                
                // Reduce the number to pay for the upgrade
                changeNumber(-workerCost);
                
                // Add one more autoclicker
                workers += 1;
                document.getElementById("num-workers").innerHTML = workers;
                
                // Upgrade cost scales nonlinearly
                // There's nothing special about this function choice    
               if(workerCost < 10){
                    workerCost = 10;
                }
                else if(workerCost < 13000){
                    workerCost = Math.round(workerCost * 1.35);
                }
                else {
                    workerCost = 13960;
                }
                document.getElementById("worker-cost").innerHTML = workerCost;
            }
            
            //Build a Factory
            function buildFactory(){
                
                if(number < factoryCost || workers < workersPerFactory || workers < workersPerFactory * (factories + 1)){
                    return;
                }
                
                changeNumber(-factoryCost);
                
                factories++;
                document.getElementById("num-factories").innerHTML = factories;
                
                if(factories < 5){
                    factoryCost = Math.round(Math.pow(factoryCost, 1.05));
                }
                else{
                    factoryCost = 150000;
                }
                document.getElementById("factory-cost").innerHTML = factoryCost;
                
                for(let i = 0; i < 25; i++){
                    workerCost = Math.round(workerCost/1.35);
                }
                
                document.getElementById("worker-cost").innerHTML = workerCost;
                
            }
            
            //Unlocking HQ
            function unlockHQ(){
                
                if(number < costHQ || factories < factoriesForHQ){
                    return;
                }
                
                changeNumber(-costHQ);
                
                hqStatus = "open";
                document.getElementById("hq-status").innerHTML = "open for business";
                
                document.getElementById("HQ-cost").innerHTML = 0;
                
                showHQ();
            }
            
            function workRateUpgrade(){
                
                //Return if not unlocked or too expensive
                if(number < costWRUpgrade || hqStatus === "closed"){
                    return;
                }
                
                changeNumber(-costWRUpgrade);
                
                workRate += workRateIncrease;
                
                costWRUpgrade *= 2;
                document.getElementById("work-rate-upgrade-cost").innerHTML = costWRUpgrade;
                
            }
            
            function productivityFactorUpgrade(){
                
                //Return if not unlocked or too expensive
                if(number < costPFUpgrade || hqStatus === "closed"){
                    return;
                }
                
                changeNumber(-costPFUpgrade);
                
                workerProductivityFactor += productivityFactorIncrease;
                
                costPFUpgrade *= 2;
                document.getElementById("productivity-factor-upgrade-cost").innerHTML = costPFUpgrade;
                
            }
            
            function addHiringContractor(){
                
                //Return if not unlocked or too expensive
                if(number < costHiringContractor || hqStatus === "closed" || profit < 15000){
                    return;
                }
                
                changeNumber(-costHiringContractor);
                
                hiringContractors++;
                document.getElementById("hiring-contractors").innerHTML = hiringContractors;
                
            }
            
            function addConstructionContractor(){
                
                //Return if not unlocked or too expensive
                //If there are not enough workers or capital to create a new factory yet, this will be caught when the contractor calls the buildFactory() method in the main game loop.
                if(number < costConstructionContractor || hqStatus === "closed" || profit < 200000){
                    return;
                }
                
                changeNumber(-costConstructionContractor);
                
                constructionContractors++;
                document.getElementById("construction-contractors").innerHTML = constructionContractors;
                
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
                
                if (workers >= 1 && !achievements.managerStatus) {
                    achievements.managerStatus = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Manager Status</b>: Start hiring your own workers.";
                }
                
                if(factories >= 1 && !achievements.industrialRevolution){
                   
                    achievements.industrialRevolution = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Industrial Revolution</b>: Open your first factory.";
                        
                }
                
                if(hqStatus === "open" && !achievements.bigBusiness){
                   
                    achievements.bigBusiness = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Big Business</b>: Congratulations, you are now a full blown gravel corporation!";
                        
                }
                
                if(hqStatus === "open" && number >= 1000000000 && !achievements.industrialPowerHouse){
                   
                    achievements.industrialPowerHouse = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Industrial Power House</b>: Congratulations! You are now one leading gravel producers in your area!";
                        
                }
                
                if(hqStatus === "open" && number >= 1000000000000 && !achievements.industryLeader){
                   
                    achievements.industryLeader = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>Industry Leader</b>: Congratulations! You are now one leading gravel producers in the world!";
                        
                }
                
                if(hqStatus === "open" && number >= 1000000000000000 && !achievements.worldDomination){
                   
                    achievements.worldDomination = true;
                    
                    document.getElementById("achievements").innerHTML +=
                        "<br/> <b>World Domination</b>: Congratulations! You have successfully dominated the gravel market on planet earth to the extent that noone else can compete! Victory is yours!";
                        
                }
                
            }
            
            function calcProfit(){
                //factories
                let f = factories * workersPerFactory * workRate * workerProductivityFactor;
                //workers outside of factories
                let w = (workers - (workersPerFactory * factories)) * workRate;
                profit = f + w;
            }
            
            //*** Main loop ***//
            //
            // Function runs every 1000 ms
            hideHQ();
            window.setInterval(function() {
                for(let i = 0; i < hiringContractors; i++){
                    hireWorker();
                }
                for(let i = 0; i < constructionContractors; i++){
                    buildFactory();
                }
                calcProfit();
                changeNumber(profit);
                checkAchievements();
            }, 1000);