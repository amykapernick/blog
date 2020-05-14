---
title: Template
date: 2020-05-07
description: Draft Template for blog posts
categories: undefined
tags: 'posts'
layout: layouts/post.njk
draft: true
---

"You're all right," Mrs. Weasley muttered distractedly, releasing Mr. Weasley and staring around at them all with red eyes, "you're alive. . . . Oh boys. . And to everybody's surprise, she seized Fred and George and pulled them both into such a tight hug that their heads banged together. "Ouch! Mum - you're strangling us -" "I shouted at you before you left!" Mrs. Weasley said, starting to sob. "It's all I've been thinking about! What if You-Know-Who had got you, and the last thing I ever said to you was that you didn't get enough OW.L.s? Oh Fred. . . George. ." "Come on, now, Molly, we're all perfectly okay," said Mr. Weasley soothingly, prising her off the twins and leading her back toward the house. "Bill," he added in an undertone, "pick up that paper, I want to see what it says. . ."

## Images

![Image Caption](/img/rottnest-lighthouse-2500.jpg)

![](/img/rottnest-lighthouse-2500.jpg)

## Blockquotes

> "Do us a favor, Perce," said Bill, yawning, "and shut up."


## Embeds

### Twitter

{% tweet "https://twitter.com/Amys_Kapers/status/1260845733109850116" %}

https://twitter.com/Amys_Kapers/status/1260845733109850116

### Instagram

https://www.instagram.com/p/B_lyBmxp_tG/

### Spotify

https://open.spotify.com/playlist/6gMk1wEc0IiqDJklHIPzQn?si=lwPnRPCuQ3GK4PJocHy6hQ

### Twitch

https://www.twitch.tv/amyskapers

### Vimeo

https://vimeo.com/413450595

### Can I Use

{% caniuse 'css-grid' %}

### Codepen

@[codepen](YzPVgPZ)

---

## Lists

- Here
- Is
- A
- List

### Numbered Lists

1. First item
2. Second item
3. Third item

### Task Lists

- [x] Done
- [x] Done
- [ ] Not Done
- [ ] Not Done

---

## Code

There are `inline code snippets` as well as

```html
<p>Blocks of code</p>
```

```javascript
Object.entries(profiles).forEach(([key, value]) => {
  if (tags.indexOf(profiles[`${key}`]["id"]) > -1) {
    author = profiles[`${key}`];
  }
});
```

```bash
yarn install
```

```scss
pre,
code {
  &[class*="language-"] {
    color: #16a6b1;
    font-size: 1em;
    font-family: "Space Mono", "Anonymous Pro", monospace;
    text-align: left;

    &.line-numbers {
      padding: 0;
    }

    &::selection,
    &::mozselection {
      background: #6ca7d8;
    }
  }
}
```

