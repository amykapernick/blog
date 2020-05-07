---
title: NDC Minnesota 2019
date: 2019-05-16
description: A few of the amazing talks I saw during my time at NDC Minnesota in 2019.
categories: [Conference, NDC]
tags: 'posts'
layout: layouts/post.njk
featuredimage: ./img/d6etpv9x4auc2ys.jpg-large.jpg
---

This week I had the chance to not only attend, but speak at NDC Minnesota 2019 (their second year running in Minnesota). This was my second NDC conference (having spoken at London earlier this year) and once again I got the chance to meet a wide range of amazing people from different areas in tech and this time even made it to a few talks! This was my second time at an NDC conference (having spoken at NDC London earlier this year) and despite the fact that it was a much smaller conference both the attendees and other speakers were just as friendly and inclusive.

When I was in London, the first day I was caught up with preparing for my talk and the rest of the conference I got stuck in the hallway track (meeting all the people) so I only made it to 3 sessions during the whole conference (and one of those was mine). So this time I was determined to make it to more sessions, and thankfully I managed to beat it!

## Hack the Future - [Troy Hunt](https://troyhunt.com)

Although I like to keep up to date with what's happening in the cyber security and info sec areas, it's not really my forte so I don't see it a lot, but Troy is one of the few security speakers I've seen who gives a talk that's applicable to everyone.

If you ask anyone about security these days you're likely to get a response about passwords or password breaches. Being the founder of [Have I Been Pwned](https://haveibeenpwned.com/), we were almost guaranteed to have these mentioned and Troy didn't disappoint. Going back to the first ever computer that required a password, he pointed out that at least in those days we didn't have to worry about duplicating passwords for different devices/services! And while password breaches aren't great (we're all a bit sick of getting emails letting us know our accounts may have been compromised), they often reveal dodgy business practices that are in place, for example it was discovered in the infamous Ashley Madison breach that majority of the women had signed up from the IP `127.0.0.1` 🤔.

Whilst showcasing how tough it is to live on the Gold Coast, Troy showed how easy to was to remotely turn on [Scott Helme](https://scotthelme.co.uk/)'s car in the UK (apparently putting API keys inside the windscreen of cars isn't super secure). He also showcased a recent experience with a smart watch for children, and they had a padlock on their website so surely that must be secure! Scaring anyone who had purchased one of these devices (and possibly everyone else), they managed to find the details of the family that a device was assigned to, the details of the child that worse the device, the GPS location of the child as well as change the location of the child and change the approved contact so that anyone could call the child (and not require any action to answer the call).

We're in a world where everything seems to be connected (often when it doesn't need to be) and the sheer amount of personal information that services and devices have is astounding. Thankfully we have security personnel like Troy Hunt who engage in "acts of self promotion" and expose "minor flaws" in these systems before someone else does.

## [An AI with an Agenda](https://speakerdeck.com/arthurdoler/an-ai-with-an-agenda-how-our-biases-leak-into-machine-learning-ndc-minnesota-2019) - [Arthur Doler](https://twitter.com/arthurdoler)

With AI and Machine Learning being discussed more, we're also starting to hear more about the biases we're writing into our technology. More and more developers are using AI and ML, but do we actually know how it works? Arthur posed many different questions around biases in AI, and introduced six classes of problems with our AI/ML (with a dash of ghostbusters to help out).

1. **Phantoms of False Correlation**
   A lot of the time we're using technology because it's new and shiny and surely we should be using it. But do we really know what we're using it for and what questions we're asking?
   If you look at enough data, you can find "correlations", but does that really mean that one as led to the other? Is the divorce rate in Maine really affected by the consumption of margarine? Is the number of letters in the spelling bee winning word really related to the number of people killed by venomous spiders? And is the number of people who drown after falling into a pool really related to the number of films that Nicolas Cage has appeared in?
2. **Spectre of Biased Sample Data**
   We've seen this one go wrong in a few very public examples already including from Google and Amazon, the latter of which attempted to use machine learning to shortlist resumes for jobs. If you haven't heard what happened, it was demonstrated to prefer male candidates, due to the fact that most of the sample resumes it was given were from male candidates. Thankfully it was never actually used, but it demonstrates that while we give our technologies biased data, they will continue to show the same biases as we do.
   This is a really big issue with most of the uses of machine learning, and over and over we showcase that our computers are displaying biases based on gender, race, post codes and more depending on the data we feed it.
3. **Shade of Overly-Simplistic Maximisation**
4. 
5. **The Simulation Surprise**
6. **Apparition of Fairness**
7. **The Feedback Devil**

This is a topic we're seeing more and more of but this is the first time I've seen a talk specifically on the topic (I foresee many more in the future though).

## I'm gonna make you stop hating CSS - [Lemon](https://ahoylemon.xyz/)

It's not often I get to see someone else give a CSS talk at a conference, so I was excited to see Lemon give his talk the day before mine (and intimidated by the energy he brought to the stage). While there's a lot of us out there who love CSS, there's a lot of others who either haven't worked with it in a while or have strong memories of fighting with alignments or positioning.

Lemon reminded us that even though we have these amazing new shiny frameworks popping up every day, at the end of it it all comes back to HTML, CSS and JS and we need to make sure we're appreciating them. And he did that by making three points

1. **Things that are weird**
   Pretty much all of us were familiar with the **CSS is Awesome** graphic (often on a shirt or mug) where the text is overflowing from the box (it reminded me of the talk by [Mandy Michael](https://www.youtube.com/watch?v=oT7Ihsh10x4) who broke this apart), but while we all laugh, this isn't really a CSS problem, it's a design problem. Why does the design stipulate that the text must be so big that it doesn't fit in the box.
2. **Things that are great**
   We actually have a lot of really great things in CSS now, and to show us how great it is Lemon showed us how much easier it is now that we have things like Flexbox and Grid. I'll admit that I was a little biased on this point as he gave a shootout to my talk the next day but I still don't stop being excited about how many amazing things we can now do with just CSS!
3. **Things that you can try now**
   There are also so many new tools and games you can use to help learn more about CSS, and Lemon gave a shout out to things like [Flexbox Froggy](https://flexboxfroggy.com/), [Grid Garden](https://cssgridgarden.com/) or [CSS Battle](https://cssbattle.dev/).

## Networking at conferences for autistic people and introverts - [Dennie Declercq](https://twitter.com/DennieDeclercq)

Now I'm not autistic and I've recently discovered that I'm also not an introvert (turns out it's a completely different story when you find people you actually like), but Dennie had a lot of great advice in his talk for everyone (especially for a conference addict like myself). 

Conferences are amazing and lots of fun, but they can also be exhausting and draining both physically, mentally and emotionally (not to mention scary if you're not comfortable or familiar with talking to a lot of people you don't know. So Dennie discussed the steps he takes to prepare for and survive a conference, whether that be finding a common point of interest or making sure you have time out for yourself. 

Even us extroverts got a lot out of this talk and it was really great to hear about Dennie's experiences at conferences.

