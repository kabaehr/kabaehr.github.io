---
layout: post
title: "Aurelia components: function binding with .call"
subtitle: "Examples of the .call binding in Aurelia"
date: 2017-02-05
author:     "Katharina Bähr"
tags: [Aurelia]
---


<span class="dropcap">O</span>ne principle of Aurelia is its usage of custom components based on the web component specifications. That means, that your application is based on custom components and attributes
 and you can leverage this to slice your code base into small, reusable and maintainable chunks. I want to write about some concepts to show the capabilities of 
Aurelia and how you can use them to write awesome custom components/attributes, which can help to avoid complex view models. 
This is the first post about function bindings, there will be further posts about other things.

<h3>.call binding command</h3>

You can use the <code>.call</code> binding command to pass functions references into your custom component. With this, you can achieve callbacks or kind of interceptors you 
can call before doing something inside the component. Therefore you can execute code from within your component that is located somewhere outside in the containing model. 

The <code>.call</code> binding command can be bind to custom elements or used with custom attributes:

{% highlight html %}

//custom element
<button-component my-binable-name.call="callback()">Say Hello</button>

//custom attribute
<div my-attribute.call="my-bindable-name.call:callback()"></my-button>

{% endhighlight %} 

It is possible to write the custom attribute in a more readable fashion, at least for one <em>primary</em> bindable.
May take a look <a href="http://blog.aurelia.io/2017/01/12/new-aurelia-features-and-release-notes-1-12-2017/">here at the Aurelia Blog.</a>


<h3>Examples</h3>

In the first example, I use the <code>.call</code> bind to pass a callback function on a custom checkbox element.
We are passing our callback function and the labels for the checkbox.

usage in **app.html**

{% highlight html %}
<checkbox-component callback.call="checkboxToggle()" labels.bind="{ true : 'checked', false: 'not checked'}"></checkbox-component>
{% endhighlight %} 

As soon as the user clicks the checkbox, the <code>change.delegate</code> will call directly our callback function, that we passed to the element
trough the <code>.call</code> binding. We could also set some function inside the element, do something and then call the passed function.

**checkbox-component.html**
{% highlight html %}
<template>
  <input type="checkbox" checked.bind="checkValue" change.delegate="callback()"> ${labels[checkValue]}
</template>
{% endhighlight %} 


**checkbox-component.js**
{% highlight javascript %}

import { bindable } from 'aurelia-framework';

export class CheckboxComponentCustomElement {
  @bindable callback;
  @bindable labels;
  
  checkValue = false; //default state
}
{% endhighlight %} 

This example could be used inside a kind of <em>form controller</em> which would use the callback to en- or disable parts in a form dependent on the checkbox state.


<br/>

The next example is using a custom attribute for dynamic data loading.
This custom attribute can be applied to any list, you just need to define the function that will care about the data loading.

usage in **app.js**
{% highlight html %}
 <ul scroll-end="load.call:loadItems()" class="list">
    <li repeat.for="item of items">
      ${item}
    </li>
  </ul>
{% endhighlight %} 


**scroll-end-component.html**
{% highlight javascript %}
import { bindable , inject } from 'aurelia-framework';

@inject(Element)
export class ScrollEndCustomAttribute {
  
  @bindable load;
  element;
  
  constructor(element) {
    this.element = element;
  }
  
  attached() {
    this.element.addEventListener('scroll', () => {
        if (this.element.scrollTop + this.element.offsetHeight >= this.element.scrollHeight) {
            this.load();
        }  
    });
  }
}
{% endhighlight %}

For checking the scroll position within the list, we inject the <code>element</code> and start to listen for scroll events.
As soon as we determine that the user scrolled until the end, we call our load function. This will extend the items<code>Array</code>
to which our list is bound to. 

{% highlight javascript %}
loadItems() {
  //here you could do a REST call e.g.
  for(var i = 1; i <= 5; i++)
  this.items.push('new item ' + i);
}
{% endhighlight %}


<h3>.call is your friend</h3>

The <code>.call</code> binding is somehow underestimated, at least it is not much <a href="http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/cheat-sheet/5">documented</a>, and the most examples you can find about it are only at Stack Overflow. If you want to react in your view model on something that happens inside your component, 
this can be a much better solution then sending events around or setting up a shared service.

You can find the <code>checkbox-</code> and the <code>scroll-end-</code> component as well as a one more simple example on <a href="https://gist.run/?id=a556aec0c3c4aee1545b80ed9ffc7d3e">this GistRun</a>.
