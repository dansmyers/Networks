# Sprint 2 &ndash; Deliverables

## Honor Code

Edit this section to include a statement of the Honor Code.
On my honor, I have neither given nor receieved any unauthorized work on this assignment. 

## Team Members

List the other members of your team here.
Nitish Jagdev
## Parity

Suppose you want to transmit the following 32-bit sequence:

```
0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110
```

Determine the extra bits you would need to transmit if you chose to use a two-dimensional parity algorithm. Use a four row by eight column matrix.

## Link-Layer Protocols

The Ethernet protocol allows multiple hosts to share a connection to one physical link. Explain briefly how Ethernet manages access to the link to ensure that simultaneous transmissions from multiple hosts do not interfere with each other. Senders listen to the wire, and they wait until the line goes idle. Ethernet uses a 1-persistent protocol to properly allow senders to broadcast when the line goes idle. 

Describe at least two factors that make collision avoidance more challenging in 802.11 networks than in multiple-access wired Ethernets. How is collision avoidance implemented in wireless networks?One problem unique to 802.11 is the hidden node problem where two recievers send to a node between them, but they dont know about the existence of each other. There is also an unpredicable noise envirnoment in wireless networks that isnt present in wired networks. In 802.11, RTS/CTS protocol is used wher the sender sends a ready to send signal, and it only sends if the reciever sends back a clear to send signal. 

## MAC Addresses

Explain the significance of media access control (MAC) addresses in link-layer networks. How is a device's MAC address set? MAC addressesare important because they are a unique identifier for hardware that recieves data. It is set by it being burned into the ROM of the computer.

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
