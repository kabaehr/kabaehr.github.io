---
layout: post
title:  "Aurelia advanced I18N"
date:   2016-08-04
---


<p class="intro">
    <span class="dropcap">R</span>ecently I had to implement i18n in order to support several languages and users all around the world.
    I used the official <a href="https://github.com/aurelia/i18n" title="link to aurelia-i18n project">aurelia-18n</a> library and had some difficulties make
    everything work in Safari (Cordova iOS App) and with Typescript. This post will may cover and extend some steps that are already described on the 
    <a href="https://github.com/aurelia/i18n/blob/master/README.md" title="link to aurelia-i18n project readme">README.md</a> page of the Github repo.

<p>
I used the beta version of the library but shortly afterwards <a href="http://blog.durandal.io/2016/07/27/aurelia-1-0-is-here/" title="link to aurelia 1.0 version">Aurelia 1.0</a> were released and I updated to aurelia-i18n 1.0 version without any issues.

</p>

<h3>Using aurelia-i18n with Typescript</h3>

<p>
Like on the <a href="https://github.com/aurelia/i18n" title="link to aurelia-i18n project">Github page</a> suggested you have to execute
</p>

{% highlight bash %}
jspm install i18next
jspm install i18next-xhr-backend 
{% endhighlight %} 

<p>
or some other backend service from this list of available <a href="http://i18next.com/docs/ecosystem/#backends" title="link to a list of i18n backends">backends</a>
and install typings
</p>

{% highlight bash %}
typings install i18next
{% endhighlight %}

<p>
Since <em>i18next-xhr-backend</em> comes with a d.ts file you can just add
</p>

{% highlight javascript %}
 "filesGlob": [
    "../jspm_packages/**/*.d.ts",
  ]
{% endhighlight %} 

<p>
to your <em>tsconfig.js</em> and the gulp typescript task will find and use the <em>i18next-xhr-backend.d.ts</em> file.
If you are up to date with your aurelia packages you shouldn´t get any "Duplicate identifier" error messages. If you have some issues with this you could change the <em>filesGlob</em> path
to only match the specific file
or follow the steps <a href="https://github.com/aurelia/i18n#how-to-install-this-plugin" title="link to aurelia-i18n documentation">described under point 8.ii</a>.
</p>
</p>

<h3>Translation with ValueConverter</h3>

<p>
For converting numbers with the <a href="https://github.com/aurelia/i18n#formatting-numbers-with-nfvalueconverter" title="link to nfValueConverter"> number format value converter
 </a> or converting dates with the <a href="https://github.com/aurelia/i18n#formatting-dates-with-dfvalueconverter" title="link to df value converter" > date format value converter</a>
you have to pass the wanted locale.
</p>

{% highlight javascript %}
//number format with 'en_US' as locale
 ${ 1234567.890 | nf : undefined : 'en_US'} //undefined is the value for the options parameter 

//date format with a locale string bound to selectedLocale
${ myDate | df : undefined : selectedLocale} 
{% endhighlight %}

I didn´t wanted to pass the current selected locale to every view or make it global so I created a wrapper around the <em>nf</em> and <em>df</em> value converters.
These wrapper value converters always requesting the current locale first so you don´t have to provide this value in every view or make it global.

{% highlight javascript %}
import {autoinject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@autoinject()
export class CnfValueConverter {

  constructor(private i18n: I18N) { }

  toView(value: string) {
    let numberFormatFunc = this.i18n.nf(undefined, this.i18n.getLocale());
    return numberFormatFunc.format(value);
  }
}

{% endhighlight %}

<p>
This approach was fitting for me because I don´t need the options. You could also extend the custom value converter parameters with a options object.
The custom date format value converter would look similar. Then you can use them like this

</P>

{% highlight javascript %}
 ${ 1234567.890 | cnf } 
 ${ myDate | cdf }
{% endhighlight %}


<h3>Locale selectbox</h3>
<p>
I had to implement a selectbox to let the user easily change the locale. I wanted to style the selectbox properly and enable the user to search for a specific locale. Thus I choose the
 <a href="https://select2.github.io/" title="link to select2 plugin">Select2 plugin</a> and orientated on this <a href="http://ilikekillnerds.com/2015/08/aurelia-custom-element-using-select2-tutorial/">blog post from Dwayne</a>.
</p>

<p>
Similar to the blog post I created a custom element <em>language-switch</em> but instead of using events I am using a bindable property because I wanted to get the whole selected object and not only the key.
</p>

{% highlight html %}

//language-switch.html
<template>
    <require from="select2/css/select2.min.css"></require>

    <select name.bind="name" value.bind="selected" class="custom-selectbox">
        <option repeat.for="option of options" model.bind="option">${option.label & t}</option>
    </select>
</template>
{% endhighlight %} 

{% highlight javascript %}
//language-switch.ts
import {bindable, inject, customElement} from 'aurelia-framework';
import * as $ from 'jquery';
import 'select2';

@inject(Element)
export class LanguageSwitch {
  @bindable name: string = null;
  @bindable selected: any = null;
  @bindable options: Array<any> = [];

  constructor(private element) {
    this.element = element;
  }

  attached() {
    $(this.element).find('select')
      .select2()
      .on('change', (event: Event) => {
        this.selected = event.target.selectedOptions[0].model;
    });
  }

  detached() {
    $(this.element).select2('destroy');
  }
}
{% endhighlight %}

{% highlight javascript %}
//language option model
let options = [ {'key': 'de', 'label': 'Germany'}, {'key': 'en', 'label': 'English'}];
{% endhighlight %}

<h3>Safari und Intl</h3>
<p>
<em>aurelia-i18n</em> uses <a href="" title="link to i18next">i18next</a> a widely known internationalization library which depends on the <em>window.Intl</em> API. Unfortunately the 
<a href="http://caniuse.com/#search=intl" title="support of intl"> browser support </a> for this API is limited.
Thus for supporting Safari and some mobile browsers you have to install the polyfill <a href="https://github.com/andyearnshaw/Intl.js/" title="link to intl polyfill">intl.js</a>

</p>

{% highlight bash %}
 jspm install npm:intl
{% endhighlight %} 

<p>
and include it somewhere in your project and into your bundles
</p>

{% highlight javascript %}
import 'intl'; //in main.ts or like me in some own translation service
{% endhighlight %} 

<p>
<em>Aurelia-i18n</em> will only take this polyfill if <em> window.Intl</em> is not available, therefore you don´t need to install extra typings for it. 
</p>


<p>
But that fixed not all of my problems and it caused me some headache to figure out how to solve them. I discovered that you have to include a JSON file for every locale you are supporting in order to use <a href="https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat">numberformat</a> and <a href="https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat">dateformat</a>.
So I created a file where I included all needed locales and imported this file in my project. Next to that you could use this file for determining supported languages for the <i>language-switch</i>.
</p>

{% highlight html %}
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/de-DE';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/en-US';
{% endhighlight %} 

<p>
You can include the whole folder or use the <em>complete.js</em> for importing all locales but because all these files together have a size over 56MB I choose to add them manually.
For more optimizations you could load <em>intl.js</em> and all the needed locale files only if <em>window.intl</em> is not available.
</p>

<h3>Unit Testing</h3>
<p>
When using the <a href="https://github.com/aurelia/i18n#translating-with-the-tvalueconverter" title="link to tvalue converter">TValueConverter</a> or
 <a href="https://github.com/aurelia/i18n#translating-with-the-tbindingbehavior" title="link to t binding behavior"> TBindingBehavior</a> in the view of the custom element I was testing, 
 the compiler was complaining about "No BindingBehavior named 't' was found!"
What helped was to include <em>t</em> manually to the test.
Given this custom element
</p>

{% highlight javascript %}
import {bindable} from 'aurelia-framework';
export class MyComponent {
  @bindable firstName;
}
{% endhighlight %} 

<p>
and given this unit test you can include the binding behaviour with 
</p>

{% highlight javascript %}
 .withResources(['...', 'aurelia-i18n/t']) //the binding behavior is defined in a own file under aurelia-i18n named 't.js'
{% endhighlight %} 

<p>

Here is a complete example extending the custom element testing example from <a href="http://aurelia.io/hub.html#/doc/article/aurelia/testing/latest/testing-components/3">Aurelia HUB page</a>
</p>

{% highlight javascript %}
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('MyComponent', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('src/my-component', 'aurelia-i18n/t')
      .inView('<my-component first-name.bind="firstName"></my-component>')
      .boundTo({ firstName: 'Bob' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.firstName');
      expect(nameElement.innerHTML).toBe('Bob');
      done();
    });
  });

  afterEach(() => {
    component.dispose();
  });
});
{% endhighlight %} 

<p>
Hopefully this will help someone using aurelia-i18n or struggling with Safari support.
Feel free to write me an Email or create a pull request if I missed something.
</p>
