"use strict";

function main()
{
	let input = document.getElementById("input");
	let button = document.getElementById("button");
	let output = document.getElementById("outputText");
	
	
	if(button.addEventListener("click", function(){
		if(checkForNumber(input))
		{
			let x = prompt("Please enter a number of feet to be converted to smoots.", 1);
			input.value = x;
		}
		
		let smoots = calculateSmoots(input.value);
		
		output.innerHTML = input.value + " feet is equal to " + smoots + " smoots plus or minus one ear.";
	}));
	
}

function checkForNumber(userInput)
{
	if(isNaN(userInput.value))
	{
		return true;
	}
	
	return false;
}

function calculateSmoots(feet)
{
	return feet / 5.58333;
}

main();