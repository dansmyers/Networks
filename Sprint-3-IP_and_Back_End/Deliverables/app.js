/**
 * Search engine starter code
 */


// Load required packages
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80; 
var path = require('path');
app.use(express.static('public'));


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
    for (let line of lines) {
        console.log(line);
    }
}

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

    console.log("Request received");

    var data = {message: 'hello, world!'};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

// Receive a request from the server
app.post('/submit', function(req, res) {

    var input = req.body.input;
    console.log("Word: " + input);
    

    var data = {message: 'hello, ' + name + '!'};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

/**
 * Main -- setup the index
 */ 
 
 
 //let title = lines[0]
 
 
// Index object
let index = {}

// List of the plays
let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt']

// Read the contents of each text, then call the readText function
//Read contents
  
fs.readFile('macbeth.txt', (err, data) => { 
    if (err) throw err; 
    // Converting Raw Buffer to text 
    // data using tostring function. 
    console.log(data); 
})

fs.readFile('romeo_and_juliet.txt', (err, data) => { 
    if (err) throw err; 
    // Converting Raw Buffer to text 
    // data using tostring function. 
    console.log(data); 
})

fs.readFile('a_midsummer_nights_dream.txt', (err, data) => { 
    if (err) throw err; 
    // Converting Raw Buffer to text 
    // data using tostring function. 
    console.log(data); 
})

//Call readText
readText(err, macbeth.txt);
readText(err, macbeth.txt);
readText(err, macbeth.txt);

// Note: readText runs asynchronously, so you can't guarantee that the 
// callbacks execute in any particular order
//
// Also note: this version reads the entire text of the file into one
// string, which may not always be what you want. There are other options
// to read files line by line, but you have to use a PER-LINE callback.
for (let text of texts) {
   fs.readFile('./texts/' + text, 'utf8' , readText);
}
