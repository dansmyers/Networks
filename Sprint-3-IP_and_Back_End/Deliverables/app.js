/* Lee Springer */

const express = require('express');
const app = express();
const port = 80;
let path = require('path');
app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(port, () => console.log(``));

app.get('/submit', function(req, res) {

    let name = req.query.query;
    console.log("Name: " + name);

    let data = {message: index[name]};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});


/**
 * Search engine starter code
 */
const fs = require('fs');

/**
 * Main -- setup the index
 */ 
 
let index = {};

let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt'];

for (let text of texts) {
   fs.readFile('./texts/' + text, 'utf8' , readText);
}


/**
 * Process the complete text of one file
 */
function readText(err, fullText) {
    
    if (err) {
        console.log(err);
        return;
    }
    
    let lines = fullText.split(/\r?\n/)
    let play = lines[0];
    let act = "";
    let scene = "";
    let character = "";
    
    for (let line of lines) {
        if(line[0] === 'A' && line[1] === 'C' && line[2] === 'T')
        {
        	act = line;
        } else if(line[0] === 'S' && line [1] === 'C' && line [2] === 'E' && line [3] === 'N' && line [4] === 'E') {
        	scene = line.split("\t")[0];
        } else if(line !== act && line.split("\t")[0] !== scene && line !== play && line[0] !== "\t" && line !== "") {
        	character = line.split("\t")[0];
        }
        
        words = line.replace(/\t/, " ");
    	  words = words.split(" ");
        
        for (word of words)
        {
        	if(word !== "")
        	{
        		if(word[0] === " ")
        		{
        			word = word.split(" ")[1];
        		}
        		
        		word = word.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, "");
        		
        		if(!(word in index))
        		{
        			index[word] = [play, act, scene, character, line];
        		}
        		else {
	    			  arr = index[word];
	    			  arr2 = [play, act, scene, character, line];
	    			  arr3 = arr.concat(arr2);
	    			  index[word] = arr3;
	    		  }
        	}
        }
        
    }
}