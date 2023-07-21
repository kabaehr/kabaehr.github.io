---
layout: post
title: Experiences from my Project with Aurelia and Cordova
date: 2018-03-25
author:  "Katharina Bähr"
---


<span class="dropcap">I</span>n my current project, we build a hybrid app with <a href="https://aurelia.io/">Aurelia</a> and <a href="https://cordova.apache.org/">Cordova</a>. I thought multiple times about writing a post about this combination but I wasn't quite sure what to write because there are no special things to do in order to get Aurelia running with Cordova. But now I have realized, that I don't have to write a post on how to combine Aurelia and Cordova in general and that I will just write about my experience.


<h2>First steps</h2>
<p>
Including Cordova into your Aurelia app is quite simple. At first, you need to download Cordova and install the needed Cordova platforms you want to  develop for. You can do this with:
</p>

```bash
npm install cordova -g
```


There are multiple possibilities to set up your Aurelia-Cordova project, one way could be to create your Aurelia project inside the `cordova/www` folder (recommended if you only need to support app platforms like Android and iOS) or you can create the Cordova project inside of your Aurelia project (if you also want to run your application in the browser like a common Aurelia project) and copy the sources through some build tool. The latter one is the way how we developed our application.

For the latter approach create a folder named *cordova* (or however you want) and create a Cordova project by running

```bash
cordova create . [id [name [config]]] [options] 
```

See documentation below for the optional parameters.


If the project is created you can now add the needed platforms with:

```bash
cordova platform add <android/ios>
```

For more details on how to install, create and run a Cordova project see the <a href="https://cordova.apache.org/docs/en/latest/guide/cli/">documentation</a>.

If you want to go with the first approach you can use the Cordova CLI and create a project via `cordova create` or you can check out some more resources from the community:

- <a href="https://github.com/fragsalat/cordova-aurelia-skeleton">Aurelia Cordova skeleton</a>
- <a href="https://wipdeveloper.com/cordova-with-aureli-cli/">Aurelia CLI and Cordova</a>
- <a href="https://github.com/arjendeblok/aurelia-cordova-skeleton">Aurelia Cordova skeleton with Webpack</a>



<h2>Tooling with Gulp</h2>

The sources Cordova is packaging into an app, need to lay inside the `cordova/wwww` folder. To get them there we changed our gulp build tasks. 

We created some tasks that copy either our `debug` or the `release` sources into the `www` folder.

```js

gulp.task('cordova-copy-files', ['export', 'clean-cordova'], function () {
	return gulp.src(paths.exportSrv + "**/*")
		.pipe(plumber())
		.pipe(gulp.dest(paths.cordovaSrc));
});

gulp.task('copy-debug-dist-files', function () {
	return gulp.src([
		'dist/**/*',
		'jspm_packages/**/*',
		'config.js',
		'*.html',
		'src/mobile/favicon-ico'
	], { base: '.' })
		.pipe(plumber())
		.pipe(gulp.dest(paths.cordovaSrc));
});

```

Another build step that is necessary, is to include `cordova.js` in the body in the `index.html`.
We do this via gulp because we only want to do it, when we build the app for Cordova, so we can still use it on the desktop.

```bash

gulp.task('cordova-inject-body', function () {
	return gulp.src(paths.cordovaSrc + paths.index)
		.pipe(injectString.after('<body aurelia-app="main">', '<script src="cordova.js"></script>'))
		.pipe(gulp.dest(paths.cordovaSrc));
});

```

In general it was quite easy to adjust our gulp build tasks for Cordova.

It's a bit overhead to copy all needed sources
everytime we want to build an app, but this is necessary because we also want to be able to build the Aurelia project normally.
To reduce this overhead a bit we also wrote some *fast* builds, which only copy `html`, `js` and `css` files.


<h2>Platform specifics and plugins</h2>
<p>
We use several Cordova plugins but the two with the deepest platform-specific integration is the <a href="https://github.com/randdusing/cordova-plugin-bluetoothle">bluetoothle-plugin</a> and the <a href="https://github.com/apache/cordova-plugin-file">file-system-plugin</a>.

With these we are able to download and store files and to establish a Bluetooth connection and read data from other Bluetooth devices.


This works out quite okay but since these are extra layers which try to unify the existing platform-specific implementations and flaws, you can't expect too much. You will have to read carefully through the documentation and write some platform-specific code. 

For this you will have to check for the specific platform with:
</p>

```js

 if (window.cordova && window.cordova.platformId === 'android') {
   //platform specific code here
 }

```

Also, you can't expect that everything that is possible on a native platform is also possible via cordova and that there is an existing stable plugin. But you can write own plugins.

In order to integrate a C++ library that is doing some customer specific work, we created a wrapper as an own cordova plugin for the platforms android and iOS. In such a plugin you need to write some Cordova glue code and can implement the needed functionality in a corresponding native language (Objective C, Java, Swift...) and use the native platform libraries.


<h2>Good idea?</h2>

Since you have extra layers between the native API´s, write a Web UI instead of a native one and translate between ecosystems you have to consider that hyrid apps usally come with some lack of performance and UX.

I like to say that Cordova is not fun but mighty. It hardly depends on what you want to achieve and what your requirements are.
In our case the application is a business application. Our users will have to use this application for their daily work and therefore the customer wanted
that the application looks on all platforms (desktop, android, iOS) the same so their employees don't need to accustom to different GUI´s. This is a no go for B2C application but for this special use case it was out of question and the tradeoffs of worse usability and performance were therefore approved.

If at the end Cordova was a good choice is hard to say, but using Aurelia with it definitely was. 
