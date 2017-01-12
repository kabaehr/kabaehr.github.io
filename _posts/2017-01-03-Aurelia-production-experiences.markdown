---
layout: post
title: "Aurelia Experiences"
subtitle: "In this post I want to recap and write about all the experiences and remarkable things I faced in our Aurelia project."
date: 2017-01-04
author:     "Katharina Bähr"
tags: [Aurelia]
---


<p class="intro">
<span class="dropcap">I</span>n late March 2016, I wrote my first post and promised I would write some more about my experiences with Aurelia. 
Since then I only wrote one single post. This was not only because of missing time, or laziness, this was also because we hadn´t many problems with Aurelia itself.
There were no burning topics I wanted to write about or where I thought I should write it down to help someone.
But now I want to recap and write about all the experiences and remarkable things I faced in our Aurelia project.
</p>

<h3>How Aurelia fulfilled our expectations</h3>

In the post <a href="/aurelia-in-production/" title="link to the Aurelia in production post">Aurelia in Production</a>, I already explained why we chose Aurelia.
Some of the reasons were that Aurelia looked much cleaner, sophisticated and promising than other alternatives like <a href="https://angular.io/" title="link to Angular">Angular</a> at that time. Let´s see how our considerations worked out.

First I want to state out that we are still happy with the decision to take Aurelia.
It really keeps the promises written on the <a href="http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/what-is-aurelia/3">website</a> and stays out of your way, 
is highly extensible and unobtrusive.

<h3>Aurelia Releases</h3>

We started with some Aurelia beta version and it took a few month until Aurelia got <a href="http://blog.aurelia.io/2016/07/27/aurelia-1-0-is-here/"></a>released.
We had not a single breaking change with the update from beta to the release candidate and even the update
to the release 1.0 version went smoothly. We hadn´t one single breaking change since May at all.

Aurelia is using <a href="http://semver.org/">semantic versioning</a>, means that the 
version numbers are following the pattern <b>major.minor.patch</b> and only a major change
include a breaking change. If we take a look at the official
<a href="https://www.npmjs.com/search?q=aurelia&page=2&ranking=optimal">aureliaeffect libraries</a> at npm, we see that nearly all
libraries are still in version 1.x.x.

<img src="{{ '/assets/img/list-of-aurelia-libs.jpg' | prepend: site.baseurl }}" alt="list of aurelia libraries and there versions"/>

The only exception seems to be the <em>aurelia-bootstraper</em> which is version 2.0.1. But if you take a look at the corresponding
<a href="http://blog.aurelia.io/2016/12/08/big-aurelia-release-update/">blog post</a> that got published (like always if something got released), you see that
even in this major release, no breaking change was included.

<img src="{{ '/assets/img/aurelia-major-update.png' | prepend: site.baseurl }}" alt="snippet from the blog post regarding the major update"/>

It´s not like they don´t work on the framework or that they never produced breaking changes, <a href="http://blog.aurelia.io/2016/09/07/patch-releases-9-7-2016-2/">they did</a>.
But I think it shows that they are working on Aurelia with a good planning, upfront design and vision in mind. And it shows the experience of the Team and of <a href="http://robeisenberg.com/">Rob Eisenberg</a>
who worked on a couple of frontend framework already.


<h3>Easy to learn</h3>

One reason why we chose Aurelia over React was because we wanted something to what our Team is used to. 
The most of them are familiar with Angular 1.x, but we also have developers with a C#, WPF or Java background. 
The most of them lastly did web development when jQuery was in vogue.

It´s much to learn in this case, all these new frameworks, module loader, task runner, preprocessors, transpilers, etc...
But if you know HTML, and some JavaScript basics, Aurelia is the slightest problem. You can just start and after you learned a handful of conventions and the core principles
you are up and running.

Because it is standard based, you don´t have to learn how to "write Aurelia" and many concepts of it are not new and commonly known like data binding and dependency injection.
We are also using TypeScript, classes, interfaces and soon even things like async/await. This additionally makes it easier for our Team and it´s great that Aurelia supports it.

In my opinion and experience, Aurelia is quite easy to learn and to understand, especially if you have some basic web development knowledge.
Hence you can easy find and hire developers, even if they never heard about Aurelia.


<h3>Community</h3>

The framework is still not so commonly known, but the community is already great. Nearly every time when the documentation was not enough, we found answers in blog posts, their <a href="https://gitter.im/aurelia/Discuss" title="link to the aurelia gitter channel">gitter channel</a>
or at <a href="http://stackoverflow.com/questions/tagged/aurelia" title="link to stack overflow with tag aurelia">Stack Overflow</a>. And it´s not just a rumor that even core <a href="http://aurelia.io/team.html" title="link to aurelia team">team members</a> are answering your questions. How great is that?

<img src="{{ '/assets/img/Aurelia-SO.png' | prepend: site.baseurl }}" alt="list of aurelia libraries and their versions"/>

One thing I was really amazed by, is that an Aurelia core developer wrote me an email because he read my post about the usage of 
<a href="http://kabaehr.de/blog/aurelia-advanced-i18n/" title="link to aurelia i18n">aurelia-i18n</a> and asked for feedback about that library. That´s so cool and it shows that
they really care about the developers and the experience they deliver to the community.


<h3>Support</h3>

In difference to other frameworks, Aurelia is not just some side project, that emerged because somebody needed exactly that tool himself and open sourced it later.
Aurelia is a product of a company and there are a lot of people that are working on it.
That means that you get full support of everything you need because they want to earn money with this. They are developing Aurelia not only for themselves but for developers as their customers.
You can see this when looking at all the effort they take into their documentation, blog posts and how they deal, help and inform the community.

Some <a href="http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/business-advantages/2" title="link to buyable services">services you can book</a> are official training, video courses and consulting by experts.
We never used some of these, but for me, this is the reason why it doesn´t matter, or why it´s not a downside that it is not backed by some big player like Google or Facebook.


<h3>Risk and lifetime</h3>

I don´t see great risks when using Aurelia because it is really stable, a product of a company and fully open source.
Because Aurelia is standard based you don´t have to be afraid that you take a lifelong decision or something like that. The framework code is so less and unobtrusive that you can easily remove it if you need to.
In fact, we had the case where a colleague refactored an Aurelia demo application within two days and replaced Aurelia with jQuery.
You don´t want to do that, but you can and it will work without rewriting the whole code base.

I work in an enterprise company and the application we are currently developing with Aurelia is meant to work for many years (customers always want that, don´t they?).
Aurelia will not be the problem here, at the end, you could stay with some old version. But the whole browser and web ecosystem might be.

Rob Eisenberg himself started to <a href="http://eisenbergeffect.bluespire.com/joining-microsoft/" title="link to robs post about joining microsoft">work at Microsoft</a>.
He might be the visionary but there is a whole company with a great team and he will still continue to work on Aurelia.
In my opinion, this is surely an exciting development of circumstances but will not harm Aurelia in any way.


<h3>Other experiences</h3>

Until now we hadn´t problems regarding the performance of Aurelia. But we haven´t measured or optimized it yet and just following good practices like to use the right binding modes (one-time, one-way, two-way).
But if you believe the <a href="http://www.stefankrause.net/wp/?p=316" title="link to a JS framework benchmark">benchmarks</a>, Aurelia scores very well and they are continuously working on performance improvements. 


The application we are currently developing will also be a Cordova app, so it´s even more important not to bloat the size of the app unnecessarily up. 
The modularization of Aurelia into small libraries and the bundling system are great to keep your application size small.

There are a huge number of official libraries, like for pubSub messaging, dialogs, logging or I18N and a lot more of libraries published by the community.
Therefore the most time we needed some common feature, we hadn´t to start at 0 and could make use of some already existing implementation. Apart from this even jQuery plugins are easy integrable.
For me, this is a great plus point for a framework. When you don´t have to implement the same commonly needed thing always again and again, or copy the code from your last project.

For the most enterprise projects testing is a really important topic and I didn´t mentioned it yet, because there is not so much I can say.
The <a href="https://github.com/aurelia/testing" title="">aurelia-testing</a> library works really well together with Jasmine and Karma 
and End2End testing with Protractor is also not a big deal. This setup works for us and we didn´t tried to combine other testing libraries.


<h3>No resolutions for 2017 yet?</h3>

As you can see we are quite happy with Aurelia and there are many good reasons why you should give it a try. If you would like to read some more about it, I can recommend this <a href="http://ilikekillnerds.com/2016/12/give-aurelia-chance-2017/">post</a>. 
Aurelia has <a href="http://blog.aurelia.io/2017/01/02/aurelia-2017-resolutions/">great plans</a> for the future and I am convinced that it´s usage and prominence in the JavaScript world will continuously grow. 
