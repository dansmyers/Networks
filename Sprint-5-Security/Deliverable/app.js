const express = require("express")

const path = require("path")
const app = express();

const port = 80;

app.use(express.static("public"));

var bodyParser = require('body-parser');
const math = require("mathjs");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname + "/assets")));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.post("/calculateDerative", function(req, res){
	let formula = req.body.hello;

	console.log(math.derivative(formula,"x").toString());
	

	let result = math.derivative(formula, "x").toString();

	res.send(result);
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));