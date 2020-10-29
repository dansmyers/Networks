
/**
 * Search engine starter code
 */

let index = {}
const express= require('express');
const app = express();
const port = 80;
var path= require('path');
app.use (express.static('public'));

var bodyParser= require ('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/search', function(req,res){
    
    var query= req.query.word;
    console.log("Query: "+ query);
    
    var data = index[query];
    
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Load required packages
const fs = require('fs');


/**
 * Process the complete text of one file
 */
function readText(err, fullText) {
    let play="";
    let act="";
    let speaker="";
    let scene=""
    let firstLine=true;
    let words=[];
    // If there was an error, give up
    if (err) {
        console.log(err);
        return;
    }
    
    // Split the complete text, which is one huge string,
    // into separate lines using a regular expression
    let lines = fullText.split(/\r?\n/)
    for (let line of lines){
        if (firstLine){
            play=line;
            firstLine=false;
            
        }
        else if (line.substring(0,3)=="ACT"||line.substring(0,8)=="PROLOGUE"){
            act=line;
        }
        else if (line.substring(0,5) == "SCENE"){
            scene= line.substring(0, line.indexOf ('\t'));
        }
        else{
            if(line.charAt(0) != "\t" && (line.charCodeAt(0) > 65 && line.charCodeAt(0) < 123)){
                speakerLines=line.split(/\t/);
                speaker= speakerLines[0];
                line= speakerLines[1];
            }
        }
        if (line.charAt(0) =="\t"){
            line=line.substring(1);
        }
        words=line.split(" ");
        
        for(let word of words){
            if (index.hasOwnProperty(word)===false){
                index[word]=[
                    {
                        "play": play,
                        "act": act,
                        "scene":scene,
                        "speaker": speaker,
                        "line": line
                    }
                    ];
            }
            else{
                index[word].push(
                    {
                        "play":play,
                        "act":act,
                        "scene":scene,
                        "speaker": speaker,
                        "line": line
                    });
            }
        }
    }
    // Process each line
    //console.log(index['wherefore']);
}


/**
 * Main -- setup the index
 */ 
 
// Index object


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
