 # parity:
  
  0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110
  
  
                                row parities
                              ------------
             1 0 1 1 1 1 1 0 |     0      
             1 1 1 0 1 1 1 1 |     1
             1 1 0 0 1 0 1 0 |     0
             1 1 1 1 1 1 1 0 |     1
             -----------------------------
             0 1 1 0 0 1 0 1 |     0           <---- parity of the column parities
              column parities

# link layer protocol

 The Ethernet protocol uses the CSMA/CD MAC method. Each host monitors the state of the wire and listens for collisions. If the host needs to send a frame, it checks out the line and looks to see if it's idle. If the line is idle, the host waits and retries after a period fo time. The CSMA/CD method uses collision detection, not avoidance, and recovers from any collisions.  If a collision occurs, the host stops transmission immediately, sends a 32 bit jamming sequence, waits, then tries again. 

 In 802.11 networks, collision avoidance is more challenging. One reason is that a host can’t listen and transmit at the same time. Another reason collision avoidance is more challenging in 802.11 networks is something called the ‘hidden node problem’.  When two nodes are out of range of each other, collision can’t be detected.
 Because of these challenges, the strategy to send data is different than the Ethernet protocol. If no transmissions are in progress, a host will try to send its data. If the receiver gets it, it will send back an ACK packet to acknowledge it. If the host get this packet, they know the transmission was received. If they don’t get it, they will resend the data. For extra improvement, RTS-CTS can be used. This adds to extra steps to make sure the transmission line is clear. Before sending data, the host sends a ready-to-send message. If the receiver is ready it sends a clear-to-send message. Other hosts will observe this and know to wait before sending data. 

# MAC addresses

the MAC address uniquely identifies which device is which on a local network. Each packet needs to have your MAC address as the destination, so it knows where to go. The physical MAC address is stored, or burned, on the NIC's ROM chip. 

# links to smoot and menu site:
https://samjsolomon.github.io/smoot_converter

https://samjsolomon.github.io/Hipster_menu_generator/
