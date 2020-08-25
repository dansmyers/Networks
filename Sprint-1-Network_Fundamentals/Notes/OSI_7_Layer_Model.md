# The OSI 7-Layer Model of Networking

<img src="https://vignette.wikia.nocookie.net/tacobell/images/c/cf/Pdp_7_layer_burrito.jpg/revision/latest?cb=20100905052511" width="50%" />

The OSI 7-layer model is arguably the most common **reference model** of computer network architecture. OSI stands for "Open Standards Initiative" and the model was introduced
in the early 1980's as part of an project led by the International Organization for Standards (ISO). (This should serve as an introduction to two ideas that will keep coming up 
in this course: first, standards are really important in the networking world and second, acronyms are even more important).

The OSI model is not a real guideline for building networks. Rather, as a reference model, it provides an **abstract description** of the different features that must be implemented to construct a practical network. We're interested in the OSI model for three reasons:

1. It gives you a holistic overview of how networks are implemented. If you start by understanding the entire model at a high level, you'll be better prepared to dig into the details of the protocols at each level. 

2. It provides a common frame of reference for talking about the purpose of different protocols that make up a modern network. If I tell you, for example, and 802.11 (the technical name for Wi-Fi) is a link layer protocol, I'm telling you something specific about its role and purpose in a network. The terminology defined by the OSI model is a 
standard part of the field.

3. We can map the protocols of the modern Internet onto the layers of the OSI model in a straighforward way.

## The Layers

This table (similar to the one in [the Wikipedia article](https://en.wikipedia.org/wiki/OSI_model)) shows the seven layers. The convention is to number the bottom layer (Physical) as Layer 1 and the top layer (Applications) as layer 7.

For our purposes, layers 5 and 6 are not that important and tend to be lumped in with layer 7.


| Layer       | Name        | Purpose     | Examples |
| ----------- | ----------- | ----------- | ----------- |
| 7      | Application       | Protocols used by with user-level applications            | HTTP, FTP, SMTP, SSH |
| 6      | Presentation      | Preparing user-level data for transmission by lower layers            | Compression and encryption |
| 5      | Session      | Managing and maintaing context for long-running communication sessions            | A web page that makes multiple requests to the same servers |
| 4      | Transport       | Providing reliable end-to-end communication           | TCP |
| 3      | Internetwork       | Addressing and routing to transmit data between networks at global scale           | IP |
| 2      | Link       | Managing shared access to a communication link            | Ethernet, 802.11 (wi-fi), Bluetooth, cellular |
| 1      | Physical       | Transmitting bits on physical links            | Encoding, error correction|



### Overview

### Layer 1: the Physical Layer

The simplest kind of computer network is a direct link between two hosts.

```
 ----------------                        ----------------
|                |        Link          |                |
|   Computer A   |----------------------|   Computer B   |
|                |                      |                |
 ----------------                        ----------------
```

There are many different kinds of links that can be used to connect hosts. The three most common are

- Wires
- Radio transmissions
- Fiber optic cables, frequently used for high-bandwidth backbone links

For any type of link that we might choose to use for a direct connection, a few problems immediately emerge.

First, we need a way to transmit bits over the link. **In a computer network, everything that's being transmitted is ultimately just sequences of bits**.
The exact way to do this depends on the nature of the link and its enginering implementation. For example, wired links typically transmit bits by controlling
the voltage on the wire, radio links can manipulate the strength of the radio transmission, and fiber optics control the strength of a laser pulse on the
optical cable. We're not going to worry about the details of how link transmissions are actually implemented, except to say that a lot of fundamental physics
and engineering goes in to making it possible. For example, if you choose to use a radio-based link, you have to make decisions about the transmitter and
receiver designs, frequency bands to transmit on, power levels, and all kinds of other considerations.

Physical-layer transmissions are also vulnerable to noise and data corruption For example, electrical interference on a wire can easily lead to **bit flips**, where
a received bit has the opposite value that it should have (a bit that should be 0 is read as 1, and vice-versa).

To protect against these kinds of errors, it's common to embed an **error correcting code** (ECC) within a transmission. The ECC is a few extra bits (sometimes just one bit)
that can be used to determine if the received data is correct, or was possible corrupted by transmission. ECCs are interesting because they require careful evaluation of tradeoffs: more bits will encode more information about the data, which can increase the number and kinds of errors that can be identified, but at the
cost of making every transmission larger and slower.

### Layer 2: the Link Layer

### Layer 3: the Internetworking Layer

### Layer 4: the Transport Layer

### Layer 7: the Application Layer

### Layers 5 and 6: the Session and Presentation Layers

## Encapsulation
