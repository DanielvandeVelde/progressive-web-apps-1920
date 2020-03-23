require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const dataClean = require("./modules/data.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("static"));

app.set("view engine", "ejs");
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set("views", "views");

app.get("/", (req, res) => {
  const key = process.env.COIN_MARKET_CAP_KEY,
    currency = "EUR",
    cors = "https://cors-anywhere.herokuapp.com/",
    limit = "50", //Limit to the amount of coins I'm requesting
    api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1",
    url = `${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

  fetch(url).then(async response => {
    const rawData = await response.json();

    const cleanData = dataClean.overview(rawData);

    res.render("overview", {
      title: "Cryptocurrency",
      cleanData
    });
  });
});

app.get("/coin/:coin", async (req, res) => {
  let key = process.env.CRYPTO_COMPARE_KEY,
    currency = "EUR",
    abbreviation = req.params.coin,
    //
    dayLimit = "30", //30 days + today
    dayApi = "https://min-api.cryptocompare.com/data/v2/histoday?",
    dayUrl = `${dayApi}fsym=${abbreviation}&tsym=${currency}&limit=${dayLimit}&api-key=${key}`,
    //
    hourLimit = "23", // 23 hours in a day, right?
    hourApi = "https://min-api.cryptocompare.com/data/v2/histohour?",
    hourUrl = `${hourApi}fsym=${abbreviation}&tsym=${currency}&limit=${hourLimit}&api-key=${key}`;
  //
  let dayResponse = await fetch(dayUrl);
  dayResponse = await dayResponse.json();
  let hourResponse = await fetch(hourUrl);
  hourResponse = await hourResponse.json();

  let coinData = {
    day: dayResponse,
    hour: hourResponse
  };
  let graphPoints = await dataClean.detail(coinData);

  res.render("detail", {
    abbreviation,
    graphPoints
  });
});

app.get("/top", async (req, res) => {
  const key = process.env.COIN_MARKET_CAP_KEY,
    currency = "EUR",
    cors = "https://cors-anywhere.herokuapp.com/",
    limit = "50", //Limit to the amount of coins I'm requesting
    api =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1",
    url = `${api}&limit=${limit}&convert=${currency}&CMC_PRO_API_KEY=${key}`;

  fetch(url).then(async response => {
    const rawData = await response.json();
    const cleanData = dataClean.overview(rawData);
    const topData = dataClean.top(cleanData);

    res.render("bestworst", {
      minimum: topData[0],
      maximum: topData[1]
    });
  });
});

app.get("/offline", (req, res) => {
  res.render("offline");
});

app.listen(port, () => console.log(`Crypto app listening on port ${port}!`));
