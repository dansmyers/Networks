# Sprint 2 &ndash; Deliverables

## Honor Code

 “On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this
work.” 

## Team Members

Jay J.

## Parity

Suppose you want to transmit the following 32-bit sequence:

```
0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110
```

Determine the extra bits you would need to transmit if you chose to use a two-dimensional parity algorithm. Use a four row by eight column matrix.

1011 | 1
1110 | 1
1110 | 1
1111 | 0
1100 | 0
1010 | 0
1111 | 0
1110 | 1
----------
0011 | 0

## Link-Layer Protocols

The Ethernet protocol allows multiple hosts to share a connection to one physical link. Explain briefly how Ethernet manages access to the link to ensure that simultaneous transmissions from multiple hosts do not interfere with each other.

If a transmission frame wants to be sent and it detects the line is idle, it sends immediately. If it is detected busy, it waits for it to become idle and then sends. 
Through CSMA/CD hosts monitor the wire and listen for collisions.

Describe at least two factors that make collision avoidance more challenging in 802.11 networks than in multiple-access wired Ethernets. How is collision avoidance implemented in wireless networks?

Hosts cannot listen to the wire during transmissions on a wireless network the way you can on a wired one. 
Its harder to determine collisions epecially when hosts are out of range (hidden terminal problem). Sometimes hosts cannot detect eachother, preventing the confirmation of an idle wire or successful transmission. 

Wireless networks use RTSCTS to avoid collisions. Special "ready to send/ clear to send" packets are used to ensure the transmission is uninterupted. RTSCTS also uses ACK. 

## MAC Addresses

Explain the significance of media access control (MAC) addresses in link-layer networks. How is a device's MAC address set?

MAC addresses are 48 bit addresses stored ont network card as ROM - given by the manufacturer. MAC addresses funtion at the link layer. They act as a unique identifier for each host on a network. These MAC addresses map to IP addresses (network layer) to keep track of devices using that network. 

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
