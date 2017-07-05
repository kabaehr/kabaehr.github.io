---
layout: post
title: "Aurelia components: difference between element and attribute"
subtitle: "Custom elements and custom attributes are two different concepts and the distinction is not always clear"
date: 2017-03-14
author:     "Katharina Bähr"
tags: [Aurelia]
---


<span class="dropcap">A</span>ctual this is no pure Aurelia specific topic because the idea of custom attributes and custom elements are web components concepts. In principle, web components consist of four <a href="https://www.w3.org/" title="link to w3c">W3C</a> <a href="https://www.w3.org/standards/techs/components#w3c_all" title="link to web component specifications">specifications</a>.
Therefore this topic concerns also other component based frameworks. Despite this, the examples are written in Aurelia.


<h2>What are custom components anyway</h2>

**TL;DR** custom components are great and can be used like standard HTML tags e.g. <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code> or <code>&lt;span&gt;</code>

There are a lot of standard HTML elements like <code>&lt;input&gt;</code> or <code>&lt;button&gt;</code> which you can use to create your interface. The idea behind custom elements is born out of the wish to create custom HTML-tags with an own view and/or logic.

Imagin you want to use clickable info-icons with special behavior (e.g. open a information text) on different pages of your application. Dependent on the requirements you could achieve this with plain CSS, use of event handlers, a jQuery plugin.... But all of these solutions would require either a lot of configuration, installation of a plugin or awkward code sharing or duplication.

Instead, how nice would it be to just write <code>&lt;info-icon&gt;&lt;/info-icon&gt;</code> and that´s everything.
The whole logic and presentation is located inside the custom element and you could just import and use it. Everywhere you need just like you would use the normal <code>&lt;img&gt;</code> or <code>&lt;i&gt;</code> tag. 

Because this sounds great, pretty simple to use and so overdue, the most modern frameworks make use of custom components. Hopefully, this will land natively inside the browsers and the language soon. So you will be able to use your Aurelia components in other plain JavaScript applications, together with other frameworks and everywhere else on the web.

Let´s start with the differences.

<h2> Custom Element</h2>

Custom elements always have a view and optionally own logic. That means a custom element is either a HTML only component or have a HTML and a JS part. CSS is often also included and referenced from the view, however, inline styles are also possible.

A custom element can be a complicated UI control like a *datepicker* or a *selectbox* with search capability but it can be just a few lines of HTML with or without a little bit of JS as well.

Using custom elements even for simpler components has some advantages regarding readability, maintainability and encapsulation. May take a look at <a href="https://gist.run/?id=999099938fc540ff93cdbe73760b91fb" title="">the examples</a> to get a better idea.


<h2>Custom Attribute</h2>


A custom attribute can be used to extend the functionality of any existing HTML element and has **no** view. You can transform simple elements to more advanced ones, e.g. let selectboxes load data from an API´s, make data transformations on text elements and much more.

Actually, a custom attribute has no additional HTML. Nevertheless, it can make sense to inject some over JS. But normally you just use the HTMLElement, it´s events, properties, innerHTML and such to extend it for your needs.
You find some examples for custom attributes in the link above.


<h2> Never stop practicing </h2>

You may now understand the idea behind custom elements and custom attributes. But to make proper use of it, you may just need some practice. To get a feeling when to encapsulate some parts of your application into a custom element or a custom attribute. When it make sense and when not.

It often happens that at the start you think that something is not worth an own component because the code is just three or four lines of code. Later on, this starts to grow and it gets worth of encapsulation or you want to use it in several views. Maybe even worth two components who plays together. That´s the way it should be. Don´t follow the component principle just to follow it. Build components when it makes sense. Start simple, extend it, refactor it and repeat.


