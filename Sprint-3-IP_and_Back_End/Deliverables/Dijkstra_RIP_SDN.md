###Dijkstra

- A-B: length 3
- A-B-C:length 9
- A-D: length 5 
- A-B-E: length 11 
- A-B-E-F: length 13


### RIP 
|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  -  |  5  |  -  |  -  |
|  B  |  3  |  0  |  6  |  -  |  8  |  -  |
|  C  |  -  |  6  |  0  |  -  |  -  |  -  |
|  D  |  5  |  -  |  -  |  0  |  7  |  -  |
|  E  |  -  |  8  |  -  |  7  |  0  |  2  |
|  F  |  -  |  -  |  -  |  -  |  2  |  0  |

- exchange 1

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  9  |  5  | 11  |  -  |
|  B  |  3  |  0  |  6  |  8  |  8  | 10  |
|  C  |  9  |  6  |  0  |  -  | 14  |  -  |
|  D  |  5  |  8  |  -  |  0  |  7  |  9  |
|  E  | 12  |  8  | 14  |  7  |  0  |  2  |
|  F  |  -  | 10  |  -  |  9  |  2  |  0  |

- exchange 2

|     |  A  |  B  |  C  |  D  |  E  |  F  |
|-----|-----|-----|-----|-----|-----|-----|
|  A  |  0  |  3  |  9  |  5  | 11  | 13  |
|  B  |  3  |  0  |  6  |  8  |  8  | 10  |
|  C  |  9  |  6  |  0  | 14  | 14  | 16  |
|  D  |  5  |  8  |  8  |  0  |  7  |  9  |
|  E  | 12  |  8  | 14  |  7  |  0  |  2  |
|  F  | 13  | 10  | 16  |  9  |  2  |  0  |

### SDN 

This phrase means we will decouple the act of processing packets and physical links (data plane) from how decisions about those packets are made (control plane)

-The data plane operations are carried out by relatively dumb switches, mostly in hardware

-The control plane decisions are made by the top lever master controller running mostly in software

-An advantage can be that since they are separated, these are independent from each other, which means neither would be affected if one of the planes has a problem. It also allows for one way of implementing a system property in hardware on the physical computer, but allow policy decisions to be easily configured in software.



