---
layout: post
title: Aurelia Keyboard Event Binding Pitfall 
date: 2018-01-30
author:  "Katharina Bähr"
---


<span class="dropcap">S</span>ometimes all you need to know is right in front of you. But still, it can happen that you and even none of your colleagues can see the trees in the forest. We had such a case last week and had problems with a not working keydown and keypress binding. It's trivial when you know how to do it, but if you don't, you have to find this specific piece of documentation that tells you about the right syntax.


The main reason to write this blog post is, to provide a better search result in case somebody runs into the same problem. Probably me in a year :)


<h2>Keypress And Keydown Event Binding</h2>

In Aurelia, you can bind on nearly every <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event">Event</a> just omit the "on" prefix and append a <code>.trigger</code> or <code>.delegate</code>, right? That's true except a little exception regarding keyboard events on an input field.

So assuming the following code keyboard event binding:

{% highlight html %}

<input type="text" keypress.delegate="handleKeypress($event)" />

{% endhighlight %}


{% highlight javascript %}
handleKeypress($event) {
  console.log($event);
}
{% endhighlight %}

The <code>handleKeypress</code> method will log the pressed key, but the pressed key will not appear as a value in the input field.
The same happens when using <code>keydown.bind</code> but not when using <code>keyup.bind</code>.

The keyup binding is different than the keydown and keypress event because the keyup event gets fired after the user typed into the input field and not right before. Therefore the keyup event gets fired after the typed key appeared in the input field.

But why don't we see the typed keys in the input field for the two other events? The thing we didn't know and that caused a lot of confusion was that
Aurelia calls <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault"><code>event.preventDefault()</code></a> by itself in every event handler method.

<img src="{{ '/assets/img/keyboard_event_binding.jpg' | prepend: site.baseurl }}" alt="Aurelia documentation regarding DOM Events"/>

So in order to check the typed key and allow them (or just some typed keys) to appear in the input field you have to <code>return true</code>;

{% highlight javascript %}
handleKeypress($event) {
  console.log($event);
  return true;
}
{% endhighlight %}


<a href="https://gist.run/?id=2edbd8579faec322f1474a6a9ac126da&sha=2376359c565cd2497bb78a47399514140da59207">
See the full example of keypress event binding here</a>


<h2>RTFM</h2>

We googled a lot and couldn't find any helpful information on keyboard event binding.
This was quite frustrating because what could possibly go wrong in 4 lines of code? Especially because we are using event binding already multiple times throughout the application.

But sometimes you just have to "read the fucking manual". Everything we were missing was that Aurelia calls <code>event.preventDefault()</code> and that
we had to <code>return true;</code> in order to propagate the event. All this is <a href="http://aurelia.io/docs/binding/basics#dom-events">written in the Aurelia documentation</a>.
