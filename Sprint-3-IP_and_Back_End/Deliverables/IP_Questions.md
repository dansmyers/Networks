## IP Questions

1. What assumptions, if any, does IP make about the local networks and lower- level links used to transmit datagrams? How are these assumptions consistent with the design goals IP?

-I'm not sure. I think it assumes that IP will "run over anything" and it may not be true 100% of the times. It assumes IP has global scalability, which is also one of it's goals. It also assumes all packets are the same and no packet is more important than another. 

2.

-The IP's service model is not very good in performance since it is a "best effort" service. All datagrams are treated equally, and IP does the best it can to deliver the datagrams as fast as possible.

-Process of moving datagrams:

- The goal is to move packets one step closer to it's destination

- When a host wants to send a datagram, it examines the network part of IP addresses. 

- Depending on the connection (local or on a different network), it sends packet to its final destination or to its next hop. 


3. 

-This is because external hosts on the global internet don't need to know the details of how to reach every network within the domain (IP addesses). 

-Instead, an external host only needs to know how to reach the domain's gateway (MAC address) and then the gateway takes responsibility for forwarding packets into the domains network. 

-It would also be inconvenient for memory space if only MAC addresses were used. The Ethernet adaptor would have to store thousands of 42-bit addresses for each device in order to know where to send IP datagrams. 


4. 

-32-20 = 12
 
-2^12 = **4096 hosts**