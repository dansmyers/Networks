/**
 * Search engine starter code
 */


// Load required packages
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
var path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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


/**
 * Main -- setup the index
 */

// Index object
let index = {}

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
