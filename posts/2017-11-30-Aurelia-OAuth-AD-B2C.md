---
layout: post
title: Securing an Aurelia application with Azure B2C
date: 2017-11-30
author:  "Katharina Bähr"
---


<span class="dropcap">A</span>fter our existing solution stopped working, I reimplemented the authentication process of my current Aurelia project. In order to do this, I evaluated some libraries and decided on a decent solution. We are using Azure AD B2C so everything is related to this. Anyway, it should be helpful when using other providers too.

<h2>Steps to secure your application</h2>

We are going to use the <a href="https://oauth.net/2/">OAuth2</a> <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-implicit">implicit grant flow</a>. This flow is optimized for public clients and mainly used for Single-page and JavaScript applications.

<h3>Login and Logout</h3>
<p>
At first, you need to implement the login process. This consists out of three steps:

1. Sending an Auth request to your Authority
2. Handling the redirect after the User logged in
3. Store and manage the token 

This is Aurelia unspecific and could (and maybe should) be done even before the Aurelia application started. Routing to the authority and handling the redirect is easy, but manage the token not necessarily. This would include: saving the tokens in some storage (e.g. sessionStorage), checking when the tokens expire (parsing the JWT token), deleting old tokens etc...

</p>

<h3> Aurelia AuthorizeStep </h3>

The <em>AuthorizeStep</em> is a kind of interceptor and executes on every route change.
We can use it to check if the User is authenticated or if an existent token is still valid and not expired yet. 

Depending on how much of the application is secured we can also use the <em>AuthorizeStep</em> to trigger the login. So assuming only the page "my bookings" is secured, we can check if the User tries to enter this page and prompt him with the login dialog instead of routing him to this page.

In my case, the User is not allowed to see anything without authentication, so I mainly use the step to detect if the token expired.

<h3>Aurelia HTTP Interceptor</h3>

Now that we are logged in and have a token, we need to authorize towards our backend.
This means, that we have to add an authorization header to every request we send to our secured API endpoints. 

For this, we can apply a HttpInterceptor to our HttpClient (or FetchClient) which will append the <a href="https://tools.ietf.org/html/rfc6750"> BearerToken</a> to every request.

<figure>
    <img src="{{ '/assets/img/bearer_header_2.png' | prepend: site.baseurl }}" alt="Bearer token attached to a request"/>
</figure>



<h2>Evaluation</h2>

**Disclaimer** This evaluation is highly opinionated, quickly researched and aligned with my project requirements.

In our first implementation, we used <a href="https://github.com/matik12/aurelia-oauth">aurelia-oauth</a> because it was fitting our requirements better than aurelia-auth(entication) and it seemed like everything we needed.

Now, we looked at all kind of client libraries and tried to find something that is stable, maintained and is quite accepted in the community. 

Because the general login process is not aurelia specific and our users are not allowed to see anything from the application before they are logged in we wanted to trigger the login before we load a lot of Aurelia libs.

<h3>aurelia-oauth</h3>
When <a href="https://github.com/matik12/aurelia-oauth">aurelia-oauth</a> stopped working I looked deeper into the code and discovered that the plugin is badly maintained and not very well written.
E.g. it was starting an own Aurelia application presumably to handle the redirect directly, but this results in a slow experience because Aurelia packages are loaded twice if not even trice before the User can use the application (dependent on when the login is triggered).

However, this plugin is not working out of the box with Azure AD B2C. We had to fork it to include the policy field in the request URL.

<h3>aurelia-auth(entication)</h3>

There are two packages <a href="https://github.com/paulvanbladel/aurelia-auth">aurelia-auth</a> and <a href="https://github.com/SpoonX/aurelia-authentication">aurelia-authentication</a>. The latter is a fork of the first and is maintained by a company that open-sourced several of their Aurelia plugins and brings some additional features. The original is a port of <a href="https://github.com/sahat/satellizer/">Sattelizer</a> a Angular library for Authentication.

Both plugins are showing the login dialog in a popup window. This way they don't have to route away from the page and reload it after the user logged in. 
This popup is the main reason, why I didn't choose it. I can imagine that this is a good choice for a lot of other projects.

<h3>aurelia-open-id-connect</h3>
The <a href="https://github.com/shaunluttin/aurelia-open-id-connect">aurelia-open-id-connect</a> plugin makes a good first expression and is a wrapper for the <a href="https://github.com/shaunluttin/aurelia-open-id-connect">IdentityModel/oidc-client-js</a>.

The wrapper uses a custom-element to provide your application with the required functionality and offers a ready-to-use AuthorizeStep. But the plugin is still in an alpha state and so is the documentation.


The oidc-client-js itself looks interesting, with a lot of features (support for cordova), maintained and it has a lot of GitHub stars. 
Depending on the project requirements this might be a good choice.


<h3>hello.js</h3>
In this <a href="https://medium.com/@mikko.vuorinen/aurelia-and-azure-ad-b2c-authentication-351fbe2de348">blog post</a>, a plugin called <a href="https://adodson.com/hello.js/">hello.js</a> is used in combination with Aurelia. 

The purpose of this plugin is not only OAuth authentication but rather querying all kind of APIs like from Instagram, Twitter or Facebook. We don't need this services, therefore this library could be too much.


<h3>Auth0</h3>
<a href="https://auth0.com/">Auth0</a> is a company dedicated to authentication. You can use them as your provider (instead of Azure) or use only their client libraries. Choosing the <a href="https://auth0.com/pricing">free tier</a> you can have up to 7000 active Users.

They have a <a href="https://auth0.com/docs/quickstart/spa/aurelia/01-login">quickstart for Aurelia</a> and you can find a lot of resources on how to secure your Aurelia App with Auth0.

<h3>msal.js</h3>

Microsoft itself has an own library called <a href="https://github.com/AzureAD/microsoft-authentication-library-for-js">msal</a> which naturally plays well along with Azure. We chose this one.

It has support for a newer feature like Azure B2C and is well maintained. It's possible to use it without Aurelia even before we downloaded all the Aurelia plugins and client code. This comforts some security aspects as well. 

<h2>Implement AD B2C Authentication</h2>

I don't want to reinvent the wheel here. There is a quite current and comprehensive <a href="https://chrisdennig.me/2017/09/06/secure-an-aurelia-single-page-app-with-azure-active-directory-b2c-msal/">blog post</a>, that describes a lot of the needed steps and gives a good impression on how to secure your application with msal.js and even how you have to configure Azure.
 

Since there was an update to the msal library you should be able to download it normally via <code>npm install</code> (or jspm) so the most bugs mentioned in the post, should be solved.


<h2> Summary </h2>

There are a lot of possibilities to secure your Aurelia application. Like always in the JavaScript world, you first have to make your way through the framework jungle and find the one that fits your needs. This blog described my approach and maybe helps others with the decision. You seldom need a specific aurelia plugin since most existing well-established plugins are working quite fine with Aurelia.

