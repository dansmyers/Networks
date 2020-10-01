# Sprint 1 &ndash; Deliverables

## Honor Code
On my honor, I have not given, nor received, nor witnessed any unauthorized assistance on this work.
## Team Members
Nitish Jagdev, Ryan King, Mohamed


## Performance

### Part 1

Suppose you have a link capable of sending data at 80 Mbits/sec. The expected round-trip latency of the link (that is, the time for a sender to transmit a frame across the link and then receive a response back) is 20 ms. What is the total expected time required to transmit a 1 Mbyte file from a source host to a destination at the other end of the link?

You may assume that the 80 Mbits/sec link rate is defined to be 80 * 2<sup>20</sup> bits per second.
120ms
Hint: Bits vs. bytes!

Hint II: Think about both the time to put the data on the link and the time
for the data to transit from the source to the destination

### Part 2

Suppose that you want to transmit the same 1 MB file to a destination that requires traversing two links. The complete round-trip time is still 20 ms. The first link transmits at a rate of 80 Mbits/sec and the second transmits at 60 Mbits/sec.

Give an estimate of the expected time required to transmit the file from the source to its destination.
253 ms
### Part 3

Repeat the example from Part 2, but now assume that there is a total of 512 KB of data queued and waiting to transmit at the second link at the moment that the 1 MB file arrives there. The entire 512 KB must transmit before our 1 MB file can be sent on the second link.

What is the complete estimated time &ndash; including transmission times, latency, and queueing delays &ndash; required to send the file now?
321ms
## Educational Plagiarism

Let's make your own startup!

Here's how you do it:

1. Pick any well-known startup-like company: Uber, Airbnb, Instacart, Bytedance (Tik-Tok), Casper, Warby Parker, SpaceX.
Uber for Tandem
2. Pick anything else that exists. Literally anything.

3. Put the two together.

Airbnb for pools? [Swimply](https://swimply.com/). For RVs? [RVShare](https://rvshare.com/rv/airbnb-for-rvs). Uber for moving? [Dolly](https://dolly.com/uber-for-moving/). For haircuts? [Shortcut](https://www.getshortcut.co/). Warby Parker for shaving? [Harry's](https://www.harrys.com/en/us). The possibilities are endless! Compare to ["Die Hard" on an X](https://tvtropes.org/pmwiki/pmwiki.php/Main/DieHardOnAnX).

Once you've got your startup idea, all you need to do is create a landing page to kick off your explosive customer acquisition curve and then the venture capital will flow.

Here's what I want you to do for this project:

- Create your own startup concept. It can be as serious or ridiculous as you want, but follow the *X for Y* format.

- Build your startup's front page using Bootstrap and CSS styling. To give you some guidance, I want you to **create a page that mimics the style of other startup-like companies**. Your page should use the Bootstrap framework with a grid layout and CSS for styling.

- You only need to create the front page; you don't need to build an entire site.

- Write all of your HTML and CSS by hand in one file. Don't use a pre-built template.

- You don't need to implement any advanced features like navbars, video, or forms. Focus on using rows, columns, headings, and images; pay attention to details like font choice, colors and separation between elements.

### Examples to Use as Starting Points

- [Clare](https://www.clare.com/): Paint for millenials!

- [Butcher Box](https://www.butcherbox.com/): Meat for millenials!

- [Away](https://www.awaytravel.com/): Suitcases for millenials!

- [Hello Fresh](https://www.hellofresh.com/): Food in boxes for millenials!

- [Anchor](https://anchor.fm/): Radio for millenials!

- [The Bootstrap homepage](https://getbootstrap.com/)

These are all more complicated than what you will likely create for your own site, but they will give you examples of the look and feel you should be going for. You can easily poke around the web and find more sites.

### Disclaimer

Plagiarism is bad, okay? I think we've covered that a bunch of times. In general, you should treat the content of web pages and their unique styling as being the intellectual property of the creators, the same as you would for written works, music, and other pieces of visual art. As computing professionals, these rules are in your best interests, because they help give value to your skills and intellectual labor.

However, there is a long tradition of building skills by studying the work of professionals that have come before you, and this kind of work is allowed as educational fair use under copyright law. Therefore, what I'm asking you to do here should be construed as an educational exercise that's being done purely for learning with no intent to profit.

### Tips

- **This is intended to be a creative project that requires experimentation and figuring things out on your own**. You **will** need to spend time searching the Internet to learn how to create the effects that you want. This is deliberate: using documentation and figuring out answers to your own questions is an important part of web development.

- Start early! You'll need time to experiment.

- Look at lots of different example pages.

- Build incrementally. Check each change you make to see if it produces the effect you want.

- Start with simple ideas and then make them more complex. It's okay, for example, to use placeholders or dummy text while you get the layout refined.

- You don't have to recreate complex graphics, charts, or figures. Replace them with any placeholder or fair-use image that you want to use.

- You can use the "View Source" feature of your web browser to look at the source code for a page. You'll probably find that most commercial pages are loaded up with analytics and tracking scripts and use templates rather than raw Bootstrap code, so you might not be able to get much from them, but you can always check.

- The [Bootstrap examples](https://getbootstrap.com/docs/4.0/examples/) page shows off a bunch of different Bootstrap features in minimal templates. In particular, you might find a use for the "Pricing" template, which shows how to use cards. Look at the "Jumbotron" for an example of creating a huge callout at the top of the page.
