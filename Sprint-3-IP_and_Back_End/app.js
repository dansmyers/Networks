/**
 * Search engine starter code
 */


// Load required packages
const fs = require('fs');

const express = require('express')
const app = express()
const port = 80
var path = require('path');
app.use(express.static('public'));

// Body parser provides support for reading JSON bodies of POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/submit', function(req, res) {
    console.log('Request received');
   
   
});

app.listen(port, () => console.log(`Listening on port ${port}!`))


/**
 * Process the complete text of one file
 */
 
 
function readText(err, fullText) {
    let word = "man";
   
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    // Split the complete text, which is one huge string,
    // into separate lines using a regular expression
    let lines = fullText.split(/\r?\n/)
   
    let index = {};
   
   
    index.play = lines[0];
   
    for(let i=0; i < lines.length; i++) {
        var str = lines[i];
        var words = lines[i].split(/\s+/);
        //console.log(typeof words[0]);
        //console.log(words);
        if(words[0] != '') {
            if(words[0].localeCompare('ACT') === 0) {
                index.act = words[1];
            }
            else if(words[0].localeCompare('SCENE') === 0) {
                index.scene = words[1];
            }
            else {
                index.character = words[0];
            }
        }
        if(lines[i].includes('man')) {
            return index;
        }
    }

   
}

//function readMac(searchFor) {
    //var index = {};
    //index.play = 'Macbeth'
   
   
//}

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
