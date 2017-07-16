---
layout: post
title: "Aurelia Components: The .ref Binding Command"
date: 2017-07-16
author:  "Katharina Bähr"
---


<span class="dropcap">T</span>he <code>.ref</code> binding is a quite undervalued feature that can help you with several problems in a clean and nice way.
Using .ref can reduce the complexity of your application, save bundle size and performance. I want to show you some examples and how to use it.

<h2>What is .ref</h2>

Since <a href="http://blog.aurelia.io/2015/06/08/aurelia-early-june-release/" title="aurelia blog post about API changes">summer 2015</a> the <code>.ref</code> binding can be used like all other binding commands (<code>one-way, two-way, one-time, call, ...</code>). You can use it to create a reference to an HTML element in the DOM, a view model, a view instance or a controller.
The pattern to use it looks the following: <code>&lt;some-element some-attribute.ref="expression"&gt;</code>. There are several possibilities for <code>some-attribute</code>. You can use <code>view-model.ref</code>, <code>view.ref</code>, <code>controller.ref</code>, <code>attribute.ref</code>, <code>element.ref</code> and just <code>ref="expression"</code> which defaults to <code>element.ref</code>. The expression can be a variable but it could also be 
an array element or an object.


These informations are also listed in the <a href="http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-basics/4" title="aurelia binding basics">official documentation</a>.
Have a look at the examples below to get a better understanding how to leverage the <code>.ref</code> binding for your application.

<h2>Why you should use .ref</h2>

Like I already mentioned the <code>.ref</code> binding command can make the usage of jQuery needless, therefore you can save the size of it.
Next, to that, you can reference a lot of elements, view model, view instances or controller without the need of searching/traversing the DOM, building complicated structures, referencing and connecting logic over the parent controller/view or working with obscure events.

This makes your life far easier and gives you a mighty and performant way of wiring your application together.

<h2>When to use .ref</h2>

jQuery is a mighty library that can be used for a variety of use cases. The most common use case is probably to select one single element by some selector and manipulating its DOM or properties. So always when you feel the urge to use jQuery you should think about using .ref instead. 

In general, you should use bindables and <a href="http://kabaehr.de/blog/Aurelia-components-function-binding-mit-.call/" title="link to my aurelia .call binding post">.call</a> whenever possible because this is more straightforward, better readable and understandable.

One situation where you have to use jQuery is when you need to select multiple elements or when you integrate a jQuery plugin. Here you often have to do something like <code>$('some-selector').plugin({...})</code> and this will not work if the expression on which you call <code>.plugin({...})</code> is not a jQuery object. But you can use an element reference instead of a selector so it will be converted to a jQuery object <code>$(yourElementRef).plugin({...})</code>.

Another use case is when you want to use some properties from a plugin you don´t have under control. E.g. a 3rd party datepicker where you want to use parts of the selected date to show it below the datepicker itself, but the datepicker doesn´t offer a way to get these properties.

<h2>At what time to use .ref</h2>
You can´t access the referenced element before the <code>bind</code> lifecycle callback is called. In case you want to access the DOM of a referenced element you have to wait until the <code>attached</code> callback got called because the DOM needs to be constructed first. So you can´t use the reference in the constructor.

<h2>How to use .ref</h2>

I put some examples on <a href="https://gist.run/?id=c022f7390f7d0efc5c81c0d79685c6d8" title="gitter gist with .ref examples"> this Gist</a>, you should have a look at them to while reading the next parts. 

<h3> Reference Element </h3>

You can use <code>element.ref</code> (or just <code>ref</code>) on every HTMLElement to create a reference to this element. The reference will be of type <a href="https://developer.mozilla.org/en/docs/Web/API/HTMLElement" title="HTMLElement API reference">HTMLElement</a>. Looking at the properties of HTMLElement (Element and Node) we see that we can do a lot of things with it. Finding or selecting a childElement, execute click or blur functions, adding event listeners and much more.

Usage:

{% highlight html %}
//app.html
<div ref="elementRef">
  <span> Some text </span>
</div>

{% endhighlight %} 

{% highlight javascript %}
//app.js
export class App {
  attached() {
    console.log(this.elementRef);
  }
}
{% endhighlight %}

This usage of <code>element.ref</code> is the most common one. You can use it for referencing specific DOM elements in your own custom component too. We are using it a lot when working with <a href="https://d3js.org/" title="d3 chart libary">d3.js</a> or <a href="https://www.w3schools.com/html/html5_canvas.asp" title="HTML Canvas on w3schools">HTML Canvas</a> because you can do things like:


{% highlight javascript %}
//some-chart.js
export class SomeChart {
  attached() {
    //canvas
    let diagramContext = this.diagramCanvasRef.getContext('2d');

    //D3
    let container = d3.select(this.chartContainerRef);
  }
}
{% endhighlight %}


<h3> Reference View </h3>

In difference to <code>element.ref</code>, <code>view.ref</code> can only be applied on custom elements and not on normal HTML elements. 

Using <code>view.ref</code> we get access to the Aurelia view instance, having access to several internal properties like the view factory and the bindingContext. <a href="http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-how-it-works/3" title="aurelia binding in depth">The binding context is almost always a view model instance </a> so we can access the view model too.

Usage:

{% highlight html %}
//app.html
<custom-element view.ref="viewRef"></custom-element>

{% endhighlight %} 


{% highlight javascript %}
//app.js
export class App {
  attached() {
    console.log(this.viewRef);
  }
}
{% endhighlight %}

Have a look at the <a href="http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-how-it-works/1" title="view factory documentation">documentation</a> to understand what you can do with the ViewFactory or see this <a href="https://gist.run/?id=762c00133d5d5be624f9" title="gitter gist with view factory example"> advanced example</a> from an aurelia core team member on how to use the ViewFactory.

<h3>Reference (Attribute) View Model</h3>

Referencing the view model of an element or attribute gives us access to the underlying view model (the class .js file). So we can access all properties and methods and even define new ones.

Usage:

{% highlight html %}
//app.html

//element view model
<custom-element view-model.ref="vmRef"></custom-element>

//attribute view model
<div custom-attribute="value: 42" custom-attribute.ref="attributeRef"></custom-element>

{% endhighlight %} 

{% highlight javascript %}
//app.js
export class App {
  attached() {
    console.log(this.attributeRef);
    console.log(this.vmRef);
  }
}
{% endhighlight %}


<h3> Reference Controller </h3>

The controller owns the view model and the view and composes them together. The controller instance is also responsible for the element´s lifecycle methods and executes them. Therefore referencing the controller gives you access to the view, the view model and the parents view (scope).




Usage:

{% highlight html %}
//app.html
<custom-element controller.ref="ctrlRef"></custom-element>
{% endhighlight %} 


{% highlight javascript %}
//app.js
export class App {
  attached() {
    console.log(this.ctrlRef);
  }
}
{% endhighlight %}

<a href="http://aurelia.io/hub.html#/doc/article/aurelia/binding/latest/binding-how-it-works/1">See the official docs for more explanations about the controller.</a>

<h2> .ref all the things </h2>

Some of the examples are really made up because I couldn´t think of a short real world example and the focus lays on showing the syntax and how to access the references in your outer view model. <br>
To summarize you should use .ref to select and change the look or behavior of an element/attribute when you can´t customize the element/attribute over bindables.
