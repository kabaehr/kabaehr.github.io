---
layout: post
title: "Deploying a Node.js GraphQL API to Azure"
subtitle: "Publish your GraphQL API simple and for *free*"
date: 2017-04-23
author:     "Katharina Bähr"
tags: [Aurelia]
---


<span class="dropcap">G</span>raphQL is a very trending topic at the moment. Next to Facebook who developed GraphQL, also <a href="https://githubengineering.com/the-github-graphql-api/
" title="link to announcement"> Github announced</a> to change their API´s from REST to GraphQL. This adoption might convince more and more companies to trust in GraphQL for building their API´s. A good time to take a deeper look at the whole topic. 

I played a bit with GraphQL and wanted to deploy it somewhere so I can consume my API from a demo application. I already deployed some REST API´s to Azure, therefore I wanted to publish my GraphQL API in the same manner. This post is a summarization of my attempts and the explanation how you can create a simple GraphQL API and deploy it to Azure like i did. 

One great thing on Azure (and surely also other cloud providers) is, that you don`t have to pay for small deployments and usage. Perfect for play projects :)
In case you don´t have an Azure account yet, you can follow this <a href="https://www.youtube.com/watch?v=YHCAAnPIQyc" title="link to video for creating a azure subscription">video</a> for creating your subscription. 

I started learning GraphQL with the site <a href="https://learngraphql.com/" title="link to learngraphql">Learn GraphQL</a> and using the <a href="" title="link to offical docu">official documentation and can highly recommend them.</a> The shown example API is the same like on learngraphql.com. 

<h2>Installing packages and TypeScript</h2>

I am using Node.js because it is very uncomplicated and lightweight. I installed the recommended packages like <code>express-graphql</code> from the <a href="http://graphql.org/code/" title="link to official docu with available libraries">GraphQL documentation</a>. Next, to that, you have to install <code>graphql</code> itself.


{% highlight bash %}
npm install graphql express express-graphql
{% endhighlight %} 

Because we are writing ES6 code we need a transpiler to convert our files to ES5 JavaScript.
Instead of Babel I used TypeScript for this. On the server the TypeScript type system provides not that much benefit (in fact in this simple example it is not even used) because GraphQL comes with its own type system. But in case you are using TypeScript for the client you are able to <a href="https://github.com/dotansimha/graphql-code-generator" title="generate d.ts files from graphQL">generate typing definitions files</a> out of the GraphQL types. This is really handy because you don´t need to write all the <code>d.ts</code> files yourself.

Install TypeScript on your system and download all needed typings.

{% highlight bash %}
npm install -g typescript
{% endhighlight %} 

{% highlight bash %}
npm install typings
{% endhighlight %} 

{% highlight bash %}
typings install express graphql --save
{% endhighlight %} 

<h2>Creating the GraphQL API </h2>


After this, we can start with creating our <code> server.ts </code> file and import all needed resources for creating the web server and the API.

{% highlight javascript %}

import * as express from 'express';
import * as graphqlHTTP from 'express-graphql'
import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLSchema,
  graphql
} from 'graphql';

{% endhighlight %} 

Next we create a simple GraphQL schema. 

{% highlight javascript %}

let query = new GraphQLObjectType({
  name: 'RootQueries',
  fields: () => ({
    echo: {
      type: GraphQLString,
      args: {
        message: {type: GraphQLString}
      },
      resolve(rootValue, args) {
        return `received: ${args.message}`;
      }
    }
  })
});

let schema: GraphQLSchema = new GraphQLSchema({
    query: query,
});

graphql(schema, query).then((result) => {
    console.log(result);
});

{% endhighlight %} 


The last thing we now have to do is setting up the express web server. This is quite simple, we just create the express application, define the endpoint,
configure the schema and add a port to listen on. 


{% highlight javascript %}

var app: express.Application = express();
app.use('/graphql', graphqlHTTP({
 schema: schema,
 graphiql: true
}));

app.listen(4001, () => console.log('express server works'));

{% endhighlight %} 

Well, wasn´t that easy? Now we can transpile and execute it with node.

{% highlight javascript %}
tsc server.ts
{% endhighlight %} 

{% highlight javascript %}
node server.js
{% endhighlight %} 

The API is  now up and running under **localhost:4001**. Because of the option <code> graphiql: true</code> we see a 
nice interface where we can use autocompletion to execute queries.

<h2>Deployment to Azure</h2>

We are now going to publish this API and access it over Azure instead of localhost.
For this, you need to create a Node.js application, download the *PublishProfile* and upload your files.

There are several ways to work with Azure and this makes it sometimes hard to find the right documentation.
I prefer using various GUI´s and never even tried to use the Azure Powershell. Therefore is what I am describing next only one of many ways to do this.

<h3> Create the Node.js application</h3>

First, you have to go to your Azure account and create a Node.js web application. You can orientate on the pictures below or you can have a look at this <a href="https://channel9.msdn.com/Blogs/Azure/Create-a-Web-App-with-Nodejs-and-Azure-App-Service" title="how to create app video from channel9">channel9 video</a> for a complete guide.

<figure>
    <img src="{{ '/assets/img/azure_deploy.png' | prepend: site.baseurl }}" alt="Steps to create your Node.js Application"/>
</figure>

When creating your app make sure that you choose the free pricing tier. After you created your app service you can navigate to it and download the publish profile.

<figure>
    <img src="{{ '/assets/img/download_publish_profile.PNG' | prepend: site.baseurl }}" alt="Steps to create your Node.js Application"/>
</figure>

Open the *.PublishSettings* file and connect to your app service with an FTP client.

For deploying your code, you have to copy your server file and the whole *node_packages* folder. If you named your server file other than <code>server.js</code> you have to change the *web.config* accordingly.
This files lays in the root directory and defines how your server will be executed.

Now you can try to access your API over <em>http://\<your-app-name\>.azurewebsites.net/graphql</em> (in this example, <em>http://graphql-test-app.azurewebsites.net/graphql</em>) and see if it works.

If you do so you will likely see some error page that tells you exactly nothing helpful.

<h3>Pitfalls</h3>
It happened several times to me that I copied my files to Azure and it wasn´t working. In this case you can add multiple logging statements for <a href="https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-nodejs-debug" title="link to azure debugging guide">debugging</a>
in the <em>iisnode.yml</em> file to see some more detailed error messages.


{% highlight javascript %}
loggingEnabled: true
devErrorsEnabled: true
{% endhighlight %} 

In case you chose the *Node.js Starter Site* you can also take a look at the default application. Find out how the existing application is working and
what you may did wrong. Otherwise, you can find some <a href="https://github.com/Azure-Samples/app-service-web-nodejs-get-started">example applications</a> on Github.

Taking a look at this helped me to find out that I forgot to change the port to the one that Azure provides. So you need to change your code to use <code>process.env.port</code>.

{% highlight javascript %}
var port = process.env.port || 4001;
app.listen(port, () => console.log('express server works'));
{% endhighlight %} 


You can find this information also somewhere in the <a href="https://docs.microsoft.com/en-us/azure/cloud-services/cloud-services-nodejs-develop-deploy-app" title="link to node.js azure docu">documentation</a>, but I only found the problem by looking at the initial <code>server.js</code> file. 

<h3>Consume your API</h3>

The deployment to Azure was quite easy and you are now ready to extend and consume your API from a client.
For further development of your API I would recommend integrating the <a href="https://docs.microsoft.com/en-us/azure/app-service-web/app-service-deploy-local-git">GIT deployment</a>.
Thus, Azure gets the new files as soon as you push changes to your repository.

Hopefully these explanations might help someone to get started with developing great API´s.
I am excited to see how GraphQL will change the way we build applications, handle and consume data.
