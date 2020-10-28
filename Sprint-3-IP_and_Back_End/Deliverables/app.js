/**
 * Search engine starter code
 */


// Load required packages
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80;
var path = require('path');
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

/**
 * Process the complete text of one file
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
    
    let act;
    let scene;
    let character;
    let word;
    
    // Extract the play name from the first line
    let play = lines.shift();
    console.log("Reading text for " + play);
    
    // Process each line
    for (let fullLine of lines) {
        
        // Check to see if the line is empty
        if(fullLine !== "") {
            // Split the line by the tab in order to extract the information from the line
            let lineArray = fullLine.split("\t");
            let lineInfo = lineArray[0]; // Information that tells if it is an act, scene, character line, or additional character speech
            let lineInfoArray = lineInfo.split(" "); // Separate the initial line information by its space 
            let line = lineArray[1]; // Raw dialogue from characters
        
            // Determine what the line consists of based off its initial line information
            if (lineInfoArray[0] === ("ACT") || lineInfoArray[0] === ("PROLOGUE")) {
                act = lineInfoArray[1];
            } else if (lineInfoArray[0] === ("SCENE")) {
                scene = lineInfoArray[1];
            } else {
                // Checks to see if a new character is speaking
                if (lineInfo !== character && lineInfo !== "") {
                    character = lineInfo;
                }
                
                // Removes punctuation to interpret each word then separates each word from the string
                let parsedLine = line.replace(/[!"#$%&()*+,./:;<=>?@[\]^_`{|}~]/g, "").split(" ");
                
                // Iterate through the words and add them to the index
                for (let word of parsedLine) {
                    let indexElement = {word, play, act, scene, line, character};
                    word = word.toLowerCase();
                    
                    if (word in index) {
                        wordArray = index[word];
                        wordArray.push(indexElement);
                        index[word] = wordArray;
                    } else {
                        wordArray = [];
                        wordArray.push(indexElement);
                        index[word] = wordArray;
                    }
                }
            }
        }
    }
    
    console.log("Completed reading text for " + play);
    console.log(index);
}

function searchIndex(queryWord) {
    queryWord = queryWord.toLowerCase();
    
    if (queryWord === "") {
        return "Please submit a word into the input box!";
    } else if (queryWord in index) {
        let results = "";
        
        // Iterate through each entry for the query word and format them
        for (let element of index[queryWord]) {
            results += formatIndexElement(element);
        }
        
        return results;
    } else {
        return queryWord + " is not in any Shakespearean plays!";
    }
}

function formatIndexElement(indexElement) {
    // Format the index element for an HMTL output div
    let entry = "<p><b>" + indexElement.play + "</b></p>";
    
    entry += "<p>" + "Act " + indexElement.act + ", Scene " + indexElement.scene + "</p>";
    entry += "<p>" + indexElement.character + "</p>";
    entry += "<p>" + indexElement.character + ": " + indexElement.line + "</p><br>";
    
    return entry;
}

/**
 * Main -- setup the index
 */ 
 
// Index object
let index = {};

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

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/search', function(req, res){
    var word = req.query.query;
    console.log("Query word: " + word);
    
    // Begin the search of the word in the index.
    let results = searchIndex(word);
    
    // Specify that the response content is JSON encoded
    res.setHeader("Content-type", 'application/json');
    
    // Pack response data
    res.json(results);
});

// Run server
app.listen(port);










































