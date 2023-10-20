# Using XMLHttpRequest

## Description

We spent the last lab writing a server that established multiple routes, with each route representing the listening point of a service
that the application could provide to clients.

What we haven't done, however, is allow our front-end web pages to contact those routes. This lab will show you to makes requests and pass 
data between the front-end and back-end of an application using `XMLHttpRequest`, the vanilla JavaScript feature for HTTP communication.

## Setup the Server and Page

Create a new directory (the name doesn't matter) and create a new node project:

```
npm init

(accept default names)

npm install express --save
npm install body-parser --save (we'll use this later)
```

Create a basic `index.js` file with the following code:

```
const express = require('express');
const app = express();
const port = 8080;
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
```

This is the basic server we've used several times: it has one route that returns `index.html` when the browser requests `/`.

Now load up `index.html`:

```
<!DOCTYPE html>
<html>

    <head>

    </head>

    <body>
        <h1>Example</h1>


        <input id="input_box" type="text"> </input>

        <button id="button">Press Here</button>

        <div id="output_div"></div>

        <script>
            document.getElementById('button').onclick = function() {
                alert('Clicked!');
            }
        </script>

    </body>
</html>
```

The page has an input box and a button. Clicking the button fires off a little JavaScript that displays a message.

Run the server, load the page, and test the button.

## Client to Server

Create a new route on the server:

```
// Receive a request from the server
app.get('/submit', function(req, res) {

    console.log("Request received");

    var data = {message: 'hello, world!'};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});
```

This route is tied to the URL `/submit`. It uses the HTTP `GET` method.

The most important part is what it returns: 

- `data` is a JS object with one field (`message`)

- The final two lines convert that object into a text-based representation that can be the body of an HTTP response

This style of sending JS objects as HTTP text is called *JavaScript Object Notation* (JSON), and it's a preferred way of passing
information between clients and servers on the modern web.

Now add some code on the client to send an `XMLHttpRequest`. Replace the existing script block with the following:

```
        <script>
            document.getElementById('button').onclick = function() {

                // Send the request to the server
                var xmlhttp = new XMLHttpRequest();

                // This function runs when the server's response arrives
                xmlhttp.onload = function() {
                    var data = JSON.parse(this.responseText);
                    alert(data.message);
                };

                xmlhttp.open("GET", "/submit");  // Use POST method
                xmlhttp.send();
            }
        </script>
```

This code creates the new `XMLHttpRequest` object and sets its `onload` function, which runs when the response returns from
the server. Note that this is an **asynchronous** function.

The last two lines specify the use of the GET method and the destination URL, then send the request to the server.

## Passing More Parameters

Now, add a little more functionality to the code to pass a JSON object from the client to the server, use the data on the server,
then return a customized response.

Here is the updated server code. Note that the method has been changed to **POST**, because the server is now receiving JSON data
in the body of the HTTP message.

```
// Receive a request from the server
app.post('/submit', function(req, res) {

    var name = req.body.name;
    console.log("Name: " + name);

    var data = {message: 'hello, ' + name + '!'};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});
```

Here is the updated client. The differences are:

- The first three lines use `getElementById` to read the value of the text box (we've done this before) and assign it as a field in a JS object.

- The `open` method now uses the POST method.

- The last two lines send the text box value as JSON data.

```
        <script>
            document.getElementById('button').onclick = function() {
            
                // Read the value from the text box
                var textbox = document.getElementById('input_box');
                var text = textbox.value;
                
                // Pack it into an object
                var data = {name: text};

                // Send the request to the server
                var xmlhttp = new XMLHttpRequest();

                // This function runs when the server's response arrives
                xmlhttp.onload = function() {
                    var data = JSON.parse(this.responseText);
                    alert(data.message);
                };

                xmlhttp.open("POST", "/submit");  // Use POST method
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  // Data is JSON
                xmlhttp.send(JSON.stringify(data));  // Convert object to JSON HTTP body
            }
        </script>
```

## Passing Parameters Using GET

The previous example used HTTP POST to send data to the server. It's also possible to pass data to the server using GET.

What's the difference?

- POST is traditionally used for messages that imply some change in the server's state, or require the server to update its data model. For example, as the name implies, posting a new blog entry that's saved in a database of blog entries would use the POST method.

- GET is traditionally used to supply a query that the server can satisfy, but that doesn't require any change to the server's state or data. Passing a query to a search engine is an example.

Here's a rule of thumb: GET is often used for requests that **read** data from the server, without writing any new data. POST is used if
the request could result in a **write** of new data to the server.

The HTTP standard defines a few more methods, like PUT and DELETE, that are only infrequently used.

GET parameters are appended to the URL, like this:

```
http://prep-dansmyers/submit?name=dsm
```

The parameters come after the `?`. Each parameter is structured as a key-value pair; in this case, the key is `name` and the value is `dsm`.

It's possible to pass multiple parameters using `&`:

```
http://prep-dansmyers/submit?name=dsm&word=gnarly
```

Update your code to use GET:

```
// Receive a request from the server
app.get('/submit', function(req, res) {

    var name = req.query.name;
    console.log("Name: " + name);

    var data = {message: 'hello, ' + name + '!'};

    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});
```

This server-side code looks almost the same. The only different is using `req.query.name` instead of `req.body.name`. Notice that
the return message doesn't change: that part is the same for GET or POST.

On the client side, the primary change is to pass the parameter using the URL instead of
the message body.

```
        <script>
            document.getElementById('button').onclick = function() {

                var textbox = document.getElementById('input_box');
                var text = textbox.value;
                var data = {name: text};

                // Send the request to the server
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onload = function() {
                    var data = JSON.parse(this.responseText);
                    alert(data.message);
                };

                // Pass parameter using the URL
                xmlhttp.open("GET", "/submit/?name=" + text);
                xmlhttp.send();
            }
        </script>
```
