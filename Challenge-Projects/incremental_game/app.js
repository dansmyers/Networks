//This area contains all of the variables for game elements.
//They are all stored up here in an attempt to make balancing adjustments easier.

//The first two elements of every array are zero. Level 1's variables are in index 2 of the array
//level 2 is in index 3 and so on. This is to make it easier to match up variables with their column
//id in the grid.


//Bottle clickers:
const BOTTLE_CLICKER_VALUES = [0, 0, 1, 24, 100, 500, 500000, 50000000, 50000000000000000, 275000000000000000000];

const BOTTLE_AUTO_PRICES = [0 , 0 , 200, 3000, 20000, 70000];

const BOTTLE_AUTO_RATE = [0, 0, 3, 12, 45, 1000, 250000, 25000000, 250000000000000000, 137500000000000000000];


//Water clickers

const WATER_CLICKER_VALUES = [0, 0, 1, 10, 300, 700, 500000, 50000000, 50000000000000000, 27500000000000000000];

const WATER_AUTO_PRICES = [0, 0, 200, 3000, 50000, 80000];

const WATER_AUTO_RATE = [0, 0, 2, 24, 200, 3000, 250000, 25000000, 250000000000000000, 13750000000000000000];



const MONEY_CLICKER_VALUES = [0, 0, 1, 12, 167, 1000, 500000, 50000000, 50000000000000000, 2750000000000000000];

const MONEY_AUTO_PRICES = [0, 0, 200, 5000, 35000, 50000];

const MONEY_AUTO_RATE = [0, 0, 1, 12, 50, 4000, 250000, 25000000, 250000000000000000, 1375000000000000000];

const UPGRADE_PRICES = [0, 0, 5000, 75000, 200000 , 0, 0 , 0 , 0, 0]; 

let bottle_auto_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let water_auto_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let money_auto_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


let achivementsA = [true, true,true,true,true,true,true,true,true];


//This section contains the diologues that appear at the beginning of each level
let diologues = ["0", "0", 
//Level 1
"Welcome to Water Bottle Company Sim 2020! You're probably ready get to it to start managing your water bottle company. There's one small problem, you don't have a water bottle company. You have no money or resources at all, but you do have a water tap, you know how to make bottles, and you know how sell a water bottle for a good price. You may think it is unethical to bottle public tap water and sell it as commercial spring water. You may even say that it's fraud. Listen rookie, no sucessful buisnessman ever made it to the top without breaking a few rules. Just get through this rough period and you will be a legitamate buisnessman in no time.If you need help, you can hire friends to help you out. ",

//Level 2 
"Congratulations! You have now built your own water well. You can now bottle and sell water at a faster rate and you can create bottles in bulk. Additionally, now you can now hire professional employees who can work at a faster rate, and your salesmen can traval longer distances to sell more bottles.",

//Level 3
"You have now purchased access to a water spring! You can now scale up your operation significantly. You can fill up bottles with water at a very fast rate. Unfortunately, your bottlemaking technology is not scaling up at the same rate as your bottle filling technology, so be smart about how you prioritze your purchases. You can also hire a national salesman who can sell to a larger base of people, but they are quite expensive.",

""

];





let empty_bottles = 0;
let filled_bottles = 0;
let money = 0;
let bottle_price = 3;


//Far right column Stats:
let total_bottles = 0;
let bottle_rate = 0;
let total_water = 0;
let water_rate = 0;
let total_money = 0;
let money_rate = 0;

let achivements = "";





function init(){
	
	updateDisplay();
	
	//Initially we want to hide all but the first level
	hideLevels(3, 9);
	
	document.getElementById("message").innerHTML = diologues[2];
	
}

function checkAchivements(){
	
	
	if(total_bottles > 10000 && achivementsA[0] === true){
		achivements = achivements + " : 10000 Bottles Created";
		achivementsA[0] = false;
	}
	
	if(total_bottles > 100000 && achivementsA[1] === true){
		achivements = achivements + " : 100000 Bottles Created";
		achivementsA[1] = false;
	}
	
	if(total_bottles > 1000000 && achivementsA[2] === true){
		achivements = achivements + " : 10000 Bottles Created";
		achivementsA[2] = false;
	}
	
	if(total_water > 10000 && achivementsA[3] === true){
		achivements = achivements + " : 10000 Gallons of Water Filled";
		achivementsA[3]= false;
	}
	
	if(total_water > 100000 && achivementsA[4] === true){
		achivements = achivements + " : 100000 Gallons of Water Filled";
		achivementsA[4]= false;
	}
	
	if(total_water > 1000000 && achivementsA[4] === true){
		achivements = achivements + " : 1000000 Gallons of Water Filled";
		achivementsA[5]= false;
	}
	
	if(total_money > 100000 && achivementsA[6] === true){
		achivements = achivements + " : $100000 Made";
		achivementsA[6]= false;
	}
	
	if(total_money > 1000000 && achivementsA[7] === true){
		achivements = achivements + " : Millionare";
		achivementsA[7]= false;
	}
	
	if(total_money > 1000000000 && achivementsA[8] === true){
		achivements = achivements + " : Billionare";
		achivementsA[8]= false;
	}
	
	document.getElementById("achivements").innerHTML = achivements;
}

function updateDisplay(){
	document.getElementById("empty_bottles").innerHTML = empty_bottles;
	document.getElementById("filled_bottles").innerHTML = filled_bottles;
	document.getElementById("money").innerHTML = "$" + money;
	
	document.getElementById("empty_bottles2").innerHTML = empty_bottles;
	document.getElementById("filled_bottles2").innerHTML = filled_bottles;
	document.getElementById("money2").innerHTML = "$" + money;
	
	document.getElementById("r2c10_text").innerHTML = total_bottles;
	document.getElementById("r3c10_text").innerHTML = bottle_rate + " Bottles/Sec";
	document.getElementById("r4c10_text").innerHTML = total_water * .125 +  " Gallons";
	document.getElementById("r5c10_text").innerHTML = water_rate  + " Bottles/Sec";
	document.getElementById("r6c10_text").innerHTML = "$" + total_money;
	document.getElementById("r7c10_text").innerHTML = "$" + money_rate*3  + " /Sec";
	
	checkAchivements();
	
}

//This function will hide all levels within a given bounds.
function hideLevels(lower, upper){
	for( let i = lower; i <= upper; i++){
		for(let j = 2; j < 8; j++){
			document.getElementById("r"+j+"c"+i+"_text").style.visibility = "hidden";
			document.getElementById("r"+j+"c"+i+"_button").style.visibility = "hidden";
			if(j%2 !== 0){
				document.getElementById("r"+j+"c"+i+"_text2").style.visibility = "hidden";
				document.getElementById("r"+j+"c"+i+"_text3").style.visibility = "hidden";
			}
			
		}
	document.getElementById("r"+1+"c"+i+"_text").style.visibility = "hidden";
	}
}

function unlockLevel(level){
	
	let i = level + 1;
	
	if(money >= UPGRADE_PRICES[level]){
		for(let j = 2; j < 8; j++){
			document.getElementById("r"+j+"c"+i+"_text").style.visibility = "visible";
			document.getElementById("r"+j+"c"+i+"_button").style.visibility = "visible";
			if(j%2 !== 0){
				document.getElementById("r"+j+"c"+i+"_text2").style.visibility = "visible";
				document.getElementById("r"+j+"c"+i+"_text3").style.visibility = "visible";
				} 
			}
		document.getElementById("r"+1+"c"+i+"_text").style.visibility = "visible";
		money = money - UPGRADE_PRICES[level];
		document.getElementById("level"+level+"_unlock").style.visibility = "hidden";
		document.getElementById("message").innerHTML = diologues[i];
		}else{
		alert("You don't have enough money to buy that!");
		}
	
}





//This function will parse the id of the button that activated them in order to know what is being done

function act(ele){
	let id = ele.id;
	let row = id.charAt(1);
	let col = id.charAt(3);
	
	if(row == 2){
		
		empty_bottles = empty_bottles + BOTTLE_CLICKER_VALUES[col];
		total_bottles = total_bottles + BOTTLE_CLICKER_VALUES[col];
		
		updateDisplay();
	}
	
	if(row == 3){
		if(BOTTLE_AUTO_PRICES[col] <= money){
			bottle_auto_number[col] += 1;
			money = money - BOTTLE_AUTO_PRICES[col];
			bottle_rate = bottle_rate + BOTTLE_AUTO_RATE[col];
		
			document.getElementById("r"+row+"c"+col+"_text3").innerHTML = bottle_auto_number[col];
		} else {
			alert("You don't have enough money to buy that!");
		}
		updateDisplay();
	}
	
	if(row == 4){
		
		if(WATER_CLICKER_VALUES[col] <= empty_bottles){
			empty_bottles = empty_bottles - WATER_CLICKER_VALUES[col];
			filled_bottles = filled_bottles + WATER_CLICKER_VALUES[col];
			total_water = total_water + WATER_CLICKER_VALUES[col];
		} else {
			filled_bottles = filled_bottles + empty_bottles;
			total_water = total_water + empty_bottles;
			empty_bottles = 0;
			
		}
		updateDisplay();
		
	}
	
	if(row == 5){
		if(WATER_AUTO_PRICES[col] <= money){
			water_auto_number[col] += 1;
			money = money - WATER_AUTO_PRICES[col];
			water_rate = water_rate + WATER_AUTO_RATE[col];
			document.getElementById("r"+row+"c"+col+"_text3").innerHTML = water_auto_number[col];
		} else {
			alert("You don't have enough money to buy that!");
		}
		updateDisplay();
	}
	
	if(row == 6){
		if(MONEY_CLICKER_VALUES[col] <= filled_bottles){
			filled_bottles = filled_bottles - MONEY_CLICKER_VALUES[col];
			money = money + MONEY_CLICKER_VALUES[col]*bottle_price; 
			total_money = total_money + MONEY_CLICKER_VALUES[col]*bottle_price;
		} else {
			money = filled_bottles*bottle_price + money;
			total_money = filled_bottles*bottle_price + total_money;
			filled_bottles = 0;
		}
		updateDisplay();
		
	}
	
	if(row == 7){
		if(MONEY_AUTO_PRICES[col] <= money){
		money_auto_number[col] += 1;
		money = money - MONEY_AUTO_PRICES[col];
		money_rate = money_rate + MONEY_AUTO_RATE[col];
		
		document.getElementById("r"+row+"c"+col+"_text3").innerHTML = money_auto_number[col];
	} else {
			alert("You don't have enough money to buy that!");
		}
		updateDisplay();
	
	}
	
	updateDisplay();
}


function updateNumbers(){
	for(let i = 0; i < 11; i++){
		
		//Bottles
		if(bottle_auto_number[i] > 0){
			empty_bottles = empty_bottles + BOTTLE_AUTO_RATE[i]*bottle_auto_number[i];
			total_bottles = total_bottles + BOTTLE_AUTO_RATE[i]*bottle_auto_number[i];
		}
	}
	
	for(let i = 0; i < 11; i++){
		//water
		if(water_auto_number[i] > 0){
			if(WATER_AUTO_RATE[i]* water_auto_number[i] <= empty_bottles){
				empty_bottles = empty_bottles - WATER_AUTO_RATE[i]*water_auto_number[i];
				filled_bottles = filled_bottles + WATER_AUTO_RATE[i]*water_auto_number[i];
				total_water = total_water + WATER_AUTO_RATE[i]*water_auto_number[i];
			} else {
				filled_bottles = filled_bottles + empty_bottles;
				total_water = total_water + empty_bottles;
				empty_bottles = 0;
			}
		}
	}
	
	for(let i = 0; i < 11; i++){
		//money
		if(money_auto_number[i] > 0){
			if(MONEY_AUTO_RATE[i]* money_auto_number[i] <= filled_bottles){
				filled_bottles = filled_bottles - MONEY_AUTO_RATE[i]*money_auto_number[i];
				money = money + MONEY_AUTO_RATE[i]*money_auto_number[i]*bottle_price;
				total_money = total_money + MONEY_AUTO_RATE[i]*money_auto_number[i]*bottle_price;
				
			} else {
				money = money +filled_bottles*bottle_price;
				total_money = total_money + filled_bottles*bottle_price;
				filled_bottles = 0;
			}
		}
	}
	
	updateDisplay();
}
	
//Game loop
window.setInterval(function() {
                updateNumbers();
            }, 1000);