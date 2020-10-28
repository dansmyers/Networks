# Sprint 3 &ndash; Internet Protocol

<img src="https://imgs.xkcd.com/comics/campfire.png" width="30%" />

## Starts Wednesday, 10/14
## Deliverables and quiz are due on Wednesday, 10/28

## Overview and Goals

We're continuing our journey up the protocol stack. Now, we're going to transition to talking about the heart of the Internet: **IP, the Internet Protocol**.

The first version of IP was introduced in 1974 by Robert Kahn and Vint Cerf and was created to solve the problem of **internetworking**. Our previous unit discussed
local networks built from one basic networking technology, like Ethernet. Internetworking is the problem of transmitting data **between** local networks, analogous
to the concept of a interstate highway as one that goes between states. IP is the protocol that underlies the big, global capital-I Internet, but it's also possible
to create independent internetworks that aren't connected to the main Internet.

General internetworking is hard because the underlying local networks may use any technology and be located anywhere in the world. IP solves two important problems:

- It establishes the system of **IP addresses** used to identify hosts anywhere on the big global Internet.

- It defines policies for routing and forwarding that allow packets to make their way from sources to destinations at global scale, all without requiring any entity to
have global knowledge of the entire Internet.

In this sprint, we're going to focus on the core operations of IP:

- The original design goals of IP and the concept of classes of IP addresses.

- The basic IP forwarding algorithm and two strategies for building routing tables: distance-vector and link-state.

- Subnetting and classless routing, which are both strategies for using the IP address space more efficiently.

We're also going to be continuing our work on web programming by introducing server-side programming using Node.js and the Express framework. This will require learning
a little bit about information exchange between clients and servers using HTTP.

## Deliverables and Quiz

Complete the problems in `Deliverables`. Remember that you may work freely with the members of your team and you may use any resources that you find helpful to
complete the project. **Please list the names of you collaborators in the project document**.

The quiz and reflective write-up will be done **online** on **Wednesday, October 28**, which will also be the release day for the next sprint's material. The quiz will be 
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

- Describe the design goals of IP

- Discuss the three original classes of IP addresses, and why classed addressing is a limit to scalability

- Explain how DNS is involved in translating human-readable names into IP addresses

- Know the basic IP forwarding algorithm and explain how a router uses a forwarding table to determine the next hop for a packet

- Use the Routing Information Protocol (RIP) to build forwarding tables for small networks

- Discuss the Open Shortest Path First (OSPF) routing protocol and how it's different from RIP

- Explain the Address Resolution Protocol (ARP) and how it's used to connect between IP and link-layer protocols

- Apply classless interdomain routing (CIDR) and subnetting and explain how they can be used to address the problem of scalability in the IP address space

- Compare and constrast software defined networking with older models of network architecture. 

You will also be able to

- Write server-side code using the Express framework and Node.js

- Send requests from a client page to a server using `XmlHttpRequest` and receive responses in the JSON format

- Incorporate data from server responses into your client-side page

## Resources

### IP

The main resource for studying IP is [Chapter 3 of the textbook](https://book.systemsapproach.org/internetworking.html). This chapter contains **a lot** of information. Here is a breakdown of the important sections:

- 3.1 and 3.2 deal with building bigger local networks using switching. You can skip these, or skim them lightly. We'll talk about switching in class, but there won't be any
homework or quiz questions about it.

- Everything in the monster section of 3.3, except for the late parts on DHCP and ICMP. We will talk through all of the core ideas in class, so take it slow. Reading this
section will give you good practice in picking out the high-level important concepts from the pickier details that surround them. In particular, focus on: the IP datagram
format, the three classes of global addresses, the basic forwarding algorithm, and the concepts of CIDR and subnetting.

- 3.4 discusses distributed routing protocols. We'll spend most of our time on the first one, distance-vector routing. Focus on the examples. You do not need to read the
section on implementation. We'll discuss the basic concept of OSPF and link-state routing, but there won't be any questions about it.

- 3.5 is about switch and router implementation. Focus on the "Hardware Switches" section and the concept of a **white-box** switch and the section on "Software Defined 
Networks". The key concept of SDN is separating the software logic that runs the network and makes routing and access decisions (the "control plane" in SDN language) from the 
hardware that actually does the work of forwarding packets (the "data plane"). [This video](https://www.youtube.com/watch?v=DiChnu_PAzA) is kind of dry, but gives a good
non-hyped overview of SDN.


### Full-Stack Development

There are two labs in the `Examples` directory.

- The first shows you how to write a basic Express app that can respond to requests and serve back a page.

- The second is more complex, and shows you how to set up an app that can receive a request from the server and respond with data in the JSON format.

After completing both labs you should be able to complete the programming project for this unit.

