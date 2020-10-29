# Sprint 3 &ndash; Deliverables

## IP Questions

1. What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?

IP assumes the underlying layers/links are unreliable but does its best to get a transmission through to its destination.

2. Describe IP's *best-effort* service model.

IP is desgined to operate on all netyworks so that it is fully scalable. For this reason, it is not optimized for speeds, it does not guarantee delivery or delivery speed. All IP packets are treated the same. IP does its best to deliver packets but does not take steps to recover lost/damaged packets. 

3. Recall that every Ethernet adaptor has a unique 48-bit MAC address assigned by the manufacturer and burned into its ROM. If these MAC addresses are unique, why does the Internet Protocol need to use IP addresses to identify the source and destination of IP datagrams?

4. Suppose you are given an IP address with the classless network prefix 128.96.16/20. What is the maximum number of hosts that can be attached to this network, assuming one unique 32-bit IP address per host?

Class A:

10000000.01100000.0002 0000.00000000
4093 Hosts


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

## RIP

Using the graph above, fill in the table below to show each hosts's distance vector before the routing algorithm executes. Then create two more tables showing
the updated distance vectors after the first two rounds of message exchanges.

RIP - Before
|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  9  |  5  | 11  | 13  |
|  B  |  3  |  0  |  6  |  8  |  8  | 10  |
|  C  |  9  |  6  |  0  |  14 | 14  | 16  |
|  D  |  5  |  8  | 14  |  0  |  7  |  9  |
|  E  | 11  |  8  | 14  |  7  |  0  |  2  |
|  F  | 13  |  10 | 16  |  9  |  2  |  0  |

RIP - One Round
|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  0  |  6  |  0  | 8   | 10  |
|  B  |  0  |  0  |  0  |  5  |  0  | 2   |
|  C  |  6  |  0  |  0  |  8  |  8  | 10  |
|  D  |  0  |  5  |  8  |  0  |  0  |  2  |
|  E  |  8  |  0  |  8  |  0  |  0  |  0  |
|  F  | 10  |  2  | 10  |  2  |  0  |  0  |

RIP - Two Round's
|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  0  |  0  |  0  |  0  | 2   |
|  B  |  0  |  0  |  0  |  0  |  0  | 0   |
|  C  |  0  |  0  |  0  |  6  |  0  | 2   |
|  D  |  0  |  0  |  8  |  0  |  0  |  0  |
|  E  |  0  |  0  |  8  |  0  |  0  |  0  |
|  F  |  2  |  0  | 10  |  0  |  2  |  0  |

## SDN

The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?

Control plane uses high quality devices to make routing decisions and enforce top level master controller/ Software. 

Data plane- is mainly done by switches. The data plane deals with forwarding and recieving packets. 

SDN helps avoid having to use mulitple, high end routers for enterprise networks. Instead, one master controller makes all routing decisions for cheaper hardware. This helps deal with complexity and overmanagement. 

