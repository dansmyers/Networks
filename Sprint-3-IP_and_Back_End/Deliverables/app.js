/* shakespeare search engine */

// include modules
const express = require('express');
const app = express();
const port = 80;
var path = require('path');
app.use(express.static('public'));

// parser for JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));


// load required packages
const fs = require('fs');

/* main: set up the index */

let index = {};
let play = '';
let act = '';
let scene = '';
let character = '';
let phrase = '';
    
// list of shakespeare plays
let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt'];
    
// read in the texts
for (let text of texts) {
    fs.readFile('./texts/' + text, 'utf8' , readText);
}

/* text processing */
 
function addLocation(key,line) {
    
    // case sensitivity, check for capitalization
    if(key.charAt(0) !== key.charAt(0).toLowerCase()){
        key = key.toLowerCase(); // convert to lowercase
    }
    
    if(key in index){
        let info = play + '\n' + act + ', ' + scene + '\n' + character + '\n' + line + '\n';
        index[key].locations.push(info);
    }
    else {
        index[key] = {locations: []};
        let info = play + '\n' + act + ', ' + scene + '\n' + character + '\n' + line + '\n';
        index[key].locations.push(info);
    }
}

function readText(err, fullText) {
    
    // if there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    
    // split the text into separate lines
    let lines = fullText.split(/\r?\n/);
    
    play = lines[0]; // get the play
    
    
    // process each line
    for (let line of lines) {
        
        // split based on spaces, punctuation
        words = line.split((/[\s,.:;?!]+/));
        
        for(let word of words){
            
            // check for NaN
            if(isNaN(word.charCodeAt(0))){
                // trap
            }
            
            // title
            else if(line === lines[0]){
                // trap
            }
            
            // identify act number
            else if(line.substring(0,3) === 'ACT'){
                act = line;
            }
            
            // identify scene number
            else if(line.substring(0,5) === 'SCENE'){
                let sub = words[1].split('\t');
                scene = words[0] + ' ' + sub[0];
            }
            
            // identify character
            else if(line.charAt(0) !== '\t'){ //&& !(isNaN(word.charCodeAt(0)))
                
                let sub = words[0].split('\t');
                character = sub[0];
                
                // if the character is combined with the first word
                if(word === words[0]){
                    addLocation(word, line);
                }
                
                else{
                    addLocation(word, line);
                }
            }
            
            else if(line.charAt(0) === '\t'){
                addLocation(word, line);
            }
        }
    }
}

// submit route for receiving requests
app.get('/submit', function(req, res) {
    console.log('Request received');
    
    let name = req.query.name;
    console.log("Word: " + name);
    
    res.setHeader('Content-Type', 'application/json');
    
    let results = index[name];
    let response = results;
    
    res.json(response);

});

// run server
app.listen(port, () => console.log(`Shakespeare Search Engine listening on port ${port}!`));