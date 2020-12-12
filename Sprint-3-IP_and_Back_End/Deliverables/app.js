const express = require('express');
const app = express();
const port = 80;
var path = require('path');
app.use(express.static('public'));

// Body parser provides support for reading JSON bodies of POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Return root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

// Run server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Receive a request from the server
app.get('/submit', function(req, res) {

    var name = req.query.query;
    console.log(name);

    var data = {message: index[name]};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

/* Search engine starter code
 */


// Load required packages
const fs = require('fs');


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
    let lines = fullText.split(/\r?\n/)
    
    // Process each line
    
    let play = lines[0] +"\n";
    let act;
    let sc;
    let character = "";
    let speech = "";
    

    for (let line of lines) {
//Split line into words
//Check if word already has an index
//If it does, append this occurance to its array
//Index contained keys - each word - keys' data values
//are array arrays of each instance 
//Array strings of sequences


   //Split the line into individual words
        let words = line.split(" ");
 
        //Check if the line denotes a character would be followed
        //by a tab
        var checkChar = words[0].split("\t");
        if(checkChar[0] === checkChar[0].toUpperCase() && checkChar[0] !== ""){
            character = checkChar[0];
        }
        
        //If the line is all uppercase, update the act
        if(words[0] === "ACT"){
            act = line;
        } else if(words[0] === "SCENE"){
            sc = line;
        }else{
            speech = speech + line;
            for(var i = 0; i < words.length; i++){
                if(words[i] in index){
                    var original = index[words[i]];
                    var adding = [play, act, sc, character, line]
                    index[words[i]] = original.concat(adding);
                }else{
                    index[words[i]] = [play, act, sc, character, line];
                }
            }
        }
        
    
       
      //  console.log(index['farewell']);
    }
}


/**
 * Main -- setup the index
 */ 
 
// Index object
//Key value pairs for each word contain relevant info
//Value is array act, scene, character, entire line
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

