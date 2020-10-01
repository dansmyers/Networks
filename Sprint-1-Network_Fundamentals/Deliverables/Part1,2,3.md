# Part 1 

-1Mbyte file

-bandwidth = 80Mbits/sec

-latency = 20 ms

-expected time = time to put data on link + latency

- time to put data on link = file size/link bandwidth = 1Mbyte / (80Mbits/sec)

- 80 Mbits/sec = 80 * 2^20 bits/sec
- 1 Mbyte = 8 * 2^20 bits
- 8 * 2^20 bits / (80 * 20^2 bits/sec) = 0.1 sec 
- **expected time = 0.1 sec + 20 ms/2 = 1.001 sec**


# Part 2

-1Mbyte file

-bandwidth 1 = 80Mbits/sec  

-bandwidth 2 = 60Mbits/sec

-latency = 20ms/2 = 10 ms

- 80 Mbits/sec = 80 * 20^2 bits/sec

- 60 Mbits/sec = 60 * 20^2 bits/sec

- 1 Mbyte = 8 * 2^20 bits

- 8 * 2^20 bits / (80 * 2^20 bits/sec) = 0.1 sec

- 8 * 2^20 bits / (60 * 2^20 bits/sec) = 0.13 sec 

- **expected time = 0.1 sec + 0.13 sec + 10 ms = 0.231 sec**


# Part 3
-1Mbyte file

-512KB file2

-bandwidth 1 = 80Mbits/sec  

-bandwidth 2 = 60Mbits/sec

-latency = 20ms/2 = 10 ms

- 60 Mbits/sec = 60 * 20^2 bits/sec

- 512KB = 512 * 2^10 * 8 = 4096 * 2^10 bits

- 4096 * 2^10 bits / (60 * 2^20 bits/sec) = 0.067 sec

- **expected time = 0.1 sec + 0.13 sec + 10 ms + 0.067 = 0.298 sec**














