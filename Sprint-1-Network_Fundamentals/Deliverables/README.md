# Sprint 1 &ndash; Deliverables

## Team Members

Include a file in your repository named `team.txt` listing your team members.

## AI Usage

You are allowed to use AI tools, including ChatGPT, in any way that you want for this assignment. In particular, you **should** use them for the web development part to create a compelling page.

## Performance

### Part 1

Suppose you have a link capable of sending data at 80 Mbits/sec. The expected round-trip latency of the link (that is, the time for a sender to transmit a frame across the link and then receive a response back) is 20 ms. What is the total expected time required to transmit a 1 Mbyte file from a source host to a destination at the other end of the link?

You may assume that the 80 Mbits/sec link rate is defined to be 80 * 2<sup>20</sup> bits per second.

Hint: Bits vs. bytes!

Hint II: Think about both the time to put the data on the link and the time
for the data to transit from the source to the destination

### Part 2

Suppose that you want to transmit the same 1 MB file to a destination that requires traversing two links. The complete round-trip time is still 20 ms. The first link transmits at a rate of 80 Mbits/sec and the second transmits at 60 Mbits/sec.

Give an estimate of the expected time required to transmit the file from the source to its destination.

### Part 3

Repeat the example from Part 2, but now assume that there is a total of 512 KB of data queued and waiting to transmit at the second link at the moment that the 1 MB file arrives there. The entire 512 KB must transmit before our 1 MB file can be sent on the second link.

What is the complete estimated time &ndash; including transmission times, latency, and queueing delays &ndash; required to send the file now?

## Startup Landing Page

Let's make your own startup!

Here's how you do it:

1. Pick any well-known startup-like company: Uber, Airbnb, Instacart, Bytedance (Tik-Tok), Casper, Warby Parker, SpaceX.

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

- [Hubspot](https://www.hubspot.com/) (inbound marketing and customer-relationship management tools)
- [Snowflake](https://www.snowflake.com/en/) (major cloud data platform)
- [Clare](https://www.clare.com/) (buying paint online, good example of how site design enhances a fundamentally boring product)
- [Harry's](https://www.harrys.com/en/us) (direct-to-consumer razors)
- [Warby Parker](https://www.warbyparker.com/) (glasses, the OG direct-to-consumer example brand)
- [visvim](https://www.visvim.tv/) (more minimalist, but the basic elements are still there)

### Guidelines

Your page should look like a **professional, well-designed modern web page**. The 1990's were awesome (I was there), but not the greatest era for web design, so I don't want to see some janky Web 1.0 basic-CSS looking piece of garbage.

This means that you'll need to **do some research** on how to create a compelling page. You may want to start with [this lab](https://github.com/dansmyers/IntroToCS/blob/main/Labs/B-Modern_Web_Page.md), which will give you some tips.

I expect that you'll use AI tools freely to help you with this project. A few tips:

- Use either Bing AI in Creative mode or Anthropic's Claude as your main model. Both are better than the free version of ChatGPT. Remember that Bing can search the Internet, so it can often return better responses, but it's still not a substitute for a real search engine.

- Perplexity.ai is another AI-powered search engine. It's an alternative to Bing if you want to pull information from the Internet and synthesize it into an answer.

- Start by having a conversation with the AI about your project, your idea, and what you want to create. Don't try to get the answer faster; instead, think about getting **the right question** faster.

- Ask for advice about things other than code: color schemes, fonts, copy for the different sections.

- AI is a tool to help you execute your own vision. That means you need to **have a vision**. Always ask yourself: Is this good? Is it doing what I want? Can it be improved? Cultivate **taste and judgment**.


## Reflection

After you finish the web page project, have a reflective conversation with an AI chatbot acting as your coach. The goal of this step is for you to better integrate what you learned from working with the AI tool, so that you can take those lessons forward into future projects.

Use the following prompt:

*Imagine you are my coach. I just completed a project using AI tools to assist me in developing a landing page for a new startup company. Please have a reflective discussion with me as my coach to help me synthesize my learnings. Ask me questions like:*

- *What parts of the process went well or poorly when using the AI tools?*
- *Were there times when relying on my own ideas would have been better?*
- *How did I balance integrating AI input with maintaining my own perspective and voice?*
- *What criteria did I use to evaluate the AI's suggestions and determine what to incorporate or reject?*
- *How has this experience shaped my views on using AI tools moving forward?*
- *What advice would I give peers about getting the most out of AI tools while avoiding potential pitfalls?*

*You can prompt me with follow-up questions and prompts to push my reflection deeper. The goal is to synthesize my learnings and think critically about integrating AI thoughtfully. Please act as my coach guiding me through this reflective discussion.*

Record the transcript of your conversation in a file called `reflection.txt`, then add a few sentences summarizing your take-aways and lessons learned after completing the chat.


### Tips

- **This is intended to be a creative project that requires experimentation and figuring things out on your own**. You **will** need to spend time searching the Internet to learn how to create the effects that you want. This is deliberate: using documentation and figuring out answers to your own questions is an important part of web development.

- Start early! You'll need time to experiment.

- Look at lots of different example pages.

- Build incrementally. Check each change you make to see if it produces the effect you want.

- Start with simple ideas and then make them more complex. It's okay, for example, to use placeholders or dummy text while you get the layout refined.

- You don't have to recreate complex graphics, charts, or figures. Replace them with any placeholder or fair-use image that you want to use.

- You can use the "View Source" feature of your web browser to look at the source code for a page. You'll probably find that most commercial pages are loaded up with analytics and tracking scripts and use templates rather than raw Bootstrap code, so you might not be able to get much from them, but you can always check.

- The [Bootstrap examples](https://getbootstrap.com/docs/4.0/examples/) page shows off a bunch of different Bootstrap features in minimal templates. In particular, you might find a use for the "Pricing" template, which shows how to use cards. Look at the "Jumbotron" for an example of creating a huge callout at the top of the page.
