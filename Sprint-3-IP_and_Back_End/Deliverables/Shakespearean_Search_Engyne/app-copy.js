/**
 * Search engine starter code
 */
 
const express = require('express');
const app = express();
const port = 80; // Standard port for HTTP requests, mirrored up to port 8080
var path = require('path');
app.use(express.static('public'));

// Body parser provides support for reading JSON bodies of POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));


// Load required packages
const fs = require('fs');

/**
 * Main -- setup the index
*/ 
     
// Index object
// move this out of app.get
// think about this as hash map

// HashMap<String, ArrayList<EntryObjects>>

// The index is initially empty.

// When you read a word from the text, you need to check if that word already has an entry in the index.

// If it does, append a new entry to its value list, indicates that you've found a new occurrence of the word.

// If it doesn't, then this is the first time you've seen that word, so you're going to create a brand-new entry in the index for it

let index = {};
let play = '';
let act = '';
let scene = '';
let actor = '';
let phrase = '';
    
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

/**
 * Process the complete text of one file
 */
 
function addLocation(key,line) {
    if(key in index){
        index[key].push({play: play, act: act, scene: scene, actor: actor, phrase: line})
    }
    else{
        index[key] = [];
        index[key].push({play: play, act: act, scene: scene, actor: actor, phrase: line});
    }
}

function readText(err, fullText) {
    
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    
    // Split the complete text, which is one huge string,
    // into separate lines using a regular expression
    
    let lines = fullText.split(/\r?\n/);
    
    play = lines[0]; // get play
    
    
    // Process each line
    for (let line of lines) { // let line of lines
    
        // console.log(lines[i]);
        words = line.split((/[\s,;:.!?]+/));
        for(let word of words){
            if(isNaN(word.charCodeAt(0))){
                // trap to get rid of NaN's
            } // trap
            else if(line === lines[0]){
                // trap for title
            } // trap
            else if(line.substring(0,3) === 'ACT'){
                act = line;
            }
            else if(line.substring(0,5) === 'SCENE'){
                let splitter = words[1].split('\t');
                scene = words[0] + ' ' + splitter[0];
            }
            else if(line.charAt(0) !== '\t'){ //&& !(isNaN(word.charCodeAt(0)))
                let splitter = words[0].split('\t');
                actor = splitter[0];
                
                // handle when the actor is combined with the first word
                if(word === words[0]){
                    addLocation(word,line);
                }
                else{
                    addLocation(word,line);
                }
            }
            else if(line.charAt(0) === '\t'){
                addLocation(word,line);
            }
        }
    }
    
    //console.log(index['wherefore']);
    
}

// // capitalize the client query word
// function capitalizeFirstLetter(word) {
//     return word.charAt(0).toUpperCase() + word.slice(1);
// }

// let searchWord = 'wherefore';
// let capitalName = capitalizeFirstLetter(searchWord);

// let result = index['wherefore'];

// console.log(index);

// Add submit route to receive requests from the example page
app.get('/submit', function(req, res) {
    console.log('Request received');
    
    let name = req.query.name;
    console.log("Name: " + name);
    
    res.setHeader('Content-Type', 'application/json');
    res.json(index[name]);

});

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
