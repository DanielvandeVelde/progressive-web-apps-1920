# Progressive Web Apps 1920

<kbd>![Shiny front-end](https://raw.githubusercontent.com/DanielvandeVelde/progressive-web-apps-1920/master/readme%20images/front%20end.png "Shiny front-end")</kbd>

This is a continuation of my [WAFS 19-20 assignment](https://github.com/danielvandevelde/web-app-from-scratch-1920)
I have a demo over there of a client-side-version.  
This is a mostly server-sided progressive-web-app with a [demo here](https://cryptocurrency-1920.herokuapp.com/)

## Install

You can fork this project and then clone it by using:

```bash
git clone https://github.com/your-username/progressive-web-apps-1920
```

To install everything you can use:

```bash
npm install
```

And to build you need to run:

```bash
npm run-script build
```

Because I specifically designed that stuff to run properly on Heroku.

Then you can start your server on `localhost:3000` by running:

```bash
npm start
```

## What's going on

Currently this web-app will make a request to a Cryptocurrency API, creates a web-page with this information and serve it to the user.  
On the mainpage it will show the most data in an overview of different coins.  
On the detail-pages it uses different API data and requests to get data and converts these to points in a graph.  
This graph gets served to the user by also serving chart.js and a `<script>`

## What happened

### Progessive Web App

In the route to making this a PWA I first added a manifest.  
The biggest challenge that gave me was the custom splash screen and several errors about my images not being perfect squares.  
After solving those I started the optimization by adding theme-colors, apple-touch-icons etc.

Then I added a Service Worker.  
Since it's very important for the application to stay up-to-date the only things I put in cache are the css, js, images as well as an offline page.  
The ServiceWorker will install itself first.  
After receiving a fetch request it will check if it's a file it has in the cache, if not it will check the network. If both of these fail it will send the user the offline page from the cache.
The Service Worker really helped in making sure my repeat views were way faster than before. Especially serving the third-party library (that was huge even when minified) really helped making the PWA a lot faster on the repeat views even though the parsing still takes a while.

It's on the wishlist to tell the user when it's offline and serve him old data while also informing the user how old that data is. If I had more time I would definitely explore this option.

### Performance

When I started improving performance already had a couple of build-scripts to make sure the files were minified/uglified basically as small as possible since I was already familiar with how to set-up a server-side website.  
Express compression also really helped me in making sure my Time To First Byte (especially on the first view) was as small as possible.

### Critical Rendering Path

For the critical rendering path I have no @imports, put all the CSS in the head and made sure it wasn't render-blocking as much as I could by making it as small as possible with build-scripts I referenced earlier. My Javascript is already not render-blocking because of a defer and only adds interactivity as a progressive enhancement.

### Accesibility

If you've seen [The previous version](www.github.com/DanielvandeVelde/web-app-from-scratch-1920) you can see this one is a lot different.  
There were tons of issues, some of which I've described in Dutch over at [Browser-tech Assignment 1.2](www.github.com/Danielvandevelde/browser-technologies-1920) but will summarize here:

- I was missing a lot of `<meta>` tags
- My form elements didn't have proper labels
- Some of my links didn't have any content (just a back arrow)
- Bad color contrast (black/red/green on darkgray)

Which I have all fixed by now.

I have also tried to make it better for a screenreader by adding in a table on the detailpage.

<kbd>![detailpage table](https://raw.githubusercontent.com/DanielvandeVelde/progressive-web-apps-1920/master/readme%20images/table.png "detailpage table")</kbd>

This way something can actually be read instead of the screenreader not knowing what to do and as a bonus it also helps with performance since the graph is now just an enhancement.

### Conclusion

<kbd>![Audit results after improvements](https://raw.githubusercontent.com/DanielvandeVelde/progressive-web-apps-1920/master/readme%20images/after.png "Audit results after improvements")</kbd>

I'm happy how everything turned out.  
The audit tool shows (almost) perfect scores and I really spend a lot of time optimizing the PWA so it has the best performance I could get and the fastest time to first byte.
I managed to get a service worker working that shows an offline page as well as caching all the needed JS and CSS files which really helps for repeat views.  
I've got extra-functionalities working server-side and am using client-side JavaScript to progressively enhance the detailpage.

## To-do / Wishlist

Currently working on:

- [x] Making build scripts
- [x] Figuring out Heroku
- [x] Create detail pages
- [x] Create graph fallback for no JS
- [x] Creating a manifest
- [x] Adding a service worker
- [x] Serve files via SW when offline
- [ ] Show user old + a message when offline
- [x] Check audit tools (Critical render path)
- [x] Optimize! (minify, defer etc.)
