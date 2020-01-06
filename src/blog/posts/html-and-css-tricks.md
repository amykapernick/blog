---
templateKey: blog-post
title: HTML and CSS Tricks
publishDate: "2019-07-22"
updateDate: "2019-07-22"
description: Here are a few tricks I use for HTML and CSS only UI elements
mainBlog: The Freelance Guide
tags:
  - CSS
  - HTML
featuredImage: /img/blog/screenshot_2019-07-22-html-and-css-only-testimonial-carousel.png
---

So recently I shared a HTML and CSS only testimonial carousel, and was accused of witchcraft 🤣

![](https://media.giphy.com/media/enzPQyHVWMfx6/giphy.gif)

Despite the fact that this absolutely made my day (and resulted in me having to go home that night and re-watch _The Holy Grail_), I decided to compile a few of my little JS-free tricks.

---

Now some of these can be a little janky, and not quite as smooth as when using JS or an external plugin or library, but they're also much better for performance and don't rely on loading heavy external resources.

## Testimonial Carousel

<https://codepen.io/amys_kapers/pen/vqowbj?editors=0100>

I had to put together a testimonial carousel for a project, normally I would just have a single testimonial but for this one I thought I'd see how to do this in HTML and CSS only.

For this I'm using radio buttons and the next sibling selector (`element + sibling {}`) to test if the button is selected. I'm also using a different CSS hack to make nice looking radio buttons.

For the HTML, each testimonial has an `input`, `label` and `blockquote` element, although you could omit the `label` part and use vanilla browser-supplied radio button styling.

```html
<input type="radio" id="quote-1" name="testimonials" />
<label for="quote-1">Testimonial 1</label>
<blockquote>
  CSS and HTML are awesome, you can do so many amazing things with them.
</blockquote>
```

The `id` on each `input` allows you to relate the `label` to the input using the `for` attribute, this allows you to click on the `label` to check the `input` rather than just on the `input`. This should be different for each testimonial.

The `name` for the inputs should be the same across all, this creates a group of them so only one `input` can be checked at any one time.

The `blockquote` is then the testimonial we're displaying. You can put anything you like in the `blockquote`, including `p`s, `img`s or `cite`.

Most of the CSS is to make things look pretty, but this is the bit for the functionality:

```css
input[type="radio"]:checked + label + blockquote {
  display: block;
}

blockquote {
  display: none;
}
```

The first part of the code is overly specific, but we need to make sure we're only getting the blockquote associated with each testimonial. You could use classes or another attribute to link the two together, but for ease of maintainability I chose to use siblings instead.

That's all there is to it!

Flexbox then allowed me to re-order it visually to keep the radio buttons at the bottom.

```css
body {
	display: flex;
	flex-wrap: wrap
	justify-content: center;
}

blockquote {
	width: 100%;
}

label {
	order: 2;
}
```

Then I made the radio buttons nice and pretty.

Setting the font size and colour to make the label invisible makes the label still accessible to screen readers but hides it visually.

Then I set the label to be a circle with a border, and the `:after` pseudo element to be the middle of the selected radio button.

```scss
input {
  display: none;
}

label {
  border: 1px solid #5b5b5b;
  border-radius: 50%;
  color: transparent;
  font-size: 0px;
  height: 20px;
  width: 20px;
  position: relative;

  &:after {
    background: #16a6b1;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
  }
}

input[type="radio"]:checked + label:after {
  content: "";
}
```

You can then style the blockquote however you like.

It's a little janky, and if the testimonials are different heights things will move around when switching between the testimonials, I'm still working on a solution to fix this.
