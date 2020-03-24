module.exports = {
  overview(rawData) {
    let cleanData = rawData.data.map(coin => {
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

    return cleanData;
  },
  detail(rawData) {
    let dayData = rawData.day.Data.Data,
      hourData = rawData.hour.Data.Data,
      hourOptions = {
        hour: "numeric",
        minute: "2-digit"
      };

    let graphData = {
      hour: createGraphPoints(hourData, hourOptions),
      day: createGraphPoints(dayData),
      week: createGraphPoints(dayData).slice(24, 31)
    };

    function createGraphPoints(cleanedData, options) {
      let graphData = cleanedData.map(coin => {
        let price = (coin.high + coin.low) / 2;
        price = Number(price).toFixed(2);
        let time = new Date(coin.time * 1000).toLocaleDateString(
          undefined,
          options
        );
        return {
          t: time,
          y: price
        };
      });
      return graphData;
    }

    return graphData;
  },
  top(cleanData) {
    let maximum = cleanData.reduce((max, coin) =>
      Number(max.day) > Number(coin.day) ? max : coin
    );

    //And a different way so I can show off .filter()
    let minimumValue = cleanData.reduce((min, coin) => {
      return Math.min(coin.day, min);
    }, Infinity);
    let minimum = cleanData.filter(coin => {
      return coin.day == minimumValue;
    });

    return [minimum[0], maximum];
  }
};
