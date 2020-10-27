# Deliverables Sprint 3:
## IP Questions
1.	What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?
IP assumes that the local networks and lower-level links may have slower or less good technology. This is consistent with IP being able to run over anything. Assuming the technology isn’t as good or complex is what makes IP scalable and accessible to everyone. 
2.	Describe IP's best-effort service model.
A service model is the host-to-host services provided on an internetwork. The IP service model has two parts: an addressing scheme and a datagram model of data delivery. The main concern of this model is to be able to run over everything. This service model is sometimes called best effort because if something goes wrong with a packet, the network does nothing. It gave its “best effort” and doesn’t try to recover from the failure. It tries, but there are no guarantees. The benefit of this service is that its very simple. It can be run over any network, even one that uses carrier pigeons. This makes IP very scalable, and when paired with TCP, reliable. 
3.	Recall that every Ethernet adaptor has a unique 48-bit MAC address assigned by the manufacturer and burned into its ROM. If these MAC addresses are unique, why does the Internet Protocol need to use IP addresses to identify the source and destination of IP datagrams?
Mac addresses are flat. Knowing the MAC address of a computer doesn’t’ give you information on how to locate a host. It is like knowing the social security number of a human. Each ssn is unique, but knowing a humans ssn doesn’t give you direct access to their address. MAC addresses are needed when two hosts are on the same network and IP is needed externally. 
4.	Suppose you are given an IP address with the classless network prefix 128.96.16/20. What is the maximum number of hosts that can be attached to this network, assuming one unique 32-bit IP address per host?
//The first 20 bits remain the same meaning 12-bits are dedicated to the different networks. 2^12 hosts available. 4,094




## Dijkstra

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



Node A.
| Destination | Best Distance|Best path|
|-----------------|------------------|------------|
|   B                  |  3                    |    A->B  |
|   D                  |  5                    |    A->D  |
|   C                  |  9                    |    A->B->C  |
|   E                  | 11                   |    A->B->E|
|   F                  |  13                   |    A->B->E->F |















## RIP

Using the graph above, fill in the table below to show each hosts's distance vector before the routing algorithm executes. Then create two more tables showing
the updated distance vectors after the first two rounds of message exchanges.


Initial Distances Stored at Each Node 
|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |   3  | ∞ |  5  |   ∞  |  ∞  |
|  B  |   3  |   0  |  6   |  ∞  |  8   |  ∞  |
|  C  |  ∞  |  6   |   0  |  ∞  | ∞  | ∞  |
|  D  |  5   |  ∞    |  ∞  |   0  |  7  | ∞  |
|  E  |   ∞   |   8  | ∞  |   7  |  0   |  2   |
|  F  |  ∞    |   ∞   | ∞  | ∞  |    2 |   0  |


Distances Stored at Each Node round 2. After each node shares it graph with the other nodes, all can reach second hops.
|       |  A  |  B  |  C  |  D  |  E   |  F  |
|-----|---- |-----|-----|-----|-----|-----|
|  A  |  0  |   3  | 9   |  5  |11  | ∞    |
|  B  |  3  |   0  |  6  |  8  | 8   |  10 |
|  C  |  9  |  6   |  0  | 14 | 14 | ∞    |
|  D  |  5  |  8   | 14 |  0  |  7  | 9    |
|  E  | 11 |   8  | 14  | 7  |  0   |  2   |
|  F  | ∞    | 10 |  ∞    |  9  |   2 |   0  |

Final Distances Stored at Each Node. F can finally reach A and C after receiving final graphs

|       |  A  |  B  |  C  |  D  |  E   |  F  |
|-----|---- |-----|-----|-----|-----|-----|
|  A  |  0  |   3  | 9   |  5  |11  | 13 |
|  B  |  3  |   0  |  6  |  8  | 8   |  10 |
|  C  |  9  |  6   |  0  | 14 | 14 | 16  |
|  D  |  5  |  8   | 14 |  0  |  7  | 9    |
|  E  | 11 |   8  | 14  | 7  |  0   |  2   |
|  F  | 13  | 10 |  3   |  9  |   2 |   0  |





## SDN

The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?


The control plane is mostly in the software an makes routing decisions and enforcing policies. The data plane is more in the hardware and receives and forwards packets along its connected link. Separating them allows us to deploy relatively dumber and cheaper, but easier to manage, switches and routers. SDN solves the problem of complexity and over management in enterprise level networks. It is easier to manage and is generally cheaper and faster.
