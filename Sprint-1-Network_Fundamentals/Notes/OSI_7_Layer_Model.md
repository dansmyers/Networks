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
| 7      | Application       | Protocols used by with user-level applications            | HTTTP, FTP, SMTP, SSH |
| 6      | Presentation      | Preparing user-level data for transmission by lower layers            | Compression and encryption |
| 5      | Session      | Managing and maintaing context for long-running communication sessions            | A web page that makes multiple requests to the same servers |
| 4      | Transport       | Providing reliable end-to-end communication           | TCP |
| 3      | Internetwork       | Addressing and routing to transmit data between networks at global scale           | IP |
| 2      | Data link       | Managing shared access to a communication link            | Ethernet, 802.11 (wi-fi), Bluetooth, cellular |
| 1      | Physical       | Transmitting bits on physical links            | Encoding, error correction|



### Overview

### Layer 1: the Physical Layer

### Layer 2: the Link Layer

### Layer 3: the Internetworking Layer

### Layer 4: the Transport Layer

### Layer 7: the Application Layer

### Layers 5 and 6: the Session and Presentation Layers

## Encapsulation
