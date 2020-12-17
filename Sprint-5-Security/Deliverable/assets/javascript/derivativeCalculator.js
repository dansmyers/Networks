function parser()
{
	let check = document.getElementById("derivative")
					
	// check for a change in the input box
	// if a change was detected then check for valid expression
	
	check.addEventListener("change", function(){
		// add valid expression logic here
		let input = derivative.value;
		console.log(input + " before parsing");
		input = input.replace(/\s/g, '');
		console.log(input);
		let specialCharacter = false;
		let previousCharacter = "";
		for(let i = 0; i < input.length; i++)
		{
			if(isNaN(input[i]))
			{
				if(specialCharacter)
				{
					if(previousCharacter === "c")
					{
						if(input[i] === "o" && i !== input.length - 1)
						{
							previousCharacter = "o";
							continue;
						}
						else
						{
							alert("Enter Valid Expression \n Did you mean to type cos?");
							break;
						}
					}
					else if(previousCharacter === "o")
					{
						if(input[i] === "s" && i !== input.length - 1)
						{
							previousCharacter = "s";
							continue;
						}
						else
						{
							alert("Enter Valid Expression \n Did you mean to type cos?");
							break;
						}
					}
					else if(previousCharacter === "s")
					{
						if(input[i] === "(" && i !== input.length - 1)
						{
							previousCharacter = "";
							specialCharacter = false;
							continue;
						}
						else
						{
							alert("Enter Valid Expression \n Did you mean to type cos?");
							break;
						}
					}
				}
				else
				{
					switch(input[i])
					{
						case "+":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "-":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "*":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "/":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "^":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "l":
							i += 1;
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "c":
							specialCharacter = true;
							previousCharacter = "c";
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "s":
							if(checkEnd(input.length, i))
							{
								break;
							}
							continue;
						case "(":
							continue;
						case ")":
							continue;
						case "x":
							continue;
						default:
							alert(input[i] + " is not a valid symbol");
					}
				}
			}
		}
	});
}



//parser();


























































































