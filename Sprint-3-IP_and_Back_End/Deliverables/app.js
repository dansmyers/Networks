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
    
    
    if (err) {
        console.log(err);
        return;
    }
    let lines = fullText.split(/\r?\n/);
    play = lines[0]; 
    // Process each line
    for (let line of lines) { 
    
        
        words = line.split((/[\s,;:.!?]+/));
        for(let word of words){
            if(isNaN(word.charCodeAt(0))){
            }
            else if(line === lines[0]){
                
            } 
            else if(line.substring(0,3) === 'ACT'){
                act = line;
            }
            else if(line.substring(0,5) === 'SCENE'){
                let splitter = words[1].split('\t');
                scene = words[0] + ' ' + splitter[0];
            }
            else if(line.charAt(0) !== '\t'){ 
                let splitter = words[0].split('\t');
                actor = splitter[0];
                
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
