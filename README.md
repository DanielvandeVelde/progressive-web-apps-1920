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

### Performance

<kbd>![Audit before after improvements](https://raw.githubusercontent.com/DanielvandeVelde/progressive-web-apps-1920/master/readme%20images/before.png "Audit results before improvements")</kbd>

This was the 'before', at this point I already had a couple of build-scripts to make sure the files were minified/uglified basically as small as possible since I was already familiar with how to set-up a server-side website and some of this information.

I still had a couple of things to do such as: text-compression and making sure my css wasn't render-blocking.  
I eventually used compression and chose to use system-fonts instead of a font-face.

I have also added a table to the detailpages so data can be shown before/without javascript. This also has added accesibility benefits.

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

### After

<kbd>![Audit results after improvements](https://raw.githubusercontent.com/DanielvandeVelde/progressive-web-apps-1920/master/readme%20images/after.png "Audit results after improvements")</kbd>

I'm happy how everything turned out.  
I really wished I had a better solution for the third-party library I'm loading in at the detailpages, but I think I did well by first creating tables and adding everything else as a progressive enhancement.

## To-do / Wishlist

Currently working on:

- [x] Making build scripts
- [x] Figuring out Heroku
- [x] Create detail pages
- [ ] Create graph fallback for no JS
- [x] Creating a manifest
- [ ] Adding a service worker
- [ ] Serve files via SW when offline
- [ ] Show user when offline
- [ ] Check audit tools (Critical render path)
- [ ] Optimize! (minify, defer etc.)
