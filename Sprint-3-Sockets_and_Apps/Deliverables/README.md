# Deliverables

## REST

Summarize the principles of a REST API. Explain how an application that sends JSON formatted text over HTTP satisfies each of the principles.

## SDN

Do some reading in the textbook on software-defined networking. The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?

## Warm-up

Finish working through the two examples in the `Examples` directory, which will illustrate how to use Node's Express framework and `XmlHttpRequest`. You'll need to complete these before starting the next section.


## A Compleat Shakespearean Search Engyne

### *“Once more search with me.” - The Merry Wives of Windsor: IV, ii*

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Edwin_Landseer_-_Scene_from_A_Midsummer_Night%27s_Dream._Titania_and_Bottom_-_Google_Art_Project.jpg/2880px-Edwin_Landseer_-_Scene_from_A_Midsummer_Night%27s_Dream._Titania_and_Bottom_-_Google_Art_Project.jpg" width="50%" />

Here is your main JS programming challenge for this unit: write a search engine for the works of William Shakespeare.

You will write a Node.js server that processes the text of Shakespeare's plays and builds an index data structure. Your server will receive search requests from a front-end web 
page and return results on the play, act, scene, character, and line where a given word occurs in Shakespeare's plays.

For example, a query for the word *wherefore* would return the following information:

```
Romeo and Juliet
Act II, Scene II
Juliet
JULIET	O Romeo, Romeo! wherefore art thou Romeo?
```

The fourth line of the output is the line taken from the play's script that contains this instance of the word *wherefore*. The word wherefore occurs in other locations as well (five total times in Romea and Juliet) and your program must be able to return all of the occurences of the search word in its corpus.

### *“And here an engine fit for my proceeding.”- The Two Gentlemen of Verona: III, i*

<img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Romeo_and_juliet_brown.jpg" width="30%" />

**Front-End**

The front-end page is simple. Look at `index.html` as a starting point.

- Create a text box for the search word with a button to activate the search.
- On a button click, send an `XmlHttpRequest` to the server specifying the search word.
- The server processes the search and returns a JSON object containing the results.
- Use a `<div>` to display the search results. Apply some appropriate formatting.

**Back-End**

Most of the work will be on the back-end. Take a look at `app.js` as a starting point.

- I've given you some starter code that reads in the example texts. You need to add all of the additional text processing to extract the information
that you want from each line. 

- Write a route on the server that can receive a request from the front-end, extract the necessary information from the index structure, and
then return the results as in JSON format.

**Texts**

I've given you three examples files in the `texts` directory. To keep the scope reasonable, you only need to work with these three plays.
All of the lines in the example files have a regular structure.

- The name of the play will always be the first line of the file.
- The act and scenes will always be identified by ACT and SCENE appearing at the beginning of a line.
- Character names appear at the beginning of a line.
- Lines that continue a speech begun by a character are always indented by a single tab (\t).

Using these facts, you should be able to parse out the acts, scenes, and character names as you read through each line in the file.

### *"Exit, pursued by a bear." - The Winter's Tale: III, iii*

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/2560px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg" width="50%" />

No individual part of this project is very hard, but you need to tie together lots of different elements to create the full application.

Tips:

- Start early! Don't wait until the last minute.
- Develop incrementally! Make small changes and observe their effects. Don't write more than a few lines of code without testing it.
- Respect the asynchronous nature of Node: when working with callback functions, you generally can't guarantee that the callbacks execute in any particular
order.
