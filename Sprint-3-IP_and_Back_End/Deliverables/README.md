# Sprint 3 &ndash; Deliverables

## Honor Code

“On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this work."

## Team Members

Randy, Oliver, Griffin, Jacob

## IP Questions

1. What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?
```
The reason why it is unreliable stem from the fact the protocol does not provide any functionality for error recovering for datagrams that are either duplicated, lost or arrive to the remote host in another order than they are send. If no such errors occur in the physical layer, the IP protocol guarantees that the transmission is terminated successfully.  This is consistent with the design goals of IP because
it is designed to run over everything but does not guarantee lower level networks working.
```

2. Describe IP's *best-effort* service model.
```
The best effort service model by IP is because IP is designed to run over anything. By running
over anything they can not guarantee running over lower level networks.
```

3. Recall that every Ethernet adaptor has a unique 48-bit MAC address assigned by the manufacturer and burned into its ROM. If these MAC addresses are unique, why does the Internet Protocol need to use IP addresses to identify the source and destination of IP datagrams?
```
MAC Addresses handle the physical connection from computer to computer while IP Addresses handle the logical routeable connection from both computer to computer AND network to network.
```

4. Suppose you are given an IP address with the classless network prefix 128.96.16/20. What is the maximum number of hosts that can be attached to this network, assuming one unique 32-bit IP address per host?
```
128.96.16
10000000 01100000 0001 0000

20 bits would be the network part 12 bits would be the host part
So 2^12 = 4096 hosts
```


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

```
Node          Best Distance           Path
B                 3                   A -> B
D                 5                   A -> D
C                 9                   A -> B -> C
E                 11                  A -> B -> E
F                 13                  A -> B -> E -> F
```

## RIP

Using the graph above, fill in the table below to show each hosts's distance vector before the routing algorithm executes. Then create two more tables showing
the updated distance vectors after the first two rounds of message exchanges.

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |     |  5  |     |     |
|  B  |  3  |  0  |  6  |     |  8  |     |
|  C  |     |  6  |  0  |     |     |     |
|  D  |  5  |     |     |  0  |  7  |     |
|  E  |     |  8  |     |  7  |  0  |  2  |
|  F  |     |     |     |     |  2  |  0  |

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  9  |  5  |  11 |     |
|  B  |  3  |  0  |  6  |  8  |  8  |  10 |
|  C  |  9  |  6  |  0  |     |  14 |     |
|  D  |  5  |  8  |     |  0  |  7  |  9  |
|  E  |  11 |  8  | 14  |  7  |  0  |  2  |
|  F  |     |  10 |     |  9  |  2  |  0  |

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  9  |  5  |  11 |  13 |
|  B  |  3  |  0  |  6  |  8  |  8  |  10 |
|  C  |  9  |  6  |  0  |  14 |  14 |  16 |
|  D  |  5  |  8  | 14  |  0  |  7  |  9  |
|  E  |  11 |  8  | 14  |  7  |  0  |  2  |
|  F  |  13 |  10 | 16  |  9  |  2  |  0  |



## SDN

The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?

```
The control plane is the part of the software that configures and shuts down the data plane. By contrast, the data plane (the data plane is also sometimes referred to as the forwarding plane) is the part of the software that processes the data requests.

The two are split because of the need of high speed packet processing.  It is better to have two things working towards a goal instead of bogging down one system to do everything.

Advantagees of SDN are traffic programmability, agility and the ability to create policy driven network supervision and implementing network automation. SDN also allows the creation of a framework to support more data-intensive applications like big data and virtualization.
```


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
