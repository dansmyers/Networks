# Sprint 4 &ndash; TCP and Sockets


## Starts Wednesday, 10/28
## Deliverables and quiz are due on Wednesday, 11/11

### Collaborators

Oliver (me), Griffin, Jacob, Lee, Alex

## Overview and Goals

We've now (mostly) polished off the lower levels of the protocol stack. Our goal for this unit is to get familiar with two important protocols at the Transport and Application Layers: **TCP** and **HTTP**.

You might recall that TCP/IP is the heart of the Internet. TCP is a transport layer protocol that sits on top of IP and helps provide reliable delivery and flow control features that were not part of IP's design.

HTTP is going to be our most important example of a application layer protocol, since we're using it to facilitate communication in our web programming projects.

By the end of this unit, you'll be familiar with:

- TCP, including how connections are setup, reliable delivery, and flow control.

- HTTP, including message formats and error codes.

- The concept of REST and its role in building web APIs.

- The C sockets interface for network programming.

## Deliverables and Quiz

There is only one project for this unit: **build a web server using C sockets**.

You're going to finish a program that can receive HTTP requests, parse them, and return back an appropriate HTTP response message. I've given you some code to get started,
so the project will mostly be about revisiting some key concepts from C, like file interactions, threads, string processing, and memory management. You'll also get to learn 
about **sockets**, which are C's abstraction for network programming.


Remember that you may work freely with the members of your team and you may use any resources that you find helpful to
complete the project. **Please list the names of you collaborators in the project document**.

The quiz and reflective write-up will be done **online** on **Wednesday, November 11**, which will also be the release day for the next sprint's material. The quiz will be 
**individual** (not team) but will be **open everything**: you can use the sprint resources, your notes, and online resources. Remember to abide by the Honor Code 
and ask me if you have questions about what is an acceptable resource!

**Remember that you have only two weeks to complete this sprint, so don't procrastinate!**

## Submission Instructions

- Fork this repo (dansmyers/Networks) using the "Fork" button on the repo homepage. Forking creates a copy of the repo under your own GitHub account.

- Do your work, uploading your files into your repo.

- Submit a pull request to me using the "Pull Request" button on the front page of your repo. The pull request will create an entry that allows me to review your new files.

- I'll use the pull request commenting feature to provide feedback on your work.

## What You Need to Learn

At the end of this sprint, you will be able to:

- Describe the goals of TCP.

- Discuss UDP as a lighter-weight alternative to TCP and explain situations where UDP might be useful.

- Summarize the three-way handshake approach used to set up TCP connections.

- Explain how TCP implements reliable delivery, including the use of sequence numbers, ACK packets, and what happens when packets are droppped.

- The sliding window algorithm for implementing flow control.

- The concept of additive increase and multiplicative decrease and its role in flow control.

- HTTP message formats, methods, and error codes.

- REST and the role of HTTP in exchanging information for web applications and building APIs.


## Resources

## TCP

Here's the challenge with TCP: it's both *not very complicated* and *super complicated* at the same time.

- The basic problems that TCP exists to solve and the solutions it takes to those problems are relatively easy to understand.

- But the technical details of implementing those solutions and getting all of the edge cases correct are complex.

Therefore, you should focus on understanding the high-level picture of what TCP exists to accomplish and avoid getting bogged down in the technical details initially.

Here are the relevant sections from Chapters 5 and 6 of the book:

- 5.1 is a short overview of UDP, which is a simple lightweight transport layer protocol. UDP is basically just a wrapper for IP datagrams.

- 5.2 is the main content related to TCP. There are several sections of interest here. Read the beginning, then focus on the three-way handshake section. The state diagram
is not important. A significant chunk of the section is on the Sliding Window Algorithm, which controls how much data the sender is allowed to have in transmission without overwhelming the receiver. Read through it, but don't worry about the technical details and calculations: focus on the key problem of managing how much data is transmitted
without overwhelming the receiver. Skim the section on adaptive retransmission.

- Skip 5.3 and 5.4.

- Read all of 6.3. The most important idea here is the concept of gradually increasing the window size ("additive increase") and then cutting back aggressively when congestion
seems to be a problem ("multiplicative decrease").


## HTTP and REST

Read 9.1 on traditional applications, which includes discussions of HTTP and e-mail.

REST stands for *REpresentational State Transfer*, which is unfortunately not helpful for understanding why it's interesting and useful.

Read [this article](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f) and its second part, which discusses the
six REST constraints.

Technically, REST and HTTP are two different things, and it's possible to have a RESTful application that doesn't use HTTP. **In practice**, however,

- Each server resource in a RESTful application corresponds to an HTTP endpoint.

- Clients and servers exchange requests using HTTP.

- The bodies of the HTTP messages contain data in JSON, XML, or some other structured text format.


## C Sockets and Web Servers

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1920px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg" width="70%" />

*Plato and Aristotle both affirmed that programming in C promotes virtue and purges weakness from the mind and body*.

The best available guide for learning socket programming is [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/html/). Start with the early chapters on
*What is a socket?* and build your way up to the example client and server programs. You don't need to worry about the advanced techniques (blocking, etc.) described in the
later sections.

We have two examples for setting up and using sockets in the `Examples` directory. We'll go through these in class.

The best aid for completing the web server is the code that's already given to you in the starting file. If you look, you'll see that there are already examples in place of how
to do most of the things you need to complete the project. You don't need to write *that much* code, but you may need to refresh your memory about how to write in C and spend
some time decoding what's already in the program.




