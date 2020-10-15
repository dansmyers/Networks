# Sprint 2 &ndash; Deliverables

## Honor Code
on my honor, I have not given, nor recieved, nor witnessed any authorize assistance on this work

Edit this section to include a statement of the Honor Code.

## Team Members
Mohamed AL Sharif

List the other members of your team here.

## Parity

Suppose you want to transmit the following 32-bit sequence:

```
0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110

```
Answer: 1111 0011 1110 0000

Determine the extra bits you would need to transmit if you chose to use a two-dimensional parity algorithm. Use a four row by eight column matrix.

## Link-Layer Protocols

The Ethernet protocol allows multiple hosts to share a connection to one physical link. Explain briefly how Ethernet manages access to the link to ensure that simultaneous transmissions from multiple hosts do not interfere with each other.

Describe at least two factors that make collision avoidance more challenging in 802.11 networks than in multiple-access wired Ethernets. How is collision avoidance implemented in wireless networks?
Answer: Part 1: 
Ethernet is a contention-based media access method that allows all hosts on a network to share the same links.
Part2:

Wi-fi is used by industry manufacturers It’s a host that connects to a wired network

and can’t listen during transmission.

A and C can Callide at B without sensing each other “Hidden node problem”

A  B C  D

Wi-fi is CSMA/CA protocol “collision avoidance”

Basic Strategy – ACK 

1)	If no transmission is in progress, try to send.
2)	If receiver gets a packet and is passes CRC check, receiver sends on ACK back to sender.
3)	If sender gets ACK, its transmission succeeded if not, takeout and retransmit.



## MAC Addresses

Explain the significance of media access control (MAC) addresses in link-layer networks. How is a device's MAC address set?

Answer: MAC address:

Media access control: unique identifier for every different host 48 -bit board onto ROM

AMD has Ox 080020

Basic unit of transition is a frame: 
Preamble	Source MAC address
(48 bit)	Destination MAC address (48 bit)	Data
CRC 

Transmission algorithm:
1) If an adaptor has a frame to send and it detects the line is idle, it sends immediately
-if the line is bag, wait for it to become idle and then it transmits immediately.

CSMA/CD
	Detection and recovery 
Hosts monitor the state of the wire and listen for collisions 

On a collision:
1)	Stop transmitting immediately 
2)	Send a 32-bit “jamming sequence” to indicate collision
3)	Wait a little bit
4)	Try to transmit again
The random time is a randomly chosen multiple of 51.2 u~s retry up to 16 times 
Maximum waiting time doubles after every failure



## Smoot Converter

Oliver R. Smoot is an MIT graduate and former head of the American National Standards Institute (ANSI) and the International Organization for Standards (ISO).

In 1958, as part of his initiation into ΛXA, Smoot and his brothers measured the entire length of Harvard Bridge over the Charles River in Cambridge, MA, using Smoot’s body as the ruler. He was at the time 170 cm tall (5 feet, 7 inches), and the bridge was declared to be 364.4 Smoots, "plus or minus one ear" (about 2035 feet or 650.7 meters). Since that time, the measurement of Harvard Bridge has always been denominated in Smoots, with the markings repainted each year by the incoming ΛXA pledge class at MIT. The Cambridge police use the Smoot markings to identify the location of accidents on the bridge.

<img src="https://alum.mit.edu/sites/default/files/styles/article_desktop/public/images/SMOOT.jpg?itok=jMC7rC_T" width="35%" />

Create a web page that can be used to convert lengths from feet to Smoots and vice versa. Users should have a select box to choose which conversion they want (feet-to-Smoots or
Smoots-to-feet) with a box to accept input and a convert button. Output the conversion to two decimal places in a `<div>` and include the string `plus or minus one ear` in your
output.

Tips:

- Look up the `<select>` tag for examples of creating a select box. You can use the `value` property of your `<select>` item to get the selected option.

- Numbers have a `toFixed` method that will round to a given number of decimal places.


## Hipster Restaurant Menu Generator

*farm-to-table lamb crunchwrap $22*  
*eldritch sea scallop fettucine $18*  
*microwaved languostine globules $29*

I’ve decided to open a new restaurant and I need your help coming up with the menu. This place is going to be slick and hip, with all kinds of exposed ductwork, bricks, 
and those old-timey lightbulbs, so it needs a hip menu to match. In fact, I think the menu should be **randomly generated** using a context-free grammar.

<img src="https://travelgrrrls.files.wordpress.com/2019/05/edison-bar2.jpg" width="35%" />

[*LATFH*](https://travelgrrrls.wordpress.com/2019/05/02/hipster-light/)

In this project, you’re going to write a page that uses JavaScript and DOM-manipulation to automatically create a restaurant menu.

- Your menu is going to have three sections: appetizers, mains, and desserts. Each section should use a different set of ingredients and preparations and different generation 
rules so that the menu items are unique. Put at least three items in each section.

- Use `menu_generator.html` as a starting point. It shows an example of generating the appetizer section. Use the code as a template to finish the other two sections. You can 
modify the ingredients and options for the appetizers if you want to use my choices in other sections.

- Give your restaurant its own name and modify the hip styling so your page has its own look.
