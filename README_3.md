# Sprint 3 &ndash; Deliverables

## IP Questions

1. What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?

2. Describe IP's *best-effort* service model.

3. Recall that every Ethernet adaptor has a unique 48-bit MAC address assigned by the manufacturer and burned into its ROM. If these MAC addresses are unique, why does the Internet Protocol need to use IP addresses to identify the source and destination of IP datagrams?

4. Suppose you are given an IP address with the classless network prefix 128.96.16/20. What is the maximum number of hosts that can be attached to this network, assuming one unique 32-bit IP address per host?


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

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |     |     |     |     |     |     |
|  B  |     |     |     |     |     |     |
|  C  |     |     |     |     |     |     |
|  D  |     |     |     |     |     |     |
|  E  |     |     |     |     |     |     |
|  F  |     |     |     |     |     |     |

## SDN

The key phrase that must be memorized and chanted by all SDN acolytes is

> Separate the control plane from the data plane.

What is the control plane? What is the data plane? Why might we want to separate them? What advantages does SDN offer over traditional network architectures?


