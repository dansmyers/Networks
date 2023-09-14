# Sprint 2 &ndash; The Adventure of Links

<img src="https://upload.wikimedia.org/wikipedia/en/4/44/I_am_Error.png" width="50%" />

*Should have implemented parity checking*.

## Starts Thursday, 9/14
## Deliverables due Friday, 9/29

## Overview and Goals

The previous sprint gave you an overview of computer networks. You should now be familiar, in at least a high-level way, with the different layers and protocols that make up
the Internet. We also introduced front-end web development using HTML/CSS and the Bootstrap framework.

This sprint has two main pieces of content:

1. Learning about the lower levels of the network stack: the physical and link layers.
2. Incorporating JavaScript to make your web pages interactive.

## Deliverables

Complete the problems in `Deliverables`. Remember that you may work freely with the members of your team and you may use any resources that you find helpful to
complete the project. **Please list the names of you collaborators in the project document**.

**This unit has more material than the last one, so don't procrastinate!**

## Submission Instructions

Complete your work in the Assignment 2 repository on Replit. Upload any written problems in a clearly labeled file in your workspace.

## Learning Outcomes

At the end of this sprint, you will be able to:

- Discuss issues of transmission in physical links, including bit-level encodings.

- Understand and apply XOR parity checks and 2-D XOR parity.

- Explain how collision detection and link sharing are implemented in Ethernet.

- Explain how collision avoidance and link sharing are implemented in 802.11 (Wi-Fi).

- Use the basic elements of JavaScript programming: variables, conditionals, functions, loops, etc.

- Embed JavaScript onto a web page and use it to manipulate the page in response to user actions.

- Explain the browser's Document Object Model (DOM) and use JavaScript to interact with it.


## What You Need to Learn

- **The basic issue of bit-level transmissions on physical links**: how can the receiver successfully detect changes in the stream of bits it's receiving? Understand two schemes
for transmitting bits: **NRZ encoding** and **4B/5B encoding**.

- The use of parity checks to detect (and possibly repair) transmission errors. You should be familiar with **basic one-bit XOR parity** and the **two-dimensional XOR
parity check**.

- The **physical layout** of traditional shared-wire Ethernet networks.

- What it means to say that Ethernet is a **Carrier Sense, Multiple Access / Collision Detection (CSMA/CD)** protocol.

- The concept of a **link-level address** that is used to uniquely identify every device on an Ethernet network.

- How Ethernet hosts can **detect collisions** and how they use the strategy of **retransmission with exponential backoff**.

- How the problem of **collision avoidance** is more complicated in wireless networks than in wired networks. The **"hidden node"** problem.

- How 802.11 uses **acknowledgments and RTS/CTS messages** to avoid collisions between hosts.

- Writing **basic JavaScript programs** that can declare variables, use functions, and perform calculations. We're mostly focused on writing browser-based programs, so I won't 
require you to write a large number of stand-alone JavaScript programs. We'll do several examples together in class to point out the details of JS syntax and the ways that 
JavaScript is both like and unlike other languages you may have used.

- Incorporating JavaScript into web pages and **triggering JavaScript functions** when the user performs actions on the page.

- Using JS to interact with the browser's **Document Object Model**, which allows you to dynamically manipulate the contents of a web page.


## Resources

## Physical and Link Layer

Our main resource here is [Chapter 2 of the Peterson and Davie text](https://book.systemsapproach.org/direct.html). As with the material in Chapter 1, some of this content is
detailed and can be skipped on your first read-through. **I'm planning to discuss Ethernet and Wi-fi in class**.

Here's a plan that hits the important points.

- Read 2.1, which is an intro to direct links. You don't need to memorize any of the numbers. The key points are that there are many different kinds of links that all operate
by manipulating some aspect of the electromagnetic spectrum. Most users interact with the Internet through a combination of wireless radio links, wired cables, and backbone
fiber optic links.

- 2.2 talks about the issue of encoding a sequence of bits in order to transmit it over a link. The simplest strategy is to encode a 0 bit as a "low" signal on the link and a
1 bit as a "high" signal. This is called, cryptically, "non-return to zero encoding" (NRZ). It turns out that this strategy doesn't work well in practice, because long strings
of 0's or 1's will keep the link set at the same value, which makes it hard for the receiver to distinguish bit transitions. The goal of an encoding strategy is to take the real
data that you want to transmit and represent it as a **different string of bits** so that repeated values are minimized. Focus on the **4B/5B encoding** strategy and make
sure that you could take a short bit sequence and encode it using the rules in Table 3. You don't need to understand Manchester encoding.

- 2.3 talks about **framing**, which is the process of wrapping data in a header (and possible a footer) before sending it on a link. **You can skip this section**, other than
being aware that framing is a thing that happens.

- 2.4 is about error detection and discusses two techniques: the Internet checksum and the cyclic redundancy check (CRC). These are both complicated, so I want you to learn 
**two simpler schemes that use XOR parity**. Look in the `Notes` directory for my write-up, do the examples there, then come back and read the section on the Internet checksum. 
I won't make you calculate checksums, but I will ask you to calculate 1-D and 2-D XOR parity. You don't need to read the CRC section.

- Skip 2.5.

- 2.6 introduces **Ethernet**. Read the first two sections, which describe the CSMA/CD concept and the original vision of Ethernet as a shared wire where all of the connected 
hosts can communicate with each other. The most important part of this section is the transmitter algorithm: Ethernet hosts try to transmit as soon as they have data and sense 
that the line is idle; there is not waiting or negotiating to acquire permission to send. Because the link is shared by all hosts, a sender can detect if it's transmission 
collides with another host's message. In the event of a collision hosts use an **exponential backoff** strategy to wait for a moment before retransmitting. You don't need to 
memorize the formulas or parameters. There is also a section in the middle that talks about the reasoning for the maximum size of a shared-wire Ethernet network: read it, but 
I'm not going to ask questions about it.

- 2.7 covers the **IEEE 802.11** wireless link standard, popularly known as Wi-fi. Focus on the "Collision Avoidance" section, which explains how wireless transmission is
more complicated than Ethernet and discusses the use of ACKs and RTS/CTS packets.




## JavaScript

Here's my standard line about JavaScript: it's like that episode of the original *Star Trek* 
[where they go to the Mirror Universe](https://en.wikipedia.org/wiki/Mirror,_Mirror_(Star_Trek:_The_Original_Series)) and **Spock has a beard**. Programming in JavaScript seems similar to other languages, but it's still **just slightly wrong** compared to what you're used to. In particular, variable declarations,
comparisons, arrays, and objects are quite a bit different in JS compared to what you're familiar with in Java or even Python. 

<img src="https://vignette.wikia.nocookie.net/memoryalpha/images/a/a7/Spock_%28mirror%29.jpg/revision/latest?cb=20090220220251&path-prefix=en" width="50%" />

Here's another metaphor: JavaScript is like a **cool permissive parent** that will let you get away with **all kinds of stuff that you really shouldn't be allowed to do**. A big
part of successful JavaScript programming is protecting yourself from mistakes that the language should disallow, but doesn't.

First things first: what's the relationship between Java and JavaScript? [Take a look at the beginning of this article](https://auth0.com/blog/a-brief-history-of-javascript/),
which explains how JS was originally created to be a scripting language for the Netscape browser. Netscape did a deal with Sun, the creators of Java, which resulted in the
new browser scripting language being named JavaScript. As the article discusses, JS has some Java-like elements in its syntax, but its true intellectual heritage is from
older functional languages, notably Scheme. This is part of what I meant by *just slightly wrong*: you can go along thinking that JS is like a nice dynamic scripting version
of Java, until it's **not**.

In the present, the standardization of JS is managed by an international body called ECMA. The official standard description of JS is known as **ECMAScript**. One of the
challenges of JS is that the language has evolved over the years, moving from a simple "toy" language to a full-featured widely-used programming language, but the new 
streamlined ways of doing things coexist with the older ways.

### Core JS
Your main resource for learning JS will be the files in the `Examples` directory, which we'll go through together in class. Here are a few other resources

- For JS a quick overview of JS syntax, look at [Learn X in Y Minutes](https://learnxinyminutes.com/docs/javascript/)

- The [MDN resources for JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) are comprehensive and cover all of the basic features of the language. You don't 
need to read these before you get started, but consider bookmarking them as a future resource.

### The Document Object Model (DOM)
The DOM is your browser's representation of a loaded page. The DOM is organized like a tree, and every element on the page
corresponds to a DOM node. Every browser provides an API for interacting with the DOM using JavaScript. Using JavaScript functions, you can

- Create new page elements (which corresponds to adding new nodes to the DOM tree)
- Remove page elements (removing nodes from the tree)
- Manipulate the contents or properties of existing elements, which can be used to change the appearance of the page in response to user actions

Start by reading the [MDN page on manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents), then
look at the `Examples` directory.

By the end of this unit you should be comfortable with

- Giving an `id` to a page element
- Using `document.getElementById()` to select DOM nodes
- Updating the contents of an element using its `innerHTML` property
- Creating new nodes and adding them to the page
