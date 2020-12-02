const express = require("express")

const path = require("path")
const app = express();

const port = 80;

app.use(express.static("public"));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + "/assets"));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get("/submit", function(req, res){
	
	let name = req.query.name;
	console.log(name);
	
	let data = {message: name};
	
	res.setHeader("COntent-Type", "application/json");
	res.json(data);
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`));