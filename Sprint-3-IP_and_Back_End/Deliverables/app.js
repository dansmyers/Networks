/**
 * Search engine starter code
 */

const express = require('express');
const app = express();
const port = 80;
var path = require('path');
app.use(express.static('public'));

// Load required packages
const fs = require('fs');
    
// All unique words will be stored at the start
let uniqueWords = [];

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
    
    // Keep track of PLAY stuff 
    let currPlay = lines[0];
    let currAct = "";
    let currScene = "";
    let currSpeaker = "";
    let currLine = "";
    
    let wordCount = 0;
    
    // Process each line
    for (let line of lines) {
        
        let sepWords = line.split(/[\s]+/);
        
        let speakerFromRest = line.split(/[\t]+/);
        
        currLine = line;
        
        // Keep track of act
        // use an if to find lines that start with ACT
        // then save the whole line string to currAct
        if (sepWords[0] === "ACT") {
            currAct = line;
        }
        
        if (sepWords[0] === "SCENE") {
            currScene = sepWords[0] + " " + sepWords[1];
        }
        
        // if a line starts with a TAB, then you know it's part of a particular character's dialogue
        // if first "word" of the line is NOT a TAB, save the first word into currSpeaker
        if (speakerFromRest[0] !== "\t" && speakerFromRest[0] !== "") {
            currSpeaker = speakerFromRest[0];
        }
        
        // go through each word
        // add them to the index
        for (let word of sepWords) {
            
            // get rid of any unnecessary punctuation barring ones like the apostrophe
            let strippedWord = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
            
            // if we haven't already indexed the current word
            // push it into the unique words array for comparisons down the line
            // then of course add the first occurence of this word as the key in "index"
            // else
            // just add another occurence into index for that key as it's not unique
            if (!uniqueWords.includes(strippedWord)) {
                uniqueWords.push(strippedWord)
                
                let wordOccurences = [];
                let anOccurence = {play:currPlay, act:currAct, scene:currScene, speaker:currSpeaker, line:currLine};
                
                wordOccurences.push(anOccurence);
                
                index[strippedWord] = wordOccurences;
            } else {
                let anOccurence = {play:currPlay, act:currAct, scene:currScene, speaker:currSpeaker, line:currLine};
                index[strippedWord].push(anOccurence);
            }
        }
    }
}

/**
 * Main -- setup the index
 */ 
 
// Index object
let index = {};

// Returns the list values for the desired query (key)
// View the console to confirm
function listOccurences(query) {
    console.log(index[query]);
    return index[query];
}

// List of the plays
//let texts = ['test.txt']
let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt']

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

// Receive a request from the server
app.get('/search', function(req, res) {

    // get the query from the user
    var query = req.query.query;
    console.log("You queried: " + query);
    
    // find all occurences of user query
    let allOccurences = listOccurences(query);

    res.setHeader('Content-Type', 'application/json');
    res.json(allOccurences);
});

// Return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));