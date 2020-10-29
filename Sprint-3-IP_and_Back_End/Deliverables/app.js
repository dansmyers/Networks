/**
 * Shakespearean Search Engine
 * This program will process requests given by a user to find a certain word in Shakespeare plays and then return occurrences of the word in the form of a JSON object.
 * 
 * 
 * Jacob Buckelew CMS450, Fall 2020
 * 
 * 
 */


// Load required packages, and setup express, body-parser
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80;
var path = require('path');
app.use(express.static('public'));

// Body parser provides support for reading JSON bodies of GET requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Receive request from server
app.get('/search', function(req, res) {
	
	var message = req.query.query;
	console.log("Word: " + message);
	
	var data = {response: index[message]};
	
	res.setHeader('Content-Type', 'application/json');
	res.json(data);
});

/**
 * Process the complete text of one file
 * This function is asynchronous
 * Also, this function will take in a text file as input and read through the text, making note of the act, scene, character, and play as it reads through each line and appends occurrences of a word to its corresponding value(which is an array) in the index object.
 */
function readText(err, fullText) {
    
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    
    // Split the complete text, which is one huge string,
    // into separate lines using a regular expression
    let lines = fullText.split(/\r?\n/);
    
    
    let play = "";
    let act = "";
    let scene = "";
    let character = "";
    
    let word = "";
    
    
    
    //Process each line
    for (let line of lines) {
    	
    	// Check which play we are currently looking in. This will update the play variable as well.
    	
    	if(line === lines[0]) {
    		play = line;
    	}
    	
    	// Check which act we are currently looking in. This will need to update the Act variable. We can also consider the prologue for some plays such as R&J
    	
    	else if(line.includes("ACT")) {
    		act = line;
    	}
    	
    	else if(line.includes("PROLOGUE")) {
    		act = line;
    	}
    	
    	// Two cases where we must consider the presence of words
    	// 1. Words are used to describe the start of a new SCENE
    	// 2. Words are said by a character
    	
    	
    	// Also updates the scene variable
    	
    	else if(line.includes("SCENE")){
    		let splitLine = line.split(/\s+/);
    		scene = splitLine[0].concat(' ', splitLine[1]);
    		for(let i = 2; i < splitLine.length; i++) {
    			word = splitLine[i];
    			
    			// Use Reg Ex to get rid of weird punctuations from the words of interest
    			
    			word = word.replace(/[?!,:;\.]/g, "");
    			character = "No Character";
    			

				// Check to see if word is in index. If so, push the word and its attributes with it. If not, make a new mapping for it.
				// The mapping for each word can just be one long array since the contiguous structure of an array allows for easy organization of 5 indices-long occurrences of the word. 
    			
    			if(word in index){
    				index[word].push(play, act, scene, character, line);
    			}
    			else {
    				index[word] = [play, act, scene, character, line];
    			}
    			//console.log(index[word]);
    		}
    	
    		}
    		
    	// Disregard descriptions in [   ] and all other Capitalized things in between people speaking to isolate dialogue. 
    	else if(!line.match(/^[A-Z]\s+$/) && !line.includes("[") && !line.includes("]")){
    		
    		// Check to see if continuing a speech or start of new character's lines
    		
    		
    		// Here is the case where a character is making a longer speech that surpasses just one single line of dialogue.
    		if(line[0] === "\t") {
    			
    			
    			
    			// Start reading at line[1] to skip the spaces
    			
    			let splitLine = line.split(/\s+/);
    			
    			for(let i = 0; i < splitLine.length; i++) {
    				word = splitLine[i];
    				
    				// Clean up the words
    				
    				word = word.replace(/[?!,:;\.]/g, "");
    				
    				if(word in index){
    					index[word].push(play, act, scene, character, line);
    				}
    			    else {
    					index[word] = [play, act, scene, character, line];
    				
    				}
    				
    				
    			
    			
    			}
    		}
    		
    		// case where a word shows up on the first line. The word will show up along with the character's name in the same line. This case will also update the character variable.
    		if(line.match(/^[A-Z]/)) {
    			//console.log(line);
    			
    		// Two cases for the characters:
    		// 1. Character is a minor character(not capitalized)
    		// 2. Character is a major character(capitalized)
    			
    			// Uppercase Character
    			
    			
    			
    			if(line[1] == line[1].toUpperCase()) {
    				
    				splitLine = line.split(/\s+/);
    				
    				// iterate differently depending on the case: if we have a two word name we want to set J to 2 when we start reading line, otherwise it will begin at 1.
    				let j = 0;
    				// Check to see if the major character is one word or two
    				if((splitLine[1].charAt(2) == splitLine[1].charAt(2).toUpperCase()) && (splitLine[1].charAt(1) == splitLine[1].charAt(1).toUpperCase()) && (splitLine[1].length > 2) && (!splitLine[1].match(/[?!,:;-]/))) {
    					character = splitLine[0] + ' ' + splitLine[1];
    					
    					j = 2;
    					
    				}
    				else {
    				
    					character = splitLine[0];
    					j = 1;
    				}
    				
    				
    				
    				
    				for(j; j < splitLine.length; j++) {
    					word = splitLine[j];
    					
    					
    					word = word.replace(/[?!,:;\.]/g, "");

    					if(word in index){
    						index[word].push(play, act, scene, character, line);
    					}
    			    	else {
    						index[word] = [play, act, scene, character, line];
    				
    					}

    				}
    			}
    			
    			// Lowercase Character
    			
    			else {
    				let j = 0;
    				splitLine = line.split(/\s+/);
    				if(line.match(/^[A-Z\t]/) && (line[splitLine[0].length] === ' ')) {
    					character = splitLine[0].concat(' ' + splitLine[1]);
    					j = 2;
    				}
    				
    				
    				else {
    					character = splitLine[0];
    					j = 1;
    				}
    				
    				
    				for(j; j < splitLine.length; j++) {
    					word = splitLine[j];
    					
    					word = word.replace(/[?!,:;\.]/g, "");

    					if(word in index){
    						index[word].push(play, act, scene, character, line);
    					}
    			    	else {
    						index[word] = [play, act, scene, character, line];
    				
    					}
    				}
    			}
    		}
    	}
    }
    	
}



/**
 * Main -- setup the index
 * The Main function sets up the index by calling readText on each play we wish to search through. Will save key:value pairs that map a word to an array that appends occurrences of the word
 */ 
 
// Index object
var index = {};

// List of the plays
let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt'];

// Read the contents of each text, then call the readText function
//
// Note: readText runs asynchronously, so you can't guarantee that the 
// callbacks execute in any particular order
//
// Also note: this version reads the entire text of the file into one
// string, which may not always be what you want. There are other options
// to read files line by line, but you have to use a PER-LINE callback.
for (let text of texts) {
   fs.readFile('./texts/' + text, 'utf8' , readText);
}

