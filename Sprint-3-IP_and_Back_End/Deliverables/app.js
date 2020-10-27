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
app.listen(port, () => console.log(``));


app.get('/submit', function(req, res) {

    var name = req.query.query;
    console.log("Name: " + name);

    var data = {message: index[name]};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});


/**
 * Search engine starter code
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
    
    let play = lines[0];
    
    //console.log(play);
    
    let act = "";
    
    let scene = "";
    
    let character = "";
    
    // Process each line
    for (let line of lines) {
        if(line[0] === 'A' && line[1] === 'C' && line[2] === 'T')
        {
        	act = line;
        	//console.log(act);
        }
        
        else if(line[0] === 'S' && line [1] === 'C' && line [2] === 'E' && line [3] === 'N' && line [4] === 'E')
        {
        	scene = line.split("\t")[0];
        	//console.log(scene);
        }
        
        else if(line !== act && line.split("\t")[0] !== scene && line !== play && line[0] !== "\t" && line !== "")
        {
        	character = line.split("\t")[0];
        	//console.log(character);
        }
        
        words = line.split(" ");
        
        for(word of words)
        {
        	if(word !== "")
        	{
        		if(word[0] === "\t")
        		{
        			word = word.split("\t")[1];
        		}
        		
        		if(!(word in index))
        		{
        			index[word] = [play, act, scene, character, line];
        		}
        		else
	    		{
	    			arr = index[word];
	    			arr2 = [play, act, scene, character, line];
	    			arr3 = arr.concat(arr2);
	    			
	    			index[word] = arr3;
	    		}
        	}
        }
        
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