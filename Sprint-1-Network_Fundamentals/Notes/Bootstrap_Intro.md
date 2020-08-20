# Introduction to Bootstrap

## Background

Boostrap was originally developed by Mark Otto and Jacob Thornton at Twitter and was released as an open-source framework in 2011.

Bootstrap's main us is creating responsive, grid-based layouts. It provides convenient tools for dividing your page up into a layout of rows and columns and can automatically
adjust the layout based on the size of the viewing window, which is important for creating mobile-first sites.

## Basic Bootstrap Layout

Here is an example HTML page that shows off the basic elements of Bootstrap. Open up your Mimir workspace, and create a new HTML file called `bootstrap_example.html`. Copy the 
code below, save the page, then serve it using `srv` (review the first HTML lab if you need to refresh how to view pages on Mimir).

```
<!doctype html>
<html>
    
    <head>
        
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        
    </head>
   
    <body>

        <!-- All Bootstrap content must be enclosed in a container div -->
        <div class="container">
            
            <!-- The container must contain one or more row divs -->
            <div class="row">
            
                <div class="col-6">
                    This is the left column.
                </div>   <!-- /col-6 -->  
                
                <div class="col-6">
                    This is the right column.
                </div>   <!-- /col-6 -->  
                
            </div> <!-- /row -->
            
        </div> <!-- /container -->
        
        <!-- JS, Popper.js, and jQuery -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    </body>
    
</html>
```

Let's start by pointing out a few important things in this example.

### CDN Links

There is a link to the bootstrap CSS stylesheet in the `<head>` section. Similarly, there are three required JavaScript files being loaded at the bottom of `<body>`. You don't
need to do anything with any of these lines.

It's possible to setup your project so that the required files are hosted locally, rather than being loaded from a remote CDN site,
but we're going to stick with the link-based setup for now.

### `<div>` Tags

The page is made up of a series of `<div>` tags. Think of each `<div>` as representing a "division" of the page. By itself, `<div>` just functions like a `<p>` tag: it's main
purpose is to allow you to create **a named region of the page** that you can style and interact with.

**Everything** in Bootstrap runs off of `<div>` tags with attached class labels. If you want to do something in Bootstrap, there's a 90% chance you're going to do it by making
a `<div>` and then adding class labels that control the effect you want.

The downside of this approach is that you end up making a lot of `<div>` tags. Notice how I've used comments to mark the closing of each `<div>`: you want to do that or you'll
quickly get lost.

### Containers

Take a look at the first `<div>` inside the `<body>`. It has class label `container`.

**All page content must be inside a container**. Let me say that again: ***ALL PAGE CONTENT MUST BE INSIDE A CONTAINER***.

(Where must all page content be? ***INSIDE ONE TOP-LEVEL CONTAINER***.)

As you lay out the page, you're going to create additional rows and columns, discussed in more detail below, but everything you create must be enclosed by one top-level
container `<div>`.






