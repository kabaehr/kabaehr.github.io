---
layout: post
title:  "Aurelia in Production"
date:   2016-05-25
---


<p class="intro">
    <span class="dropcap">I</span>
     am into <a href="http://aurelia.io" alt="link to aurelia homepage">Aurelia</a> for some time now and like it more every day. I wrote a <a href="http://blog.zuehlke.com/en/aurelia-the-next-gen-javascript-framework/">blog post</a> about Aurelia in January 
     after I developed my first demo application and presented it to interested colleagues. Now we will use Aurelia in production for a very large project and I am very excited 😃
</p>

<p>
Till now we developed single page applications mainly with <a href="https://angularjs.org/">Angular 1.x</a> and were quite happy with it. Therefore, we though we would just continue with the replacement.
We firstly tried Angular 2 (alpha 0.26/0.27) at our camp (some company training days where we are trying stuff and improving skills) and it was quite hard. Strange new concepts and syntax,
little to no documentation and the code examples that we found were already old. However Angular 2 was still beta.
</p>

<h3>So what now?</h3>

<p>
Now, one year later we won this IoT project and had to decide which framework we want to use. The requirements for the project are quite extensive.
We will develop a responsive Web application and an App with the same functionality besides that 
the app will be additional be able to speak over Bluetooth LE with several devices and show some configuration interface. 
</p>

<p>
Because of high intersection of functionality between the applications and also high pricing and timing pressure we choose a hybrid approach with <a href="https://cordova.apache.org/" alt="link to cordova homepage">Cordova</a>.
We already implemented a Cordova App with BLE integration for another project. So we knew already that using the native API will work pretty well.

</p>

<p>
To continue with Angular 1.x was not an option and thus we compared Angular 2 and Aurelia. 
The decision was quite hard regarding that both Frameworks are still not released in version 1.x.
We tried both and the Angular 2 experience was still not very good, though Angular 2 is already in release candidate.
While we had real fun with Aurelia and made great progress.
</p>

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">After exploring <a href="https://twitter.com/AureliaEffect">@AureliaEffect</a> for three days at <a href="https://twitter.com/hashtag/ZCamp16?src=hash">#ZCamp16</a> everyone prefer it due to it&#39;s simplicity and great concepts</p>&mdash; Katharina Bähr (@kabaehr) <a href="https://twitter.com/kabaehr/status/731520391626231809">14. Mai 2016</a></blockquote>
<br />

<p>
There is a chance that Ember would have been a proper choice, some would suggest React, 
but we wanted to use something that is similar to what our developers used to and plays well together with <a href="https://www.typescriptlang.org/">TypeScript</a>.
</p>

<h3> Why we chose Aurelia </h3>

<p>
Beside the better development experience we evaluated some more topics including community, performance, stability, backing and status.
Though Angular 2 was already in release candidate and Aurelia not, Aurelia seemed way much more stable during beta phase. This could be due to a
 better design in mind or just because Aurelia is really 
caring about to produce not too much breaking changes.
Therefore, no wonder but even more pleasant that they say that Aurelia can already be used in production.
</p>


<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr"><a href="https://twitter.com/httpJunkie">@httpJunkie</a> We stated it was production ready when we went Beta in November of last year. We&#39;ve had apps in production for a year now.</p>&mdash; Rob Eisenberg (@EisenbergEffect) <a href="https://twitter.com/EisenbergEffect/status/718582506832990208">8. April 2016</a></blockquote>
<br />

<p>
A strong argument for Angular 2 was that it is backed by Google and has a greater community. 
But I assume that the Aurelia community will grow very fast and the help you get on <a href="http://stackoverflow.com/questions/tagged/aurelia" alt="link to stack overflow">Stack Overflow</a> and in the <a href="https://gitter.im/aurelia/Discuss" alt="link to aurelia gitter channel">Gitter channel</a> is already awesome.
While Google also like to dump projects, <a href="http://durandal.io/" alt="link to durandel">Durandal Inc.</a> is promoting Aurelia as their product, want to make business with it and consider developer as their customers.
</p>

<p>
At the moment Aurelia is preparing the release candidate which will be released soon. This is great because to see Aurelia progressing and their effort to make 
the update process as smooth as possible confirms our decision even more.
I really look forward to use Aurelia in production and to see it performing.
I will blog about our experiences and interesting topics we faced in the development process so stay tuned :)
</p>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
