# Sprint 1 &ndash; Network Fundamentals

## Starts Monday 9/14
## Deliverables and quiz are due on Wednesday 9/30

## Overview and Goals

This is it: the first sprint. We're going to do four things:

1. Get comfortable with the rhythms and practice of Scrumage.
2. Learn about the core elements of computer networks, focusing on the concept of a "stack" of network protocols that work together to transmit information.
3. Get started with front-end web design using HTML and CSS.
4. Learn to use the Bootstrap framework to make web pages that don't automatically look like garbage.

At the end of the sprint, you'll have three things to complete:

1. The deliverables described in this project.
2. An individual quiz.
3. A short individual reflective write-up.

The content for this sprint is not particularly difficult, although you will need to get started with web development, which may be new for you. As you're working,
focus on getting into the rhythm of Scrumage and developing good working habits with your teams that will carry you through the more content-heavy sprints that are coming up.

## Deliverables and Quiz

Complete the four problems in `Deliverables`. Remember that you may work freely with the members of your team and you may use any resources that you find helpful to
complete the project. **Please list the names of you collaborators in the project document**.

***ADD SUBMISSION INSTRUCTIONS***.

The quiz and reflective write-up will be done **online** on **Wednesday, September 30**, which will also be the release day for the next sprint's material. The quiz will be 
**individual** (not team) but will be **open everything**: you can use the sprint resources, your notes, and online resources. Remember to abide by the Honor Code 
and ask me if you have questions about what is an acceptable resource!

## Learning Outcomes

At the end of this sprint, you will be able to:

- Describe the 7-layer OSI model of computer networks and discuss the role of each layer.

- Understand and use key network performance measurements: bandwidth and latency. Perform network performance calculations.

- Use HTML and CSS to create basic web pages. Be able to apply CSS styling to individual page elements or to classes of elements.

- Use the Bootstrap framework to create pages with a grid layout.

## What You Need to Learn

- The **OSI 7-layer model** of a computer network. Explain the purpose of each layer and give examples of the protocols that exist at each level.

- The roles and purposes of some important protocols: **HTTP**, **TPC**, and **IP**. You don't need to understand the technical details of these protocols yet (we'll talk about those later)
but you should be able to explain why they exist and what purpose they serve in the modern Internet.

- The concept of **encapsulation** in a network, which allows each level of the protocol stack to be independent from the others.

- The concepts of **network bandwidth** (also called throughput) and **latency**. Be able to the transmission time of a file given the bandwidth and latency of a link.

- Be able to create **basic web pages using HTML** and serve them on Mimir.

- Be able to apply **CSS styling** to page elements using a `<style>` block. Be able to style standard typographical elements like page colors, fonts, font sizes, and text alignment.

- Be able to give **ids and class labels** to page elements and use them for CSS styling.

- Use the **Bootstrap** framework to create responsive pages with grid-based layouts. Understand Bootstrap's row and 12-column model of the page.

## Resources

### Networking Fundamentals

There's a bit of a paradox with learning about networking: *in order to understand the design of networks, you first must understand the design of networks*. What I mean (I think), is that understanding the details of network architecture becomes much easier if you have a high-level holistic overview of how a modern network is put together from top to bottom. Therefore, our main goal in this unit is giving you that top level view of all the parts of a network. This will also allow you to get some more insight into protocols that you have probably heard about, but may not have studied in detail before.

Start with my notes in the `Notes` directory giving you an overview of the 7-layer model.

Next, watch [this video](https://www.youtube.com/watch?v=kCuyS7ihr_E), which does a good job explaining the connection between the OSI 7-layer reference model and the TCP/IP
Internet architecture. The video does include an extensive list of different protocols that exist at each level: you don't need to memorize these.

After that, you can look at [Chapter 1.3 in the Peterson and Davie text](https://book.systemsapproach.org/foundation/architecture.html). The 7-layer model is introduced about halfway through the chapter. I suggest starting there, then backing up a little bit to read the beginning of the chapter, which is more abstract. What you want to emphasize in your reading is how the common protocols of the modern Internet (TCP, IP, etc.) map to the layers of the reference model.

## Network Performance

Read [Chapter 1.5 of Peterson and Davie](https://book.systemsapproach.org/foundation/performance.html). As you read, focus on the following questions:

- What is the difference between throughput and latency?

- What determines link bandwidth? What determines latency?

- How do you calculate the transfer time for a file of a given size on a link with a given bandwidth and latency?

You'll get the chance to practice these calculations on the deliverable assignment and there will also be a calculation question on the quiz.

## Front-End Web Development


