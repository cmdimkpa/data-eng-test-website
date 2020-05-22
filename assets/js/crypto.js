// client library for Crypto Compare application

/* Get Symbol Data from Relay API  */
const RelayOut = async (symbol, appKey) => {
  return await axios.get(`https://data-eng-test.herokuapp.com/relay-api/v1/relay-out?Symbol=${symbol}`, {
    headers : { Authorization : appKey }
  }).then(response => {
    return response.data.data.records; // symbol data
  }).catch(error => {
    console.log(error)
  })
}

/* asynchronous update */
const asyncUpdate = async (symbol) => {
  // update tracker
  ga(`${symbol}_tracker.send`, 'event', 'Dropdown', 'click', symbol);
  // update chart
  let datas = await RelayOut(symbol, '0a8d149c073adc16cb1c7685c289ef26897986fccc96b5774b15b0103729cb86');
  let myLabels = datas.map(data => { return data[2] })
  let prices = datas.map(data => { return data[4] })
  let sizes = datas.map(data => { return data[5] })
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: myLabels,
      datasets: [{
          data: prices,
          label: "Price",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: sizes,
          label: "Size",
          borderColor: "#8e5ea2",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: `Historical ${symbol} Index`
      }
    }
  });
}
