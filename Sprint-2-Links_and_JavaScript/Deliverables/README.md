# Sprint 2 &ndash; Deliverables

## Honor Code

“On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this work."

## Team Members

Randy, Oliver, Griffin, Jacob

## Parity

Suppose you want to transmit the following 32-bit sequence:

```
0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110
```

Determine the extra bits you would need to transmit if you chose to use a two-dimensional parity algorithm. Use a four row by eight column matrix.

```
You would just need to add an outside layer to the matrix.  So it would just be 4 + 8 for 12
extra bits.

Example:
1011 1110  X
1110 1111  X
1100 1010  X
1111 1110  X

XXXX XXXX
```

## Link-Layer Protocols

The Ethernet protocol allows multiple hosts to share a connection to one physical link. Explain briefly how Ethernet manages access to the link to ensure that simultaneous transmissions from multiple hosts do not interfere with each other.

Describe at least two factors that make collision avoidance more challenging in 802.11 networks than in multiple-access wired Ethernets. How is collision avoidance implemented in wireless networks?

```
If a host has a frame to send and it takes the line is idle, then it sends immediately.  If 
the line is busy, wait for it to become idle, then transmit immediately.

802.11 networks have problems by not being able to listen during transmission, and some nodes
can see other a node without being able to sense each other.  This is called the hidden node
problem.

Collision avoidance is implemented by ACK in wireless networks.  This has a sender send out
an ARK to the receiver that it wants to send.  The receiver responds and lets them know they
are ready to receive.  This lets others in the area know not to send right then.
```

## MAC Addresses

Explain the significance of media access control (MAC) addresses in link-layer networks. How is a device's MAC address set?

```
The MAC address is very important.  It is the unique identifier for a host on the network.
Because of broadcast protocol, the MAC address lets the other hosts know if the information
is for them or to ignore.  The MAC address is set by the manufacturer by burning the 48 bits
into the ROM on the ethernet card.
```

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
