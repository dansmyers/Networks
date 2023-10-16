# Sockets and Apps

<img src="https://preview.redd.it/wixamyrqxra01.png?auto=webp&s=98a0fbff565e2347baba7f5dd508b505988a8a71" width="50%" />

## Deliverables are due Friday 11/3

## Overview

We're continuing our journey up the protocol stack. We finished off the important details of IP in the run-up to the midterm, so this next unit deals with the upper-two layers of the standard Internet stack: TCP and applications, of which HTTP is the most important example. In particular, we're going to focus on the idea of HTTP as a building block for applications that exchange data over the Internet, which can include web pages, but also other kinds of application data.

The major project for this section is implementing a full-stack search engine for the plays of William Shakespeare. It's one of my favorites.


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

Therefore, you should focus on understanding the high-level picture of what TCP exists to accomplish and avoid getting bogged down in the technical details initially. Here are the relevant sections from Chapters 5 and 6 of the book:

- 5.1 is a short overview of UDP, which is a simple lightweight transport layer protocol. UDP is basically just a wrapper for IP datagrams.

- 5.2 is the main content related to TCP. There are several sections of interest here. Read the beginning, then focus on the three-way handshake section. Don't try to memorize the state diagram. A significant chunk of the section is on the Sliding Window Algorithm, which controls how much data the sender is allowed to have in transmission without overwhelming the receiver. Read through it, but don't worry about the technical details and calculations: focus on the key problem of managing how much data is transmitted without overwhelming the receiver. Skim the section on adaptive retransmission.

- Skip 5.3 and 5.4.

- Read all of 6.3. The most important idea here is the concept of gradually increasing the window size ("additive increase") and then cutting back aggressively when congestion seems to be a problem ("multiplicative decrease").


## HTTP and REST

Read 9.1 on traditional applications, which includes discussions of HTTP and e-mail.

REST stands for *REpresentational State Transfer*, which is unfortunately not helpful for understanding why it's interesting and useful.

Read [this article](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f) and its second part, which discusses the six REST constraints.

Technically, REST and HTTP are two different things, and it's possible to have a RESTful application that doesn't use HTTP. **In practice**, however,

- Each server resource in a RESTful application corresponds to an HTTP endpoint.
- Clients and servers exchange requests using HTTP.
- The bodies of the HTTP messages contain data in JSON, XML, or some other structured text format.

The major project for this unit involves implementing a REST-based application using Express, a server-side JavaScript framework built on top of the Node engine that we've previously used for JS programming. You'll practice building an application that can send requests and receive back complex data using HTTP and JSON. After completing this project, you should have a good idea of how to build interactive web applications.
