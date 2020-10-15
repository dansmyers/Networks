# Parity Checking

## Error Correcting Codes

Suppose we'd like to send a sequence of bits over a link. We'd like to devise a scheme that allows the receiver to detect any errors in the data it receives. In particular,
we'd like to protect from **bit flips**, where a bit randomly changes to the opposite state, which can be the result of electrical interference or errors in the receiver's
memory.

The basic solution is to send some amount of **redundant information** with the original data. The receiver can then, in theory, check the redundant information to guarantee
that the original message has not been corrupted. An **error correcting code** (ECC) is a system for encoding additional information with a message in order to protect it
against errors on a noisy transmission link.

Simple ECCs may send only a small number of bits and may be capable of detecting a small number of bit flips. More sophisticated ECCs are able to detect not only if errors have
occurred, but also identify which bits have flipped and **correct** the error to recover the true data without requiring a retransmission by the sender.

## 1-D Parity Check

The simplest code is the 1-dimensional parity check. **It can detect any odd number of bit flips and requires transmission of only one extra bit**, but it 
can't identify the location of the error, so it can't be used for correction.

The **parity** of a bit sequence is determined by the number of ones it contains:

- A sequence with an even number of 1 bits has a parity of 0.

- A sequence with an odd number of 1 bits has a parity of 1.

This definition is equivalent to the result of performing a multi-bit exclusive OR (XOR) operation on the bit sequence.

For example, suppose we want to transmit the following 32-bit sequence:

```
0x89ABCDEF = 1000 1001 1010 1011 1100 1101 1110 1111
```

The sequence contains twenty 1 bits, so the parity is **0**. To transmit the sequence, we would send the twenty bits of data plus the single parity bit:

```
1000 1001 1010 1011 1100 1101 1110 1111 1
                                        ^
                                        |
                                      parity
```

When the receiver reads the data and parity bit, it recalculates the parity of the data it received and compares it to the received parity bit. If they match, the receiver
assumes that the transmission was successful. If they don't match, the receiver assumes an error occurred, which will probably trigger a request to retransmit the data.

For example, suppose that the first bit in the sequence flips from 1 to 0 during transmission.

```
0000 1001 1010 1011 1100 1101 1110 1111 1
^                                       ^
|                                       |
flip                                  parity
```

The sequence now contains ninteeen 1 bits, so the receiver would calculate a parity of **1** from the received data. This doesn't match the received parity bit, so the receiver
knows that something must have gone wrong.

What if two bits flip? In that case, the calculated parity would still match the received parity, so the receiver would be unable to detect that an error had occurred.
In general, the 1-D parity check can detect any number of odd bit flips, but it can't detect if an even number of flips have occurred. It also can't determine the **location**
of any flipped bits, so it can't correct the errors. These problems are not as severe as they may sound: bit flips are rare and sending a lot of extra bits with every message
may be more expensive in the long-run than requiring the occasional retransmission.

## 2-D Parity Check

We can gain additional detection power, at the cost of sending more bits, with a 2-D parity check. This scheme can **discover and correct** any single bit error and can **detect**
any two-bit error.

To perform the 2-D parity calculation, first form the data into a rectangular matrix, then calculate the parity of each row and column. Here, I've set up the example
above to put one byte in each row.

```
                          row parities
                          ------------
         1 0 0 0 1 0 0 1 |     1      
         1 0 1 0 1 0 1 1 |     1
         1 1 0 0 1 1 0 1 |     1
         1 1 1 0 1 1 1 1 |     1
         -----------------------------
column   0 0 0 0 0 0 0 0 |     0 <---- parity of the column parities
parities
```

By coincidence, all of the column parities evaluate to zero and all of the rows evaluate to 1 in this example.

The full transmission consists of the data and all of the additional parity bits. In this example, that would require sending thirteen additional bits: quite a bit more than
the one bit required by the 1-D parity check.

Upon reading the data, the receiver can reform the matrix, recalculate parities from the received data, and compare the
recalculated parities to the received bits. Suppose, again, that the first bit flips. 

```
                 flip
                   |                 calculated  received
                   v                -----------------------
                   0 0 0 0 1 0 0 1 |     0     |     1     |  <--- Parity error in this row
                   1 0 1 0 1 0 1 1 |     1     |     1     |
                   1 1 0 0 1 1 0 1 |     1     |     1     |
                   1 1 1 0 1 1 1 1 |     1     |     1     |
                  ------------------------------------------
calculated         1 0 0 0 0 0 0 0 |     1     |           |
                  ------------------------------------------
received           0 0 0 0 0 0 0 0 |           |     0     |
                   ^
                   |
                   |
         parity error in this column
```

The single bit flip causes parity error in the first column and first row, which identifies the location of the error. Because the location is known, the receiver can 
correct the bit flip without requiring a retransmission from the sender.

You can check and verify that a two-bit error can still be detected.



