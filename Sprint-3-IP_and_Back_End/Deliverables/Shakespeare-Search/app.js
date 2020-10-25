

// Load required packages
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80;
let path = require('path');
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//---------------------express------------------------------//
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/search', function(req, res) {
    let data ="";
    let input = req.query.word;
    console.log("Search Word: " + input);
    let result = toResult(index[input]);
    // console.log(index[input]);
      //check if word is in index
    if(index[input]){
        data = {message: 'The word \'' + input + '\' is found: <br/> ' + result};
        
    } else {
        data = {message: 'cannot find the word ' + input}; 
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//---------------------functions------------------------------//
// Process the complete text of one file
function readText(err, fullText) {
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }

    // Split the complete text into separate lines 
    let lines = fullText.split(/\r?\n/);
    let play = lines[0];
    let act = "";
    let scene = "";
    let character = "";
    let line = "";
    // Process each line
    for (let line of lines) {
        
        //find character
      let w = line.split("\t");
      if(w[0]){
          character = w[0];
      }

      //split line into array of words
      let words = line.split(" ");
      if(words[0] !== null){
              if(line.includes("ACT")) {
                  act = words[0] + " " + words[1];
              } else if(line.includes("SCENE")) {
                  scene = words[1].charAt(0);
              } 
            }

    //split array of words into single word
      for(let word in words){
          w = words[word].replace(/ |,|\t|;|'|:|]|/g, "").toLowerCase();
         //push new objects into array if word is the same
          if(w in index){
              index[w].push({ word:w,
                  play:play,
                  act: act,
                  scene: scene,
                  character: character,
                  line: line
                 });
              
          }else{//add word to index. word is the key and the value will be array of objects
              index[w] =  [{
                  count: 1,
                  word:w,
                  play:play,
                  act: act,
                  scene: scene,
                  character: character,
                  line: line
               }];
          }
      }//end of word in words
    }//end of for line in lines
}//end of read file

function toResult(i){
    let result = "";
    let count = 1;
    for(items in i){
        let o = i[items];//seperate each object
         if(o.line.includes(o.character)){
          o.line.replace(o.character,"");
         }
         result+= count + ".) In the play: "+o.play+" in " 
         +o.act+", SCENE "+o.scene+". "
         +o.character.charAt(0)+ o.character.slice(1).toLowerCase()
         +" says the line:  \'"+o.line+"\' <br/> " ;
         count++;
    }
   return result; 
}
//---------------------main------------------------------//
// Index object
let index = {};

// List of the plays '
let texts = ['macbeth.txt', 'romeo_and_juliet.txt', 'a_midsummer_nights_dream.txt'];

// Read the contents of each text, then call the readText function
for (let text of texts) {
   fs.readFile('../texts/' + text, 'utf8' , readText);
}

  
