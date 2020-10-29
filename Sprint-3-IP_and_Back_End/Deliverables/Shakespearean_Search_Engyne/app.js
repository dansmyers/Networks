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

// global variables to keep track of location information
let play = '';
let act = '';
let scene = '';
let actor = '';
    
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
 
// add word location to index object
function addLocation(key,line) {
    
    // check if word is capitalized
    if(key.charAt(0) !== key.charAt(0).toLowerCase()){
        key = lowerCase(key);
    }
    
    // add to an existing entry
    if(key in index){
        let info = play + '\n' + act + ', ' + scene + '\n' + actor + '\n' + line + '\n';
        index[key].locations.push(info);
    }
    
    // add a new entry and initialize new JSON object with array
    else{
        index[key] = {locations: []};
        let info = play + '\n' + act + ', ' + scene + '\n' + actor + '\n' + line + '\n';
        index[key].locations.push(info);
    }
}

// change capitalized words to start with a lower case so that a query of a word
// will return capitalized instances as well
function lowerCase(key) {
    return key.charAt(0).toLowerCase() + key.slice(1);
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
            
            //  set actor for current word
            else if(line.substring(0,3) === 'ACT'){
                act = line;
            }
            
            // set scene for current word
            else if(line.substring(0,5) === 'SCENE'){
                let splitter = words[1].split('\t');
                scene = words[0] + ' ' + splitter[0];
            }
            
            // set actor for current word and handle words on actor line
            else if(line.charAt(0) !== '\t'){
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
            
            // handle other words not on an actor line
            else if(line.charAt(0) === '\t'){
                addLocation(word,line);
            }
        }
    }
}

// Add submit route to receive requests from the example page
app.get('/submit', function(req, res) {
    console.log('Request received');
    
    let name = req.query.name;
    
    // check if word is capitalized and change it if it is
    if(name.charAt(0) !== name.charAt(0).toLowerCase()){
        name = lowerCase(name);
    }
    
    console.log("Name: " + name);
    
    res.setHeader('Content-Type', 'application/json');
    
    // get line locations JSON object for query term
    let results = index[name];
    
    // declare response
    let response = results;
    
    // send back to client
    res.json(response);

});

// Run server
app.listen(port, () => console.log(`Shakespeare Search Engine listening on ${port}!`));
