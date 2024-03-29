---
layout: post
title:  "Replacing slow gulp.watch task"
date:   2016-12-30
subtitle: "gulp.watch went so slow it was nearly impossible to continue working with this, so I searched for a solution."
author: "Katharina Bähr"
---


<p class="intro">
<span class="dropcap">I</span> am currently working on a big project, meaning that we have a lot of files that needs to be watched. Somewhen our <code>gulp watch</code> task started to be very slow and to need round about 2 minutes to ramp up (initial gulp watch call) 
and more than 8 seconds for a refresh when edited a single file. It was nearly impossible to continue working with this, so I searched for a solution.
</p>

We were using the built-in <a href="https://github.com/gulpjs/gulp/blob/master/docs/API.md" title="link to gulp.watch"><code>gulp.watch</code></a> and the solution for us was to just replace it with the 
<a href="https://www.npmjs.com/package/gulp-watch" title="link to gulp.watch"><code>gulp-watch</code> plugin</a> which brought a huge speed improvement.
Maybe there are other optimizations that would have solved the problem, but to just change from <code>gulp.watch</code> to <code>gulp-watch</code> was a pretty easy solution and the main work was research.

<h2>gulp.watch vs. gulp-watch</h2>

<p>

The main difference between these two is that <code>gulp.watch</code> uses <a href="https://github.com/shama/gaze" title="link to the gaze library">gaze</a> for implementing the whole watch functionality and 
<code>gulp-watch</code> uses <a href="https://github.com/paulmillr/chokidar" title="link to the chokidar library"><code>chokidar</code></a>. 
Chokidar is using a combination of <a href="https://nodejs.org/docs/latest/api/fs.html" title="link to node.js API"> Node.js fs.watch, fs.watchFile</a> and the 
<a href="https://www.npmjs.com/package/fsevents" title="link to fsevents API">fsevents API</a>, you can read more about it <a href="https://www.npmjs.com/package/chokidar" title="link to chokidar on npm">
on there website</a>.
Gaze whereas uses <a href="" title="">globbing, fs.watch and "the best out of other libraries".</a> I can´t tell why <code>chokidar</code> exactly worked better for us but <code>chokidar</code> seems 
to be more common and has a lot more of stars, contributors and forks on Gitub then <code>gaze</code>.
</p>

<h2>Translating your tasks</h2>

The API´s of <code>gulp.watch</code> and <code>gulp-watch</code> are looking somehow different and so it needed a little time to find out, how to exactly refactor the task.
We are using <code>browserSync</code>, so the page reloads automatically as soon as a changed was detected, so the task before looked like this:

```
gulp.watch(paths.source, function () {
    runSequence('build-system', 'lint', () => {
        browserSync.reload();
    });
}).on('change', reportChange);
```

<code>reportChange</code> is just a method that prints the changed files onto the console.

For the new task, you additionally need to require the installed <code>gulp-watch</code> package.

```bash

var watch = require('gulp-watch');

watch(paths.source)
.on('change', (event) => {
    reportChange(event);
    runSequence('build-system', 'lint', () => {
        browserSync.reload();
    });
});
```

The main changes are that <code>gulp.watch</code> takes a function as the second parameter which will be executed as soon as one of the files changed.<code>gulp-watch</code> only takes a list of file paths as parameter and
you have to listen for the change event to handle the change.


<h2>The Problem might be solved already</h2>

It seems like the gulp team has already <a href="https://github.com/gulpjs/gulp/blob/4.0/index.js" title="link to chokidar change">switched from <code>gaze</code> to <code>chokidar</code> on the 4.0 branch</a> so this problem might be solved soon.
Maybe this will help someone in the meantime or in older not yet updated projects.

