Cam Reeves

Sprint 1 – Deliverables

Honor Code
 “On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this
work.” 

Team Members
Jay J

Performance
Part 1
Suppose you have a link capable of sending data at 80 Mbits/sec. The expected round-trip latency of the link (that is, the time for a sender to transmit a frame across the link and then receive a response back) is 20 ms. What is the total expected time required to transmit a 1 Mbyte file from a source host to a destination at the other end of the link?

You may assume that the 80 Mbits/sec link rate is defined to be 80 * 220 bits per second.

FileSize
1Mbyte (2^20 X 8(bits) = 8388608 bits

BandWidth
2^20 X 80 per second = 83886080

Latency 
20ms/2 = 10ms = .01 seconds 

(8388608 filesize / 83886080 bandwidth) + .01s latency = 

---------------------------
0.11 Seconds



Part 2
Suppose that you want to transmit the same 1 MB file to a destination that requires traversing two links. The complete round-trip time is still 20 ms. The first link transmits at a rate of 80 Mbits/sec and the second transmits at 60 Mbits/sec.

Give an estimate of the expected time required to transmit the file from the source to its destination.

FileSize
1Mbyte (2^20 X 8(bits) = 8388608 bits

latency
10ms = .01s

bandwidth
2^20 X 60 per second = 62914560
2^20 X 80 per second = 83886080

((8388608 filesize / 83886080 bandwidth) + (8388608 filesize / 62914560 bandwidth)) + .01 latency = 

.1 + .1333333 + .01 = 

---------------------------
0.24333333333 Seconds


Part 3
Repeat the example from Part 2, but now assume that there is a total of 512 KB of data queued and waiting to transmit at the second link at the moment that the 1 MB file arrives there. The entire 512 KB must transmit before our 1 MB file can be sent on the second link.

What is the complete estimated time – including transmission times, latency, and queueing delays – required to send the file now?

512KB = 4194304 bits 


4194304 bits / 62914560 bits per second = .066666666666 Seconds


0.24333333333 Seconds + .066666666666 Seconds = 

---------------------------
0.30999999999 Seconds
