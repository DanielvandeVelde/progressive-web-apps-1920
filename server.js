require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");

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

    let cleanData = await rawData.data.map(coin => {
      let price = Number(coin.quote.EUR.price).toFixed(2);
      price = price.replace(".", ",");
      price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      return {
        name: coin.name,
        abbreviation: coin.symbol,
        price: price,
        hour: Number(coin.quote.EUR.percent_change_1h).toFixed(2),
        day: Number(coin.quote.EUR.percent_change_24h).toFixed(2),
        week: Number(coin.quote.EUR.percent_change_7d).toFixed(2)
      };
    });

    res.render("overview", {
      title: "Cryptocurrency",
      cleanData
    });
  });
});

app.get("/coin/:coin", async (req, res, coin) => {
  let key = process.env.CRYPTO_COMPARE_KEY,
    currency = "EUR",
    //
    dayLimit = "30", //30 days + today
    dayApi = "https://min-api.cryptocompare.com/data/v2/histoday?",
    dayUrl = `${dayApi}fsym=${coin}&tsym=${currency}&limit=${dayLimit}&api-key=${key}`,
    //
    hourLimit = "23", // 23 hours in a day, right?
    hourApi = "https://min-api.cryptocompare.com/data/v2/histohour?",
    hourUrl = `${hourApi}fsym=${coin}&tsym=${currency}&limit=${hourLimit}&api-key=${key}`;
  //
  let dayResponse = await fetch(dayUrl);
  dayResponse = await dayResponse.json();
  let hourResponse = await fetch(hourUrl);
  hourResponse = await hourResponse.json();

  let coinData = {
    day: dayResponse,
    hour: hourResponse
  };

  res.render("detail", { coinData, coin });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
