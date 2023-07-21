---
layout: post
title: "Aurelia Application Structure for Bigger Projects"
date: 2017-09-25
author:  "Katharina Bähr"
---


<span class="dropcap">I</span>n my current project, we have over 22 routes, 48 services, and 
59 custom elements. To keep an overview over all these files you need a well structured application. 
There are already multiple posts from Aurelia developers and even from core team members about how to structure an Aurelia application. When we started our project we read and used them as inspiration but decided for something different. Now, after more than a year of working with this structure, I want to share my opinion and experience on this topic.

<h2>Inspiration</h2>

Unfortunately, the structure we started with is not the best one and it´s already hard to keep an overview. I started to open files directly ( CTRL+P ) instead of clicking through the structure. I see this as a first indication that it needs to much time and effort to find what I currently need and having the files names in my head and searching for them again and again is faster.


The structure I would use today is nothing new but a combination of the structures described in the blog posts from <a href="https://blog.ashleygrant.com/2016/04/19/suggestions-for-structuring-a-large-aurelia-application/" title="post about aurelia structure">Ashley Grant</a>, <a href="https://ilikekillnerds.com/2015/10/how-to-structure-an-aurelia-application/" title="post about aurelia structure">Dwayne Charrington</a> and <a href="http://patrickwalters.net/application-structure/" title="post about aurelia structure">Patrick Walters</a>. Thanks for these great articles.

<h2>How I would structure my next application</h2>

I am going to describe the structure as I would create it, therefore I am using TypeScript files.
For JavaScript, the structure would look the same just with .js instead of .ts file endings.

```text
//example:

src/
├──assets/
│  ├── images/
│  └── styles/
├── common/
│   ├── models/
│   └── resources/
│       ├── custom-elements/
│       ├── custom-attributes/
│       ├── value-converter/
│       └── binding-behaviour/
│    └── services/
│       ├── connection-service.ts
│       └── tests/
│           └── connection-service.spec
├── routes/
│   ├── about/
│   ├── landing-page/
│       ├── landing-page.html
│       └── landing-page.ts
│   └── posts/
│      ├── post.ts
│      ├── post.html
│      ├── post-model.html
│      ├── post-service.html
│      └── resources/
│          └── custom-elements/
│              ├── post-item.ts
│              └── post-item.html
│      └── add-post/
│          ├── add-post.ts
│          ├── add-post.html 
│          ├── resources/
│          └── tests/
│      └── tests/
│          └── post.spec.ts


``` 

This structure is not showing all directories you might need. There could be also other folders like *assets/fonts* or *posts/services* etc... I hope you get the idea.

A application structure is a kind of guideline you should stick to. But you don´t need to create all folders up front.
If you don´t have any global custom elements you can create the folder when you have some. It´s the same with the *tests/*
directory under *posts/*. If you just have one test you could also lay it next to the other files. But if you have more than one,
a tests directory could make sense.

<h3> Naming </h3>
I recommend naming things in a way that they indicate what they are. See the *posts/* directory with the *person-service.ts*, *person-model.ts* and *person.ts*. This might look redundant but as your project grows you will be confused if you have a structure
where you only differentiate between files by putting them in corresponding folders.
```text

//I recommend to not structure your application like this

└── posts/
│   ├── post.ts
│   ├── post.html
│   ├── services
│       └── post.ts
│   └── models
│       └── post.ts

```

Additionally using shortcuts like CTRL+P to open a file will get harder because you have to look at the file path to distinguish between the three *post.ts* files.

For the same reason, I wouldn´t recommend using the name *index.ts* and *index.html* ( e.g. instead of *post.ts* and *post.html* and *landing-page.html* and *landing-page.ts* ). Yes, we are talking about some kind of index page for each route but the downside is, that this will get confusing fast.

<h3> Resources </h3>

There are two differences between resources. Global and feature (view) specific resources. Global resources should be located outside the routes so you can reuse them. 

If a custom-element is only used in one specific view you should organize it inside of this route (see *post-item*). This will help to find related resources easier and keeps the list of global resources shorter. Also, will this directly indicate that a resource is built for a specific use case and maybe needs to be adapted to work in other views. 

<h3> Child routes</h3>

At first, I found the idea of putting child routes below their parent route strange because this will lead to quite a deep nested structure and you need to remember to which parent route the child belongs.
But as the application grows this makes total sense because you will have a more organized structure. Besides sub routes and the <code>configureRouter</code> function in the corresponding parent route will lay next to each other. 

Now you can also lay resources that are shared between child routes in the resources folder of the parent instead of the global reosurces folder.

<h2> Best guess </h2>
I am sure after working with this structure there would be still something I would like to change afterward.
This is quite normal, the structure should fit the projects needs and these can change over time. So this is my current best guess and my suggestion on how to structure a big aurelia application. For a smaller application, I would probably use a simplified version.

