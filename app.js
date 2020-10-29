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

 //Laying the groundwork for JSON objects to send to front end
let play = '';
let act = '';
let scene = '';
let actor = '';
let phrase = '';
/**
 * Process the complete text of one file (a callback function)
 */
 //Helper functions for ReadText
 function addLocation(key,line) {
    // check if word is capitalized
    if(key.charAt(0) !== key.charAt(0).toLowerCase()){
        key = lowerCase(key);
    }
    
    if(key in index){
        let info = play + '\n' + act + ', ' + scene + '\n' + actor + '\n' + line + '\n';
        index[key].locations.push(info);
    }
    else{
        index[key] = {locations: []};
        let info = play + '\n' + act + ', ' + scene + '\n' + actor + '\n' + line + '\n';
        index[key].locations.push(info);
    }
}

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
    
    play = lines[0]; //Getting the title of the play
    
    //let searchTerm = 'thumb';
    // Process each line
    for (let line of lines) {
        //console.log(line);
        let words = line.split(" ");
        //console.log(words);
        for(let word of words){
            if(isNaN(word.charCodeAt(0)) | line === lines[0]){
                //don't do anything if the first character is a NaN or the line is the title
            }
            //If the line starts a new act, update which act we are on
            else if(line.substring(0,3) === 'ACT'){
                act = line; 
            }
            //If the line starts a scene, update the scene
            else if(line.substring(0,5) === 'SCENE'){
                console.log(words[0] + ' ' + words[1]);
                let tabRemoved = words[1].split("\t");
                scene = words[0] + ' ' + tabRemoved[0];
            }
            else if(line.charAt(0) !== '\t'){ 
                let tabRemoved = words[0].split('\t');
                actor = tabRemoved[0];
                
                // handles when the actor is combined with the first word
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
}


/**
 * Main -- setup the index
 */ 
let index = {};

// List of the plays
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

// Add submit route to receive requests from the example page
app.get('/submit', function(req, res) {
    console.log('Request received');
    
    let name = req.query.name;
    console.log("Name: " + name);
    
    res.setHeader('Content-Type', 'application/json');
    
    let results = index[name];
    let response = results;

    
    
    res.json(response);

});

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

