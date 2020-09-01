# CSS Selectors

## Introduction

This lab will show you to use CSS selectors in your HTML files. There are two kinds of selectors:

- `id`, which allows you to assign a name to an individual element of the page; you can then apply styling and interactions to that element using its name.

- `class`, which allows you to assign one or more page elements to a category. You can then apply styling and interactions to all of the elements in a class with only
one CSS rule.

**Both of these features are important**. In particular, the Bootstrap framework, which you'll see in the next lab, relies heavily on using class labels to specify page layout
and styling. ID's will become important when we study JavaScript: the combination of id names and JavaScript allows you to select and control individual elements of the page.


## General Things to Keep in Mind

- There are a **lot** of CSS properties. You won't be able to memorize them right away, so don't be afraid to look up the one you need for a specific effect.

- There are no "required" properties that must be set. For example, you don't have to set a font, font color, or background color if you're fine with the page defaults.

- All of my examples will show the CSS integrated into one main page. For larger projects, you would probably create a separate `.css` file and link it into your HTML.
We'll see examples of that later.


## Review of Basic CSS

If you haven't done so, complete Lab 1 before attempting this one.

Here's a basic web page that shows off simple CSS style selectors. You can load the page into Mimir and view it from there.

```
<!DOCTYPE html>
<html>
    <!-- This is an HTML comment. -->
    
    <!-- head block contains metainformation about the page. -->
    <head>
        <title>This appears at the top of the browser.</title>
        
        <style>
            body {
                font-family: Georgia, serif;
                font-size: 18pt;
                background-color: #663399;
                color: #eeeeee;
            }
        </style>
    </head>
    
    <!-- Body block contains page content. -->
    <body>
        <h1> Pointiest Guitars of All Time </h1>
        
        <h2> Dean Razorback Dimebag </h2>
        
        <img src="https://www.deanguitars.com/images/productimages/rzrdbcbknc/rzrdbcbknc.png" />
        
        <h2> Whatever This Is </h2>
        
        <img src="https://4.bp.blogspot.com/-JUSnyfGjK6E/Ty1JBvrGqWI/AAAAAAAAKdQ/Mlx4X8TuJ80/s1600/h1.jpg" />
        
    </body>
</html>
```

Here are the important things to note:

- The `<head>` block contains metainformation about the page. Here, `<title>` controls the string that appears in the browser tab and `<style>` controls the CSS rules for
the page. It's common to add other rules to the `<head>` block, particularly ones that specify the page's native language and character encodings; I've ommitted those for now,
but we'll see them in the next lab.

- The `<style>` block contains one rule, which specifies formatting for everything that's contained within the `<body>` tag. Because `<body>` contains all of the page's content, 
this has the effect of setting the default appearance for the entire page.

- The specific rules applied to the `<body>` are straightforward: `font-family` specifies a list of font options (in preference order, so the browser picks the first one
available), and the color rules set the background and font colors using RGB triples.

### More Rules

Let's add another rule to the `<style>` block to control image width. Here's a rule that sets the maximum width of an image to 500 pixels. The image's height will be scaled
proportionally. Add it to the `<style>` block and reload your page to see the effect.

```
img {
    max-width: 500px;
}
```

Here's one that changes the appearance of the `<h2>` tags to use a small caps font.

```
h2 {
    font-variant: small-caps;
}
```

What if you want to make the top-level heading bigger? You could adjust the `font-size` property specified in the `<body>`, but that would scale all fonts in the document, not
only the top-level heading.

You can set another value of `font-size` in an `h1` rule:

```
h1 {
    font-size: 40pt;
}
```

**The browser always applies the most specific set of rules for each page element**. In this case, it will use the `<h1>` font size for top-level titles and the general `<body>`
font size everywhere else.


## Using `id` Selectors


## Using `class` Selectors


## Combining Selectors
