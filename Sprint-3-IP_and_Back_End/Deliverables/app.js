/**
 * Search engine starter code
 */
 
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


function searchFor(search) {
    
    let response = '';
    let found = false;
    
    for(let i = 0; i < index.w.length; i++) {
        
        if(index.w[i].toLowerCase() === search.toLowerCase()) {
            response =  response + '&#10;' + index.t[i] + '&#10;' + index.a[i] + ', ' + index.s[i] + '&#10;' + index.c[i] + '&#10;' + index.l[i].trim() + '&#10;';
            found = true;
        }
        
    }
    
    if(found) {
        return response;
    } else {
        return "Word not found."
    }
    
}


app.get('/search', function(req, res) {
    console.log("Request received");
    
    var search = req.query.query;
    console.log(search);
    
    let response = searchFor(search);

    res.setHeader('Content-Type', 'application/json');
    res.json(response);
});


// Load required packages
const fs = require('fs');

// Index object
let index = {
    
    w: [],
    c: [],
    a: [],
    t: [],
    l: [],
    s: []
    
}


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
    let splitLine;
    let words;
    let count = 0;
    
    let title = '';
    let act = '';
    let scene = '';
    let character = '';
    let fullLine = '';
    
    // Process each line
    for (let line of lines) {
        
        if(count === 0) {
            title = line;
            count++;
        }
        
        if(line.indexOf('ACT') === 0 && count != 0) {
            act = line;
        }
        
        if(line.indexOf('SCENE') === 0 && count != 0) {
            let sceneSplit = line.split('\t');
            scene = sceneSplit[0];
        }
        
        if(line[0] !== '\t' && line[0] !== '' && count != 0) {
            splitLine = line.split('\t');
            character = splitLine[0];
        }
        
        if(line.indexOf(title) == -1 && line.indexOf(act) == -1 && line.indexOf(scene) == -1 && line.indexOf('[') == -1) {
            fullLine = line;
            
            words = fullLine.split(' ');
            
            for(let word of words) {
                index.w.push(word);
                index.c.push(character);
                index.a.push(act);
                index.t.push(title);
                index.l.push(fullLine);
                index.s.push(scene);
            }
            //console.log(words);
        }

        console.log(line);
        console.log(scene);
        console.log(character);
        console.log(title);

    }
    
    console.log(index.w);
}




/**
 * Main -- setup the index
 */ 



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