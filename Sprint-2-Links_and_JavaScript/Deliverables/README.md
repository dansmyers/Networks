# Sprint 2 &ndash; Deliverables

## Honor Code

On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this work.

## Team Members

Nathaly Espinosa Teran, Cameron DeLone, Samuel Solomon, Jenny Goldsher

## Parity

Suppose you want to transmit the following 32-bit sequence:

```
0xBEEFCAFE = 1011 1110 1110 1111 1100 1010 1111 1110
```

Determine the extra bits you would need to transmit if you chose to use a two-dimensional parity algorithm. Use a four row by eight column matrix.

### Answer

Row Parity Bits: 0101
Column Parity Bits: 01100101
Combo Parity Bit: 0

## Link-Layer Protocols

The Ethernet protocol allows multiple hosts to share a connection to one physical link. Explain briefly how Ethernet manages access to the link to ensure that simultaneous transmissions from multiple hosts do not interfere with each other.

Describe at least two factors that make collision avoidance more challenging in 802.11 networks than in multiple-access wired Ethernets. How is collision avoidance implemented in wireless networks?

### Answer

1. Ethernet manages collisions by checking for extra voltage or "noise" on the wire, which would be caused by two devices on the link attempting to transmit at the same time, if this happens then any device which hears this noise will cut off transmition and wait a random amount of time until it attempts to transmit again.

2. One factor that makes collision avoidance more difficult on 802.11 networks is in a situation where two devices can both "see" a singe other device but not each other, due to this if they both attempt to transmit to that device at the same time they would not be aware that they had collided with another device's transmition since they essentially do not know that each other exist. Another, more basic factor, is that unlike ethernet there is no direct path back to a device from the air around it that the wireless signal is traveling through, therefore if a collision happened a device that sent one of the signals would be completely unaware of this collision and would not be able to resend information like in a ethernet network. Wireless networks can get around this issue using request-to-send and clear-to-send packets, request-to-send packets are sent out by the sender of a transmition to the reciever asking it if it is safe to send information, if it is the the reciever will then send back a clear-to-send packet stating that there will be no collision if information is sent, as well as notifying other devices not to send anything until they get a clear.

## MAC Addresses

Explain the significance of media access control (MAC) addresses in link-layer networks. How is a device's MAC address set?

### Answer

MAC addresses are important to link-layer networks because they provide the frameword for LAN networks by maintaining a consistent address for a device that has connected to the network, this is important due to the dynamic nature of IP adresses which can change each time you change networks. By mapping the IP address to the MAC address the local network can maintain an understanding of which device is which even when the IP address changes. On top of this MAC addresses allow for network adapters to sift through incoming packets and only processes those meant for the specific device by comparing a packets destination MAC address and the devices current MAC address, if they match you device will process the packet, if not the device will ignore it.

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
