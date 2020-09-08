# The OSI Model of Networking and the Architecture of the Internet

## Introduction

<img src="https://vignette.wikia.nocookie.net/tacobell/images/c/cf/Pdp_7_layer_burrito.jpg/revision/latest?cb=20100905052511" width="50%" />

The OSI 7-layer model is arguably the most common **reference model** of computer network architecture. OSI stands for "Open Standards Initiative" and the model was introduced
in the early 1980's as part of an project led by the International Organization for Standards (ISO). (This should serve as an introduction to two ideas that will keep coming up 
in this course: first, standards are really important in the networking world and second, acronyms are even more important).

The OSI model is not a real guideline for building networks. Rather, it provides an **abstract description** of the different features that must be implemented to construct a practical network. We're interested in the OSI model for three reasons:

1. It gives you a holistic overview of how networks are implemented. If you start by understanding the entire model at a high level, you'll be better prepared to dig into the details of the protocols at each level. 

2. It provides a common frame of reference for talking about the purpose of different protocols that make up a modern network. If I tell you, for example, and 802.11 (the technical name for Wi-Fi) is a link layer protocol, I'm telling you something specific about its role and purpose in a network. The terminology defined by the OSI model is a 
standard part of the field.

3. We can map the protocols of the modern Internet onto the layers of the OSI model in a straighforward way.

## The Layers

### Overview


This table (similar to the one in [the Wikipedia article](https://en.wikipedia.org/wiki/OSI_model)) shows the seven layers. The convention is to number the bottom layer (Physical) as layer 1 and the top layer (Applications) as layer 7.

For our purposes, layers 5 and 6 are not that important and tend to be lumped in with layer 7.


| Layer       | Name        | Purpose     | Examples |
| ----------- | ----------- | ----------- | ----------- |
| 7      | Application       | Protocols used by user-level applications            | HTTP, FTP, SMTP, SSH |
| 6      | Presentation      | Preparing user-level data for transmission by lower layers            | Compression and encryption |
| 5      | Session      | Managing and maintaining context for long-running communication sessions            | Timing and ordering of packets in streaming media |
| 4      | Transport       | Providing reliable end-to-end communication           | TCP |
| 3      | Internetwork       | Addressing and routing to transmit data between networks at global scale           | IP |
| 2      | Link       | Managing shared access to a communication link            | Ethernet, Wi-Fi, Bluetooth, 5G|
| 1      | Physical       | Transmitting bits on physical links            | Encoding, error correction|



### Layer 1: the Physical Layer

The simplest kind of computer network is a direct link between two hosts.

```
 ----------------                        ----------------
|                |        Link          |                |
|   Computer A   |----------------------|   Computer B   |
|                |                      |                |
 ----------------                        ----------------
```

There are many different kinds of links that can be used to connect hosts, but the most common are

- Wires
- Radio transmissions
- Fiber optic cables (frequently used for high-bandwidth backbone links)

For any type of link that we might choose to use for a direct connection, a few problems immediately emerge.

First, we need a way to transmit bits over the link. **In a computer network, everything that's being transmitted is ultimately just sequences of bits**.
The exact way to do this depends on the nature of the link and its enginering implementation. For example, wired links typically transmit bits by controlling
the voltage on the wire, radio links can manipulate the strength of the radio transmission, and fiber optics control the strength of a laser pulse on the
optical cable. 

We're not going to worry about the details of how link transmissions are actually implemented, except to say that a lot of fundamental physics
and engineering goes in to making it possible. For example, if you choose to use a radio-based link, you have to make decisions about the transmitter and
receiver designs, frequency bands to transmit on, power levels, and all kinds of other considerations.

Second, Physical-layer transmissions are also vulnerable to noise and data corruption For example, electrical interference on a wire can easily lead to **bit flips**, where
a received bit has the opposite value that it should have (a bit that should be 0 is read as 1, or vice-versa).

To protect against these kinds of errors, it's common to embed an **error correcting code** (ECC) within a transmission. The ECC is a few extra bits (sometimes just one bit)
that can be used to determine if the received data is correct, or was possibly corrupted during transmission. Simple ECCs might allow the receiver to detect if one or a few bits 
were flipped. More sophisticated ECCs can identify which bits were affected and possible allow recovery of the correct data without requiring a retransmission. ECCs are 
interesting because they require careful evaluation of tradeoffs: more bits will encode more information about the data, which can increase the number and kinds of errors that 
can be identified, but at the cost of making every transmission larger and slower.

When we talk about the Physical layer, we'll be primarily interested in getting an overview of the technical details of encoding and framing sequences of bits for transmission
as well as a introduction to error correcting codes.

### Layer 2: the Link Layer

Consider a wireless network, with a number of hosts (like your laptops) all communicating via radio links with a base station.

```
                               o              o 
                               |              |
 ----------------              ----------------              ----------------
|                |            |                |            |                |
|   Computer A   |~~~~~~~~~~~~|  Base station  |~~~~~~~~~~~~|   Computer B   |
|                |            |                |            |                |
 ----------------              ----------------              ----------------
 
 
 ~~~~~ squiggles ~~~~~ mean radio waves
```

Suppose both hosts A and B try to transmit to the base station at the same time. What might happen?

Well, the radio signals might interfere with each other, resulting in a garbled transmission arriving at the base station. You've experienced this if you've ever listened to the
radio on a long drive and passed through the area where two stations broadcasting on the same frequency overlap with each other.

Link layer protocols solve the problem of allowing multiple hosts to **share access** to the same underlying communication medium. The Wi-Fi standard solves this
problem for radio links by introducing rules that allow hosts to transmit without causing unacceptable interference.

Other important protocols at the link layer include Ethernet for wired links (very common in datacenters and campus networks), Bluetooth for small devices, and the various
cellular protocols: 4G, LTE, 5G, etc.

When we study the Link layer, we'll look at how Ethernet and Wi-Fi (as important representative protocols) solve the problem of simultaneous transmission and resource sharing.

### Layer 3: the Internetworking Layer

Layers 1 and 2 deal with transmitting over **local networks**: a group of hosts in a relatively small geographical area that are connected by one basic networking technology.
To go bigger, we need to ability to send data **between networks**.

An **internetwork** is a collection of multiple local networks. The prefix *inter-* has the meaning of *between*, like how the interstate highways connect between different states. You're already familiar with one internetwork: the big capital-I global Internet, which connects millions of different local networks all around the world. It's possible, though, to build internetworks that aren't connected to the big Internet; the military and government agencies, for example, all manage their own internets to share
classified information.

There is one main layer 3 protocol: **IP, the Internet Protocol**. IP was originally designed in the 1970's to solve the problem of transmitting data between local networks of
many different types, at global scale.

IP gets involved when one host wants to send data to another that isn't on its immediate local network. For example, when you make a
web search request, you have to send your query to a data center managed by the search engine company, where your request can be processed. Once an answer is obtained, a
host in the data center will send a formatted response back to you. Both of those steps might require traversing thousands of miles of links joining together dozens
of different networks.

We're going to spend most of our time on two of IP's features:

- **Addressing**: if I want to send a request to another host on the Internet, how do I know where that host is located? **IP addresses** allow a (potentially) unique identifier for every host on the Internet. You're probably familiar with IP addresses displayed as four numbers, like 172.217.2.142. We'll talk about how IP addresses have evolved over time as the Internet has grown.

- **Routing**: if I want to send data around the global Internet, how do I find a path from a starting point to a destination IP address? This is complicated, because the Internet is in constant flux as links and hosts join, go down, or become congested. The Internet is **decentralized** &ndash; there is no single view or entity that has global 
knowledge of every host and link &ndash; so successful routing has to be based on only limited information.

IP has been incredibly successful. There have been some tweaks and extensions along the way, the but core of the protocol is still similar to what was originally introduced
in the 1970s. In particular, IP has been highly robust to changes in local networking technologies. We've been able to add new networking technologies, like cellular phones,
into the Internet without needing to rework the implementation of IP. It's popular to say that **IP runs over anything**, and it's claimed that you could even use IP on top of a local network of carrier pigeons.


### Layer 4: the Transport Layer

IP has many virtues, including scalability and support for heterogeneous local networks, but it does not care about performance. In fact, the designers of IP decided that the
protocol would make **no performance guarantees whatsoever**, including no assurances that data sent over IP would even be dellivered to its intended destination. It's common
to say that IP provides **best effort** service; it will do the best it can to deliver your data, but no promises are made or implied.

(Aside: this might seem like a strange decision, but remember that one of the core design goals of IP was to run over anything. You can't make detailed guarantees about
performance or reliability if you want to be able to run over any potentially low-quality link.)

Therefore, it's common to pair IP with a higher-level protocol that provides **end-to-end connectivity** and ensures reliable transmission. In the modern Internet, the
most important transport layer protocol is **TCP, the Transmission Control Protocol**.

**TCP/IP is the heart of the Internet**.

- IP provides a system of addressing and routing that allows hosts anywhere in the world to communicate with each other.

- TCP provides a measure of reliability to ensure that data actually gets transmitted and also provides some rules to stop links from becoming too congested.

Here's another view of the OSI model that compares it to the TCP/IP-based stack of the modern Internet:

<img src="https://miro.medium.com/max/1190/1*hUb4hQKbQkw4fo8wkcAO-w.gif" width="50%" />

(Source: [this article by Ian Ames](https://medium.com/software-engineering-roundup/tcp-ip-protocol-suite-ec7ed4888d5d))
 
### Layer 7: the Application Layer

TCP/IP is, as the old-timers might say, the cat's pajamas.

<img src="https://pyxis.nymag.com/v1/imgs/334/5a2/3fe5b39b2e8b77f58a64bdb7142db46b96-15-state-department-cat-picture.2x.rsquare.w700.jpg" width="50%" />

(Source: ["State Department Accidentally Sends Out Very Good Photo of Cat in Pajamas"](https://www.thecut.com/2018/10/state-department-accidentally-sends-out-cat-pajama-photo.html))

However, all of the work at Layers 1-4 is really just building a mechanism for shoving data between hosts and around the world. **Now we can have some fun**. Layer 7 is all of the user-facing application protocols that are used to implement that actual services we build on top of the lower-level networking protocols. Like, how about:

- E-mail
- Online games
- Cloud services
- Streaming media
- Video conferencing
- The entire freaking World-Wide Web

Here, **protocol** refers to an agreed upon way for hosts to exchange requests and format responses.

For example, your web browser uses the **Hypertext Transfer Protocol** (HTTP)
to fetch pages from web servers. HTTP describes the format for web page requests, what information will be exchanged in each request, how the page data should be encoded, and a
bunch of other stuff like codes for common errors (you've probably seen a 404 error message before: that's the HTTP error code for when a page can't be found). It will turn
out, a little later in the course, that HTTP can be harnessed to exchange all kinds of information other than web pages, which makes it an important building block for
complex web applications.

There are all kinds of other application-layer protocols. Here are a few commonly used ones:

| Protocol | Full Name | Purpose |
| -------- | --------- | ------- |
| HTTP | Hypertext Transfer Protocol | Fetch web pages from web servers, enable client/server information exchange |
| FTP |File Transfer Protoocl | Downloading files from a server |
| SMTP | Simple Mail Transfer Protocol | E-mail |
| SSH | Secure Shell | Secure log-in to a remote server |
| DHCP | Dynamic Host Configuration Protocol | Automatically assign your computer a new IP address when you join a network |
| DNS | Domain Name System | Maps human-readable website names (like github.com) to their underlying IP addresses |
| Bitcoin | The protocol that describes communications in the Bitcoin network | Fake Internet money | 


### Layers 5 and 6: the Session and Presentation Layers

Layers 5 and 6 are not that important from our perspective because they tend to get lumped together with Layer 7 as part of the overall implementation of a user-facing
application. In the original OSI model, the vision was that the Presentation and Session layers would play a role in connecting user-level applications to the lower-level
part of the networking stack.

The **Presentation layer**  takes application data and do any additonal work required to prepare it for transmission. In practice, **compression** and **encryption** are the two most important activites associated with this layer. This could also include transforming data between encoding formats if necessary.

The **Session layer** helps applications maintain context when exchanging a series of messages with the same server. One example is video conferencing or streaming media, where
it's necessary to carefully coordinate the sequencing and timing of each data transmission to give a good user experience. In practice, the session layer isn't really a 
stand-alone protocol and it tends to get lumped in as an implementation detail with either the application or the transport layer.
