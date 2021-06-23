# Sprint 3 &ndash; Deliverables

## IP Questions

1. What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?

- While IP is used to get datagrams to their network IP assumes that the network can get the datagrams the rest of the way to the correct device on the network. This is consistent with IP's design goal because it lowers the ammount of packet and data moving one single part of the networking process is doing, making sure there is never one fault point in the system.

2. Describe IP's *best-effort* service model.

- IP will do its best to get packets to the destination, but it can not guarantee that they will be delivered, this is why it is called best-effort, if packets are lost during delivery IP takes not steps to attempt recovery of these packets

3. Recall that every Ethernet adaptor has a unique 48-bit MAC address assigned by the manufacturer and burned into its ROM. If these MAC addresses are unique, why does the Internet Protocol need to use IP addresses to identify the source and destination of IP datagrams?

- We need IP to maintain a connection between the senders network and the destinations network, since a device can change the network which it ios connected to we need to hvae a way to find the network first then the device within that natwork

4. Suppose you are given an IP address with the classless network prefix 128.96.16/20. What is the maximum number of hosts that can be attached to this network, assuming one unique 32-bit IP address per host?

- 4096


## Dijkstra

<img src="https://i.imgflip.com/2bj98l.jpg" width="30%" />

For the graph shown below, use Dijkstra’s algorithm to find the shortest path and path length from node A to each of the other nodes.

```
     3          6 
A----------B---------C 
|          |
|5         | 8 
|    7     |
D----------E
           | 
           |2 
           |
           F
```
#### Answer:

|     |  Shortest Path  |  Path Length  |
|-----|-----------------|---------------|
|  A  |       {A}       |       0       |
|  B  |     {A, B}      |       3       |
|  C  |    {A, B, C}    |       9       |
|  D  |     {A, D}      |       5       |
|  E  |    {A, B, E}    |       11      |
|  F  |  {A, B, E, F}   |       13      |

## RIP

Using the graph above, fill in the table below to show each hosts's distance vector before the routing algorithm executes. Then create two more tables showing
the updated distance vectors after the first two rounds of message exchanges.

|From A |  A  |  B  |  C  |  D  |  E  |  F  |
|-------|-----|-----|-----|-----|-----|-----|
|  A    |  0  |     |     |     |     |     |
|  B    |     |  3  |     |     |     |     |
|  C    |     |     |     |     |     |     |
|  D    |     |     |     |  5  |     |     |
|  E    |     |     |     |     |     |     |
|  F    |     |     |     |     |     |     |    

|From A |  A  |  B  |  C  |  D  |  E  |  F  |
|-------|-----|-----|-----|-----|-----|-----|
|  A    |  0  |     |     |     |     |     |
|  B    |     |  3  |     |     |     |     |
|  C    |     |  9  |     |     |     |     |
|  D    |     |     |     |  5  |     |     |
|  E    |     | 11  |     |  12  |     |     |
|  F    |     |     |     |     |     |     |

|From A |  A  |  B  |  C  |  D  |  E  |  F  |
|-------|-----|-----|-----|-----|-----|-----|
|  A    |  0  |     |     |     |     |     |
|  B    |     |  3  |     |     |  20 |     |
|  C    |     |  9  |     |     |     |     |
|  D    |     |     |     |  5  | 18 |     |
|  E    |     | 11  |     |  12  |     |     |
|  F    |     |     |     |     | 14/13  |     |

## SDN

The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?

#### Answers

- Control Plane: The control plane is the part of the network which determines how data is transfered from one place to another.

- Data Plane: The data plane is the part of the network which actually does the transmition, following the rules set by the control plane

- We would want to seperate these two so that we can maintain a centralized control plane for a large network, allowing someone like an IT Admin to configure the control plane of multiple devices from a single place (ie. a single laptop/computer)

- SDN has a few advantages, firstly the centralization previously described, on top of that SDN allows for ease of use when scaling a network, it does this by maintaining that centralized control plane allowing for new network devices to be setup without needing to configure a brand new control plane. Also due to the centralized nature of SDN, network admins have much better control over the security of the network since all of it can be changed and configured from one space which guarantees normalized security across the entire network.


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
