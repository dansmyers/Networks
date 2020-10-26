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

// Holds the query from user
let userQuery = "";

    
//test
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
    let lineCounter = 1;
    let currLine = "";
    
    let wordCount = 0;
    let wordIndex = 0;
    
    // Process each line
    for (let line of lines) {
        
        let sepWords = line.split(/[\s]+/);
        
        let speakerFromRest = line.split(/[\t]+/);
        
        currLine = line;
        
        // Keep track of act
        // use an if to find lines that start with ACT
        // then save the whole line string to currAct
        if (sepWords[0] === "ACT") {
            //sepWords = line.split(" ");
            currAct = line;
            //console.log("Current ACT is " + currAct);
        }
        
        if (sepWords[0] === "SCENE") {
            currScene = sepWords[0] + " " + sepWords[1];
            //console.log("Current SCENE is " + currScene);
        }
        
        // if a line starts with a TAB, then you know it's part of a particular character's dialogue
        // if first "word" of the line is NOT a TAB, save the first word into currSpeaker
        if (speakerFromRest[0] !== "\t" && speakerFromRest[0] !== "") {
            currSpeaker = speakerFromRest[0];
        }
        
        for (let word of sepWords) {
            
            let strippedWord = word.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
            
            // entire concatenated string with all parsed info for one unique occurrence of the desired word
            let wordInfo = "";
            
            // new RegEx option for the queried word
            let queryRegExp = new RegExp(/^word$/);
            
            wordInfo += currPlay + "\n" + currAct + ", " + currScene + "\n" + currSpeaker + "\n" + currLine + "\n\n";
            
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
            
            wordIndex++;
        }
        wordInfo = "";
        
        lineCounter++;
    }
    
    console.log("Number of times desired word appears: " + wordCount + "\n");
    
    for(var word in index) {
        console.log (word, index[word]);
    }
}

/**
 * Main -- setup the index
 */ 
 
// Index object
let index = {};

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

    var query = req.query.query;
    console.log("You queried: " + query);
    
    userQuery = query;
    
    let allOccurences = listOccurences(userQuery);

    var data = {message: 'You queried: ' + query};

    res.setHeader('Content-Type', 'application/json');
    //res.json(data);
    res.json(allOccurences);
});

// Return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));