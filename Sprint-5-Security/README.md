# Sprint 5 &ndash; Security and Cryptography

<img src="https://imgs.xkcd.com/comics/security.png" width="45%" />

<img src="https://imgs.xkcd.com/comics/how_hacking_works_2x.png" width="45%" />

*Hover text: if only someBODY had told them that the world was going to roll them.*

## Starts Wednesday, 11/11
## Deliverables and quiz are due on Wednesday, 12/2

## Overview and Goals

We're finally ready to move on from the networking protocol stack and talk about a brand-new topic that's traditionally included in networking courses: security, with an
emphasis on secure message exchange.

The main topics that we'll be covering in this unit are:

- Symmetric and public-key cryptosystems

- Message authentication using hashing and digital signatures

- Public-key infrastructure and the role of certificate authority

- Authentication protocols

- Common attacks, both related to cryptography and otherwise: man-in-the-middle, denial-of-service, cross-site scripting, buffer overflows

- Blockchains and cryptocurrencies


## Deliverables and Quiz

**There is no separate project for this unit**. Instead, I want you (with team members, if you choose) to begin working on your final projects, which will go all the way
until the end of the semester. Take a look at the document for a description and guidelines; you have broad freedom to build anything that you think is interesting.

The quiz will be done **online** on **Wednesday, December 2**, which will also be the release day for the next sprint's material. The quiz will be 
**individual** (not team) but will be **open everything**: you can use the sprint resources, your notes, and online resources. Remember to abide by the Honor Code 
and ask me if you have questions about what is an acceptable resource!

**Remember that you have only two weeks to complete this sprint, so don't procrastinate!**

## Submission Instructions

- Fork this repo (dansmyers/Networks) using the "Fork" button on the repo homepage. Forking creates a copy of the repo under your own GitHub account.

- Do your work, uploading your files into your repo.

- Submit a pull request to me using the "Pull Request" button on the front page of your repo. The pull request will create an entry that allows me to review your new files.

- I'll use the pull request commenting feature to provide feedback on your work.

<img src="https://imgs.xkcd.com/comics/alice_and_bob.png" width="75%" />



## Resources

<img src="https://imgs.xkcd.com/comics/cryptography.png" width="40%" />

All of the relevant material is in [Chapter 8](https://book.systemsapproach.org/security.html) of the text. In particular,

- 8.1 is background and definitions of common terms.

- Read and understand all of 8.2, which is the core content on cryptography.

- Read the first part of 8.3, on developing a public-key infrastrcuture. You do not need to read the section on Diffie-Hellman key exchange.

- 8.4 discusses authentication mechanisms, which are more challenging because there is a need to establish both the authenticity and timeliness of messages. Focus on the
first part that discusses public-key authentication and the role of a timestamp or nonce. The later sections discuss more complex authentication protocols, with Kerberos
as the example.

- Read the section in 8.5 on Transport-Layer Security (TLS, SSL, HTTP), which has an important role in providing secure communication on the modern Internet. Also read the last
section on firewalls.
