---
title: CSS Grid - What is this Magic?!
date: 2020-06-25
description: 
categories: [CSS, 'CSS Grid']
draft: true
featured: /img/dev/css-grid/grid_cover.png
excerpt: <p>We've come a long way with our CSS layouts, from the table layouts that continue to haunt our nightmares, to floats and clearfixes, through flexbox and negative margins, all the way to CSS grid and our ability to fully control our layouts in both directions.</p>
---

## The Evolution of CSS/HTML Layouts

In the beginning, there was darkness and emptiness and a man named Tim Berners-Lee said "Let there be internet".

![http://info.cern.ch/hypertext/WWW/Technical.html](/img/dev/css-grid/the_internet.png)

The internet was a simpler in those days, with just HTML content arranged on the page as you would in a word document. But within the next couple of years people got sick of looking at Times New Roman and so then Tim said "let the fonts and colours and sizes and positions be changeable". And then there was CSS.

But this still wasn't good enough and so not long after that, people discovered you could use tables for layouts. This was great because you could break the webpage up into a grid, merge cells where needed and embed tables inside tables to give you better control about how your content was laid out on the page.

@[codepen](maKOLb)

Before long though, we ended up with excessive complexity in our layouts, with tables inside tables inside tables

```html
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
        <tr>
            <td valign="top" align="center">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td valign="top" align="center">
                                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td valign="top">
                                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td valign="top">
                                                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td valign="top" align="center">
                                                                                <table cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td valign="top" align="center">
                                                                                                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td valign="top" align="center">
                                                                                                                <table cellspacing="0" cellpadding="0" border="0" align="center">
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td valign="top" align="center">
                                                                                                                                <table>
                                                                                                                                    <tbody>
                                                                                                                                        <tr>
                                                                                                                                            <td valign="top">
                                                                                                                                                <a href="">
                                                                                                                                                    <img src="image.png" />
                                                                                                                                                </a>
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    </tbody>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
```

Then as people started taking about *Responsive Web Design* and we needed to create layouts for different sized devices, we transitioned to using floats for our layouts.

@[codepen](WLyRGX)

By using floats, we were back to following the separation of concerns principle, where HTML was for the content and interface and CSS was for the visual look and interface. But before long, we found that floats weren't really working well either. You had to clearfix a bunch of things, you had to use even more containers to keep floating elements together, when using media queries things got messy continually changing and resetting the previous code and you had to do a bunch of calculations to make sure it equalled 100%. Oh, and you often had to use `!important`.

```scss
.parent {
	clear: both;
	overflow: hidden;
}

.child {
	float: left;
	width: 100%;
	
	@media (min-width: 500px) {
		margin-right: 2%;
		width: 49%;

		&:nth-child(2n) {
			margin-right: 0;
		}

		&:nth-child(2n + 1) {
			clear: both;
		}
	}

	@media (min-width: 800px) {
		clear: none !important;
		margin-right: 1% !important;
		width: 32.6666667%;

		&:nth-child(3n) {
			margin-right: 0 !important;
		}

		&:nth-child(3n + 1) {
			clear: both !important;
		}
	}
}
```

So by the time we'd memorised how much 100% width divided by 6 elements with a 1% margin was, flexbox was a dream! We didn't have to do any of that percentage math anymore, and for the most part we didn't even need to use media queries! Even better, flexbox brought back the ability to easily vertically centre content, something we hadn't been able to do since tables.

Flexbox finally started to give us the functionality we needed from our CSS, and we no longer needed to write complicated code, work with highly fractions of percentages and our code was more responsive than ever. But although Flexbox was really good for flowing content on one axis, there was limited control in the cross axis, and having gaps between the items tended to get a little complicated (often needing negative margins).

```css
.parent {
	display: flex;
	width: 102%;
	margin: -1%;
}

.child {
	flex: 1 1 auto;
	margin: 1%;
}
```

Things were starting to look up though, we were finally starting to get CSS technologies that were actually built for layout. And in the distance, we could see the cavalry on it's way.

In 2017, CSS Grid landed on all new major browsers and gave us everything we'd been asking for for CSS Layouts. Like Flexbox, we were able to define a set of constraints and let the browser do the work to make it responsive but we were now also able to control the layout in both directions.

@[codepen](roqyOq)

With grid, we were now able to define areas of the layout, whether specific elements spanned multiple areas, how the elements inside the grid behaved and reduce a lot of the code and thinking needed to make a layout responsive.

But isn't grid just a newer fancier version of the table layout that's now frowned upon? No, grid is built specifically for creating layouts, it's designed for use rather than tables which we used as a hack and a workaround until we had something better to use.

> Tables aren't bad, they're misunderstood

CSS Grid also helps us get back to writing logical and semantic HTML. We're no longer required to write our HTML based on the logical flow of the document and let CSS rearrange it visually. When done right, this means that our content can be more accessible to anyone using reader mode, saving an article for later or using a screen reader or assistive technology.

## Building a Layout with CSS Grid

Thanks to CSS Grid, mocking up the layout of an app now not only takes less time, it takes less code. Here we have a simple note taking app.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6c568a2-23ad-4712-831f-cceca16248e5/wireframe.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6c568a2-23ad-4712-831f-cceca16248e5/wireframe.png)

Wireframe layout of our note taking application.

We've got our HTML structure, and we know what we want the layout to look like, so now's the chance to *Get Griddy*.

```html
<body>
	<header>
      	<a href="/">
        	<h1>My Notebook</h1>
      	</a>
  	</header>

	<section>
		<nav>
			<article>
				<h2><a href="/notes/note-1/">Note 1</a></h2>
				<time>30 Jan 2019</time>
			</article>

			<article>
				<h2><a href="/notes/note-2/">Note 2</a></h2>
				<time>4 May 2019</time>
			</article>

			<article>
				<h2><a href="/notes/note-3/">Note 3</a></h2>
				<time>18 Oct 2019</time>
			</article>
		</nav>
	</section>
	<main>
		<article>
			<header>
				<h1>Note 1</h1>
				<time>30 Jan 2019</time>
			</header>
			<main>
				My Note Content is here
			</main>
		</article>
		<aside>
			<h3>Created On</h3>
			<time>26 Dec 2018</time>
			<h3>Tags</h3>
			<ul>
				<li>Tag 1</li>
				<li>Tag 2</li>
				<li>Tag 3</li>
			</ul>
		</aside>
	</main>

	<footer>
		<nav>
			<a href="/">Home</a>
			<a href="/contact">Contact Us</a>
			<a href="/support">Support</a>
			<a href="/pricing">Pricing</a>
		</nav>
	</footer>
</body>
```

It's important to note that this structure is also semantic HTML. No extra container `div`s, just pure semantic HTML.

Including a few starting lines of CSS to show the different elements, with different background colours and set a few font sizes and colours, this is what our HTML structure looks like. The `header` is green, the `section` for the side `nav` is yellow, the note `article` is blue, the `aside` is orange, the `footer` is pink and although you can't currently see it, the `body` is purple.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b86c8a0c-71d7-4b94-81f0-be0b3442e091/step-1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b86c8a0c-71d7-4b94-81f0-be0b3442e091/step-1.png)

### Creating the grid

The first step is to set the `body` to use CSS grid:

```css
body {
	display: grid;
}
```

This doesn't make any difference to the layout yet though.

If we look at the wireframe of our app, it can be split up into 5 equal columns.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35735e61-29b0-4d8c-b79a-5b703b9c98be/Inkedwireframe_LI.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/35735e61-29b0-4d8c-b79a-5b703b9c98be/Inkedwireframe_LI.jpg)

We can define these columns using the `grid-template-columns` property.

```css
body {
	display: grid;
	grid-template-columns: 200px 200px 200px 200px 200px;
}
```

This will defines a grid with 5 equal width columns, each 200px wide. Alternatively, you can write this as

```css
body {
	display: grid;
	grid-template-columns: repeat(5, 200px);
}
```

#### `repeat()`
The repeat function comes with CSS Grid and allows us to define multiple columns (and rows) more easily. The sizes being defined can also be in any CSS unit you like (`px`, `em`, `rem`, `vw`, `vh`, `%`, etc).

```css
repeat(number_of_times, size)

// Example
repeat(3, 200px)
// result: 200px 200px 200px

// Can also define patterns
repeat(2, 10px 20vw)
// result: 10px 20vw 10px 20vw
```

So to create 5 equal width columns, we could use percentages to make the grid responsive.

```css
body {
	display: grid;
	grid-template-columns: repeat(5, 20%);
```

But we then need to recalculate the percentages if our grid changes, eg. if we want it to be 6 columns wide. Instead, we can use a new unit for CSS Grid, the `fr` unit

```css
body {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
}
```

The `fr` unit is used to create equal sized (or relatively sized) grid columns (or rows). Similar to when we'd use percentages to size items, this removes the need to recalculate as the grid changes size and takes into account any existing or fixed size content as well as any gaps between the items.
In the Codepen example below, we have 4 columns in the grid, two of them are fixed width (`100px` and `50px`) and the other two are defined with the `fr` unit (`1fr` and `2fr`). When calculating how wide these columns will be, first we take into account the current width of our grid element, (eg. `510px`), then take away the existing defined content (eg. `100px` + `50px` = `150px`), then take away the gap between each grid child, (eg. `20px` gap * 3 gaps = `60px`), then divide by the number of `fr` units defined in our grid, (eg. `1fr` + `2fr`  = `3fr`)

$$(screenSize - existingContent - (gap * numGaps)) / definedFrs = 1fr$$

$$(510px - (100px + 50px) - (20px * 3))/3fr = 100px = 1fr$$

@[codepen](YzPVgPZ)

As the grid element changes size, so will the two `fr` columns, with the `2fr` column being twice as big as the `1fr` column.

```css
body {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
}
```

So for our grid, if we define 5 columns of `1fr` wide, they'll each be the same width

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b1a6f67-97ca-48ae-84b0-bbe93199ffba/step-2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b1a6f67-97ca-48ae-84b0-bbe93199ffba/step-2.png)