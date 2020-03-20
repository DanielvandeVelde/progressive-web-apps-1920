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

And to build & start the server on localhost:3000

```bash
npm start
```

## What's going on

Currently this web-app will make a request to a Cryptocurrency API, creates a web-page with this information and serve it to the user.  
On the mainpage it will show the most data in an overview of different coins.  
On the detail-pages it uses different API data and requests to get data and converts these to points in a graph.  
This graph gets served to the user by also serving chart.js and a `<script>`

The next step will be using manifest and a service-worker to streamline this process and deliver data when the server or API is unreachable and turning this into an installable web-app.

## To-do / Wishlist

Currently working on:

- [x] Making build scripts
- [x] Figuring out Heroku
- [x] Create detail pages
- [x] Creating a manifest
- [ ] Adding a service worker
- [ ] Finishing an awesome web-app
