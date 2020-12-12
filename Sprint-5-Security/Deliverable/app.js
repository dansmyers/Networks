let lines = new Array(9);
let validPuzzle = false;
let solved = false;
let fPass = true;
let logString = "";


let puzzle = new Array(9);
let pMatrix = new Array(9);

function add1(n){
	return n+1;
}

function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function setToArray(s){
	array = new Array(s.size);
	count = 0;
	
	for(let i = 0; i < 9; i++){
		if(s.has(i)){
			array[count] = i;
			count++;
		}
	}
	return array;
}

function init(){
	
	validPuzzle = false;
	fpass = true;
	
	let temp = document.getElementById("input").value;
	
	//Get each row into it's own string then chop off the newline character
	for(let i = 0; i < 9; i++){
		
		lines[i] = temp.slice(i*10, ((i+1)*10)+1);
		lines[i] = lines[i].slice(0, 10);
		
		puzzle[i] = new Array(9);
		
		//Check validity of the input
		//Make sure each character is a space or a number 1 - 9
		for(let j = 0; j < 9; j++){
			if((Number(lines[i].charAt(j)) > 0 && Number(lines[i].charAt(j) < 10)) || lines[i].charAt(j) == " "){
				
				puzzle[i][j] = lines[i].charAt(j);
				
			} else {
				
				document.getElementById("output").value = "Input declined, check if you have formatted your input correctly.";
				return;
				
			}
		}
		
		validPuzzle = true;
		document.getElementById("output").value = "Input accepted, click next to start solving.";
	}
}


function checkContradictions(){
	//Check for contradictions
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			
			//These check which square the number is in. 0x0 is the right 
			let squareX = Math.floor(j/3)
			let squareY = Math.floor(i/3)
			
			if((puzzle[i][j] == " ") === false){
			
				//Check row
				for(let k = 0; k < 9; k++){
					
					if((j != k) && (puzzle[i][j] === puzzle[i][k])){
						return false;
					}
					
					if((i != k) && (puzzle[i][j] === puzzle[k][j])){
						return false;
					}
					
					//This is for checking the square
					//In code above we found out what square we're in. Given that square, check if anything else in the square contradicts [i][j]
					kX = squareX*3+k%3;
					kY = squareY*3+Math.floor(k/3);
					
					//console.log(j + " " + i + " " + kX + " "+ kY);
					
					if(((i != kY) || (j != kX)) && puzzle[i][j] === puzzle[kY][kX]){
						//console.log("shut down");
						return false;
					}
				}
			
			}
		}
	}
	
	return true;
}


//p matrix stands for probability matrix. It keeps track of what each square could potentially be
function initPMatrix(){
	
	//Each square in the matrix has a set. If a square could possibly be x, then x is in the set. If we have ruled out x for the square, x is not an element of the set.
	for(let i = 0; i < 9; i++){
		pMatrix[i] = new Array(9);
		
		for(let j = 0; j < 9; j++){
			pMatrix[i][j] = new Set();
			
			//If the square hasn't already been defined, then it could be any number 1-9. If
			//the square has been defined, the number it's defined as is the only possible 
			//thing it could be.
			if(puzzle[i][j] == " "){
				for(let k = 1; k < 10; k++){
					pMatrix[i][j].add(k);
				} 
			}else{ 
				pMatrix[i][j].add(parseInt(puzzle[i][j]));
			}
		}
	}
	
}

//Ruling out a block is compicated so it is defined as its own function
//Given the cordinates of a square and a value, it will rule out that number in every square
function ruleOutBlock(i, j, val){
	
	
	squareX = Math.floor((j)/3);
	squareY = Math.floor((i)/3);
	
	
	
	
	for(let k = 0; k < 9; k++){
		numX = squareX*3+k%3;
		numY = squareY*3+Math.floor(k/3);
		
		
		if(numX != j && numY != i && pMatrix[numY][numX].has(val) === true){
			pMatrix[numY][numX].delete(val);
			//console.log(numX + " " + numY + " " + j + " " + i + " " + val);
		}
	}
}

function simpleRuleOut(){
	
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			
			
			//If a square has not been defined, ignore it. If it has, rule out the number for every
			//square related to it by sudoku rules
			if(puzzle[i][j] != " "){
				
				let val = parseInt(puzzle[i][j]);
				
				//This loop ensures that the only value in pMatrix for a defined number is the number
				//it's defined as. This is a fix to a bug encountered in naked tuple
				for(let k = 0; k < 9; k++){
					if(val != k && pMatrix[i][j].has(k)){
						pMatrix[i][j].delete(k);
					}
				}
				
				
				
				for(let k = 0; k < 9; k++){
					
					//Rule out the row
					if((j != k) && (pMatrix[i][k].has(val) === true)){
						pMatrix[i][k].delete(val);
					}
					
					//Rule out the column
					if((i != k) && (pMatrix[k][j].has(val) === true)){
						pMatrix[k][j].delete(val);
					}
					
					//Rule out the square
					ruleOutBlock(i, j, val);
				}
			}
			
		}
	}
	
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			console.log("Space " + add1(j) + ", " + add1(i) + ": " );
			
			for(let k = 1; k < 10; k++){
				if(pMatrix[i][j].has(k)){
					console.log(k);
				}
			}
		}
	}
}

function hiddenSingle(){
	
	
	
	//First check every row
	for(let i = 0; i < 9; i++){
		
		//For each char 1-9 we want to check how many possible spaces it can be in in that row.
		//If the answer is 1 and we're not talking about a number already filled in, we have found
		//a hidden single. We repeat this strategy for cols and blocks
		for(let k = 1; k < 10; k++){
			count = 0;
			pos = 0;
			
			for(let j = 0; j < 9; j++){
				
				if(pMatrix[i][j].has(k) && puzzle[i][j] === " "){
					
					count++;
					pos = j;
				}
			}
			
		if(count === 1){
			puzzle[i][pos] = k.toString();
			return("In row " + add1(i) + " only box " + add1(pos)  + ", " + add1(i) + " can be a " + k + ".");
		}
		}
	}
	//check columns
	for(let j = 0; j < 9; j++){
		
		for(let k = 1; k < 10; k++){
			count = 0;
			pos = 0;
			
			for(let i = 0; i < 9; i++){
				if(pMatrix[i][j].has(k) && puzzle[i][j] === " "){
					count++;
					pos = i;
				}
			}
			
		if(count === 1){
			puzzle[pos][j] = k.toString();
			return("In column " + add1(j) + " only box " + add1(j) + ", " + add1(pos) + " can be a " + k + ".");
		}
		}
	
	}
	
	//check blocks
	//m and n are the coordinates for the blocks
	for(let m = 0; m < 3; m++){
		for(let n = 0; n < 3; n++){
			for(let k = 1; k < 10; k++){
				
				count = 0;
				solX = 0;
				solY = 0;
				
				for(let p = 0; p < 9; p++){
					numX = m*3+p%3;
					numY = n*3+Math.floor(p/3);
					
					if(pMatrix[numY][numX].has(k) && puzzle[numY][numX] === " "){
						count++;
						solX = numX;
						solY = numY;
					}
				}
				if(count === 1){
					puzzle[solY][solX] = k.toString();
					return("In block " + add1(m) + ", " + add1(n) + " only box " + add1(solX) + ", " + add1(solY) + " can be a " + k + ".");
				}
				
			}
		}
	}
	
	
	
	return null;

}

function nakedSingle(){
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			
			if(puzzle[i][j] === " " && pMatrix[i][j].size === 1){
				
				let val = 0;
				for(let k = 1; k < 10; k++){
					if(pMatrix[i][j].has(k)){
						val = k;
					}
				}
				
				puzzle[i][j] = val.toString();
				return("Box " + add1(j) + ", " + add1(i) + " can only be " + val + ".");
			}
		}
	}
	return null;
}

function checkTuple(i, j, or, n, tuple){
	
	
	returnString = "";
	
	let indexes = new Set();
	indexCount = 0;
	
	if(or === "row"){
		
		count = 1;
		for(let k = 0; k < 9; k++){
			
			if(k != j){
				
				if(isSuperset(tuple, pMatrix[i][k])){
					count++;
					indexes.add(k);
					
				}
				
			}
		}
		//If we have found n instances of the tuple, eliminate all instances of elements of the tuple not in index array.
		if(count == n){
			for(let k = 0; k < 9; k++){
				for(let l = 1; l < 10; l++){
					if(tuple.has(l) && pMatrix[i][k].has(l) && (indexes.has(k) != true) && k != j){
						pMatrix[i][k].delete(l);
						returnString = returnString +  "The number " + l + " has been ruled out from box " + add1(k) + ", " + add1(i) + " by a naked set of " + n + " in row " + add1(i) + "\n\n";
					}
				}
			}
			
			if(returnString != ""){
				return returnString;
			} else{
				return "";
			}
		}
	}
	
	if(or === "col"){
		
		count = 1;
		for(let k = 0; k < 9; k++){
			
			if(k != i){
				
				if(isSuperset(tuple, pMatrix[k][j])){
					count++;
					indexes.add(k);
					
				}
				
			}
		}
		//If we have found n instances of the tuple, eliminate all instances of elements of the tuple not in index array.
		if(count == n){
			for(let k = 0; k < 9; k++){
				for(let l = 1; l < 10; l++){
					if(tuple.has(l) && pMatrix[k][j].has(l) && (indexes.has(k) != true) && k != i){
						pMatrix[k][j].delete(l);
						returnString = returnString +  "The number " + l + " has been ruled out from box " + add1(j) + ", " + add1(k) + " by a naked set of " + n + " in column " + add1(j) + "\n\n";
					}
				}
			}
			
			if(returnString != ""){
				return returnString;
			} else{
				return "";
			}
		}
	}
	
	if(or === "block"){
		
		
		count = 1;
		
		
		let blockX = Math.floor(j/3);
		let blockY = Math.floor(i/3);
		
		let kX = 0;
		let kY = 0;
		
		//We need a second set of indexes to keep track of Y because the we are dealing with two 
		//directions
		
		indexesY = new Set();
		
		for(let k = 0; k < 9; k++){
			
			//console.log("in " + j + " " + i + " " + kX + " "+ kY);
			
			
			//The absolute x and y for each square
			kX = blockX*3 + k%3;
			kY = blockY*3 + Math.floor(k/3)
			
			if(kX != j || kY != i){
				
				
				
				if(isSuperset(tuple, pMatrix[kY][kX])){
					
					count++;
					indexes.add(kX);
					indexesY.add(kY);
					
				}
				
			}
		}
		//If we have found n instances of the tuple, eliminate all instances of elements of the tuple not in index array.
		if(count == n){
			for(let k = 0; k < 9; k++){
				
				kX = blockX*3 + k%3;
				kY = blockY*3 + Math.floor(k/3)
				
				for(let l = 1; l < 10; l++){
					if(tuple.has(l) && pMatrix[kY][kX].has(l) && ((indexes.has(kX) != true) || indexesY.has(kY) != true) && (kX != j || kY != i)){
						pMatrix[kY][kX].delete(l);
						returnString = returnString +  "The number " + l + " has been ruled out from box " + add1(kX) + ", " + add1(kY) + " by a naked set of " + n + " in block " + add1(blockX) + ", " + add1(blockY) + "\n\n";
					}
				}
			}
			
			if(returnString != ""){
				return returnString;
			} else{
				return "";
			}
		
		
	}
}
		
	
	
	
	
	
	return "";
}

function nakedN(){
	
	returnString = "";
	
	for(let n = 2; n < 4; n++){
		console.log()
	//check rows
	
		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 9; j++){
				if(puzzle[i][j] === " "){
					
					if(pMatrix[i][j].size === n){
						
						
						
						returnString = returnString + checkTuple(i, j, "row", n, pMatrix[i][j]);
						
						if(returnString === ""){
							returnString = returnString + checkTuple(i, j, "col", n, pMatrix[i][j]);
						}
						
						if(returnString === ""){
							returnString = returnString + checkTuple(i, j, "block", n, pMatrix[i][j]);
						}
					}
					
					
				}
			}
		}
		
		
	}
	
	if(returnString !== ""){
			return returnString;
		} else{
			return null;
		}
}
	
	
function pointingPair(){
	
	//iterate through each block
	for(let m = 0; m < 3; m++){
		for(let n = 0; n < 3; n++){
			
			//for each block, check if there is a pointing pair
			//check each number 1-9
			for(let a = 1; a < 10; a++){
				
				let foundPair = false;
				let cont = true;
				let row = 0;
				
				//Check for horizontal pointing pairs
				//Iterate through the block. In this case i is a row in a block and j is a column
				for(let i = 0; i < 3; i++){
					
					if(cont === true){
						
						let count = 0;
						for(let j = 0; j < 3; j++){
							if(pMatrix[m*3+i][n*3+j].has(a)){
								count++;
							}
						}
						
						if(foundPair === false){
							if(count > 1){
								foundPair = true;
								row = i+m*3;
							} else if(count == 1) {
								cont = false;
							}
						} else{
							if(count > 0){
								cont = false;
								foundPair = false;
							}
						}
					}
				}
				
			if(cont === true && foundPair === true){
				
				let indexes = "";
				for(let k = 0; k < 9; k++){
					if(pMatrix[row][k].has(a) && ((k > (n*3)+2) || k < n*3)){
						pMatrix[row][k].delete(a);
						indexes = indexes + " " + add1(k) + ", " + add1(row) + ", ";
					}
					
				}
				if(indexes != ""){
					
					return "The number " + a + " has been ruled out from boxes " + indexes + " by a pointing pair in row " + add1(row);
				}
			}
			}
			
			
		}
	}
	
	//Columns
	
	for(let m = 0; m < 3; m++){
		for(let n = 0; n < 3; n++){
			
			//for each block, check if there is a pointing pair
			//check each number 1-9
			for(let a = 1; a < 10; a++){
				
				let foundPair = false;
				let cont = true;
				let row = 0;
				
				//Check for horizontal pointing pairs
				//Iterate through the block. In this case i is a row in a block and j is a column
				for(let j = 0; j < 3; j++){
					
					if(cont === true){
						
						let count = 0;
						for(let i = 0; i < 3; i++){
							if(pMatrix[m*3+i][n*3+j].has(a)){
								count++;
							}
						}
						
						if(foundPair === false){
							if(count > 1){
								foundPair = true;
								col = j+n*3;
							} else if(count == 1) {
								cont = false;
							}
						} else{
							if(count > 0){
								cont = false;
								foundPair = false;
							}
						}
					}
				}
				
			if(cont === true && foundPair === true){
				
				let indexes = "";
				for(let k = 0; k < 9; k++){
					if(pMatrix[k][col].has(a) && ((k > (m*3)+2) || k < m*3)){
						pMatrix[k][col].delete(a);
						indexes = indexes + " " + add1(col) + ", " + add1(k) + ", ";
					}
					
				}
				if(indexes != ""){
					
					return "The number " + a + " has been ruled out from boxes " + indexes + " by a pointing pair in col " + add1(col);
				}
			}
			}
			
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	return null;
}















function next(){
	
	let returnString = null;
	
	if(!validPuzzle){
		document.getElementById("output").value = "You have not entered a valid input yet. Enter a valid input and click solve, then try again."
		return;
	}
	
	//This section only needs to happen the first time next() is run. It checks to make sure the puzzle
	// does not contradict itself, and sets up the pMatrix.
	if(fPass){
		let a = checkContradictions();
		
		logString = "";
		
		initPMatrix();
		fPass = false;
		
		
		
		if(!a){
			returnString = "ERROR: Contradiction found."
		}
	}
		
	//Simple rule out rules out nums for empty squares based on characters that have already been defined
	//Since this is the most simple strategy in sodoku and it happens a lot, nothing will be printed to 
	//the log when this happens.
	if(returnString === null){
	 simpleRuleOut();
	}
	
	if(returnString === null){
	 returnString = hiddenSingle();
	}
	
	if(returnString === null){
	 returnString = pointingPair();
	}
	
	if(returnString === null){
	 returnString = nakedSingle();
	}
	
	if(returnString === null){
	 returnString = nakedN();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//Check if the puzzle is solved.
	solved = true;
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			if(puzzle[i][j] === " "){
				solved = false;
			}
		}
	}
	
	if(solved === true){
		returnString = "The puzzle is solved."
	}
	
	
	
	let puzzleOutput = "";
	
	if(returnString === null){
		returnString = "The solver was unable to solve this puzzle. Check your input and try again.";
	} 
	
	logString = returnString + "\n\n" + logString;
	
	
	//Print
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			
			if(puzzle[i][j] == " "){
				puzzleOutput = puzzleOutput.concat(" " + puzzle[i][j] + "  ");
			} else {
				puzzleOutput = puzzleOutput.concat(" " + puzzle[i][j] + " ");
			}
			
			if(j === 2 || j === 5){
				puzzleOutput = puzzleOutput.concat("|");
			}
		}
		
	if(i === 2 || i === 5){
		puzzleOutput = puzzleOutput.concat("\n--------------------------");
	}
	puzzleOutput = puzzleOutput.concat("\r\n");
	}
	
	document.getElementById("output").value = puzzleOutput;
	document.getElementById("log").value = logString;
}
