# Sprint 1 &ndash; Network Fundamentals

## Starts Monday 8/21
## Deliverables are due on Friday 9/1

## Overview and Goals

This is it: the first sprint. We're going to do four things:

1. Get comfortable with the rhythms and practice of Scrumage.
2. Learn about the core elements of computer networks, focusing on the concept of a "stack" of network protocols that work together to transmit information.
3. Get started with front-end web design using HTML and CSS.
4. Learn to use the Bootstrap framework to make web pages that don't automatically look like garbage.

The content for this sprint is not particularly difficult, although you will need to get started with web development, which may be new for you. As you're working,
focus on getting into the rhythm of Scrumage and developing good working habits with your teams that will carry you through the more content-heavy sprints that are coming up.

## Deliverables

Complete the problems and project in `Deliverables`. Remember that you may work freely with the members of your team and you may use any resources that you find helpful to complete the project. **Please list the names of you collaborators in the project document**.

## Submission Instructions

Complete your work in Sprint 1 repository that I've created on Repl.it. For the written problems, create a clearly labeled text document containing your solutions.

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

- Be able to create **basic web pages using HTML**.

- Be able to apply **CSS styling** to page elements using a `<style>` block. Be able to style standard typographical elements like page colors, fonts, font sizes, and text alignment.

- Be able to give **ids and class labels** to page elements and use them for CSS styling.

- Use the **Bootstrap** framework to create responsive pages with grid-based layouts. Understand Bootstrap's row and 12-column model of the page.

## Resources

### Networking Fundamentals

There's a bit of a paradox with learning about networking: *in order to understand the design of networks, you first must understand the design of networks*. What I mean (I think), is that understanding the details of network architecture becomes much easier if you have a high-level holistic overview of how a modern network is put together from top to bottom. Therefore, our main goal in this unit is giving you that top level view of all the parts of a network. This will also allow you to get some more insight into protocols that you have probably heard about, but may not have studied in detail before.

Start with my notes in the `Notes` directory giving you an overview of the 7-layer model.

Next, watch [this video](https://www.youtube.com/watch?v=kCuyS7ihr_E), which does a good job explaining the connection between the OSI 7-layer reference model and the TCP/IP
Internet architecture. The video does include an extensive list of different protocols that exist at each level: you don't need to memorize these.

After that, you can look at [Chapters 1.1 and 1.3 in the Peterson and Davie text](https://book.systemsapproach.org/foundation/architecture.html). The 7-layer model is introduced about halfway through the chapter. I suggest starting there, then backing up a little bit to read the beginning of the chapter, which is more abstract. What you want to emphasize in your reading is how the common protocols of the modern Internet (TCP, IP, etc.) map to the layers of the reference model.

### Network Performance

Read [Chapter 1.5 of Peterson and Davie](https://book.systemsapproach.org/foundation/performance.html). As you read, focus on the following questions:

- What is the difference between throughput and latency?

- What determines link bandwidth? What determines latency?

- How do you calculate the transfer time for a file of a given size on a link with a given bandwidth and latency?

You'll get the chance to practice these calculations on the deliverable assignment and there will also be a calculation question on the quiz.

### Perspective

Read the final section of Chapter 1, "Perspective", which introduces the idea of software-defined networking. We'll return to this concept a few different times throughout the semester.


## Front-End Web Development

Your goal in this unit is to create static web pages using HTML, CSS, and the Bootstrap framework.

Start by working through the lab in the `Notes` directory. It will show you to create a simple web page, style it, and serve it. Nothing in this lab should be particularly difficult.

Next, take a look at [CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics) from the Mozilla developer network. You don't have to do their specific examples, but pay attention to the concepts of CSS rulesets, selectors, and the idea of CSS elements as boxes stacked on top of boxes with margins and padding.

I've given you an example showing how to use class and id selectors in the `Notes` directory.

Finally, you want to look at how to use Bootstrap to create grid-based layouts. Bootstrap requires you to add a lot of extra markup to your pages, but makes it easy to create clean layouts that would be hard to make with default CSS. It will also automatically reconfigure your layout to work on smaller windows, which is important when designing pages that look good on both desktops and mobile devices.

Start with my Bootstrap notes in the `Notes` directory, then take a look at [this article](https://uxplanet.org/how-the-bootstrap-4-grid-works-a1b04703a3b7). The second half of the article goes into more detail about auto layouts and wrapping that are not important for now. Focus on implementing the basic Bootstrap grid with a
container, one or more rows, and columns within the rows.

## Plan and Tips

- **Week 1**: Start working on the front-end development material. We will go through examples in class. Your first goal shoud be to complete the initial lab on HTML and
CSS, then move on to using selectors. Read the notes on the 7-layer model and watch a few videos if you need to.

- **Week 2**: Complete the Bootstrap practice lab, then begin working on your web page project. Review the material on network performance and complete the homework problems.

- **Don't wait until the last minute**! You won't have time to finish everything if you wait until right before the deadline.

- Remember that you can work with your teammates and use any web resources that you find helpful.
