# Progressive Web Apps 1920

## Beoordeling 20 maart 2020

Ik weet nog niet zo goed waar ik op beoordeeld kan worden.
Over het algemeen gaat het best lekker en moet ik nog even goed de service worker uitwerken. Dat is misschien iets waar ik nog wat richting in nodig heb en wat onderzoek naar moet doen.

<kbd>![Shiny front-end](https://raw.githubusercontent.com/DanielvandeVelde/web-app-from-scratch-1920/master/public/img/banner.png "Shiny front-end")</kbd>
<sub><sup>Remember bitcoin being at \$9k just a month ago?</sup></sub>

This is a continuation of my [WAFS 19-20 assignment](https://github.com/danielvandevelde/web-app-from-scratch-1920)
I have a demo over there of a client-side-version and this is a mostly server-sided progressive-web-app with a [demo here](https://cryptocurrency-1920.herokuapp.com/)

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

I've made several buildscripts that make sure the files are as small as possible.  
I might even gzip the files I'm sending as well, but I still have to look into that.

The Javascript I'm serving right now is third-party. According to the audit I did this slows down the app by about 0.4 seconds. I'm going to run that from the JS folder and also throw some minimizing and such on that to make sure it won't stand in my way for perfect performance.

### Accesibility

If you've seen [The previous version](www.github.com/DanielvandeVelde/web-app-from-scratch-1920) you can see this one is a lot different.  
There were tons of issues, some of which I've described in Dutch over at [Browser-tech Assignment 1.2](www.github.com/Danielvandevelde/browser-technologies-1920) but will summarize here:

- I was missing a lot of `<meta>` tags (4+)
- My form elements didn't have proper labels
- My links didn't have any names
- Bad color contrast (black on darkgray)

Which I have all luckily fixed.

Currently a to-do is to make sure I have a fallback for the chart in place, which probably means I'm going to put the chart on top of existing data below it, so a screenreader can read it and non-JS users can view it.

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
