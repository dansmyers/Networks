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



// Add submit route to receive requests from the example page
app.get('/submit', function(req, res) {
    console.log('Request received');
    
    let name = req.query.name;
    console.log("Name: " + name);
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
    
    // for (let text of texts) {
       fs.readFile('./texts/' + texts[2], 'utf8' , readText);
    // }
});

/**
 * Process the complete text of one file
 */
function readText(err, fullText) {
    
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    
    let searchterm = 'methinks';
    
    let play = '';
    let act = '';
    let scene = '';
    let actor = '';
    let phrase = '';
    
    // Split the complete text, which is one huge string,
    // into separate lines using a regular expression
    let lines = fullText.split(/\r?\n/)
    
    play = lines[0]; // get play
    
    // Process each line
    for (let i = 0; i < 15; i++) { // let line of lines
    
        let words = lines[i].split('\t');
        
        if(lines[i].charAt(0) !== '\t'){
            words = lines[i].split(/[\s\t]+/);
            if(words[0] === 'ACT'){
                act = words[0] + ' ' + words[1]; // update act
            }
            if(words[0] === 'SCENE'){
                scene = words[0] + ' ' + words[1]; // update scene 
            }
            if(words.length > 1){
                actor = words[0]; // update actor
            }
            //console.log(words[0] + ' ');
            //console.log(i+1 + ' ' + lines[i]);
        }
        if(lines[i].charAt(0) === '\t'){
            words = lines[i].split(/[\s\t,;:.]+/);
            for(let word of words){
                console.log(word);
                if(word === searchterm){
                    phrase = lines[i]; // get line
                }
            }
        }
   
        //console.log(i + ' ' + lines[i]);
        
        //console.log(lines[i]);
    }
    console.log();
    console.log(play);
    console.log(act);
    console.log(scene);
    console.log(actor);
    console.log(phrase);
    
    res.setHeader('Content-Type', 'application/json');
    res.json(index);
}

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
