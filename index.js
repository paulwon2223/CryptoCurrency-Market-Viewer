var dropdowns = document.querySelectorAll('.dropdown-trigger')
for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

var input = document.getElementById('inputfield');
var icon = document.getElementById('icon');
var coinName = document.getElementById('name');
var symbol = document.getElementById('symbol');
var currentPrice = document.getElementById('price');
var desc = document.getElementById('description');
var lowPrice = document.getElementById('low');
var highPrice = document.getElementById('high');
var athPrice = document.getElementById('ath');
var mainImg = document.getElementById('imgcont');
var table = document.getElementById('tablelist');
var coinCont = document.getElementById('coincont');
var sellBttn = document.getElementById('sell');
var buyBttn = document.getElementById('buy');
var priceChange24 = document.getElementById('pricechange24h');
var priceChange7d = document.getElementById('pricechange7d');
var popImg = document.getElementById('popularimg1');
var popImg1 = document.getElementById('popularimg2');
var popImg2 = document.getElementById('popularimg3');
var popImg3 = document.getElementById('popularimg4');
var popTitle = document.getElementById('popularname1');
var popTitle1 = document.getElementById('popularname2');
var popTitle2 = document.getElementById('popularname3');
var popTitle3 = document.getElementById('popularname4');
var pricePage = document.getElementById('pricepage');
var cardName = document.getElementById('cardname');
var cardName1 = document.getElementById('cardname1');
var cardName2 = document.getElementById('cardname2');
var cardName3 = document.getElementById('cardname3');
var rank = document.getElementById('rank1');
var rank1 = document.getElementById('rank2');
var rank2 = document.getElementById('rank3');
var rank3 = document.getElementById('rank4');
var btcprice = document.getElementById('btcprice1');
var btcprice1 = document.getElementById('btcprice2');
var btcprice2 = document.getElementById('btcprice3');
var btcprice3 = document.getElementById('btcprice4');
var pricePage = document.getElementById('pricepage');
var marketPrice = document.getElementById('market');
var frontCont = document.getElementById('frontcontainer');
var coinList = document.getElementById('coinlist')
var searchedCoins = document.getElementById('searchedCoins')

var myChart;

coinCont.style.display = 'none';
frontCont.style.display = 'none';



var searchedCoin = [];


input.addEventListener('keypress', function(event) {
    // event.preventDefault();
    if (event.key === 'Enter') {
        getApi();
        popularCoin();
        coinCont.style.display = 'flex';
        frontCont.style.display = 'flex';

        var userInput = input.value;
        searchedCoin.push(userInput)
        localStorage.setItem("searchedCoin", JSON.stringify(searchedCoin));

       
    }
})

var savedCoin = JSON.parse(localStorage.getItem("searchedCoin"));
if (savedCoin !== null) {
    searchedCoin = savedCoin
    for (let i = 0; i < savedCoin.length; i++) {
        console.log(savedCoin);
        var bttn = document.createElement('button');
        bttn.innerText = savedCoin[i]
        console.log(bttn);
        searchedCoins.appendChild(bttn)

        bttn.addEventListener("click", function (){
            input.value = savedCoin[i]
            getApi();
            popularCoin();
            coinCont.style.display = 'flex';
            frontCont.style.display = 'flex';
        })
       
    }
}


function chunkAverage(priceArr, len){
    var chunkArr =[]
    var index = 0;
    var priceArrayLen = priceArr.length;
    while(index < priceArrayLen){
        chunkArr.push(priceArr.slice(index, index += len))
    }
    var avgPrices = chunkArr.map(chunkedArr => {
       const lengthChunkedArr = chunkedArr.length
       const sumChunkedArray = chunkedArr.reduce((previous, current)=>previous + current)
       const arrAvg = sumChunkedArray / lengthChunkedArr
       return arrAvg
    })
    return avgPrices
}

input.addEventListener('keypress', function(event) {
    // event.preventDefault();
    if (event.key === 'Enter') {
        getApi();
        // getHistoricalData(nameValue);
    }
})

pricePage.addEventListener('click', popularCoin())

function marketData () {
    var marketApi = 'https://api.coingecko.com/api/v3/global'
    fetch (marketApi)
    .then (function (response){
        return response.json();
    })
    .then (function (data){
        console.log(data);
        var marketDataValue = data.data.market_cap_change_percentage_24h_usd

        console.log(marketDataValue);
        marketPrice.innerHTML = `${marketDataValue.toFixed(2)}%`

    

        if (marketDataValue < 0) {
            marketPrice.innerHTML = ` down ${marketDataValue.toFixed(2)}%`
            marketPrice.style.color = 'red'
        } else {
            marketPrice.innerHTML = ` up ${marketDataValue.toFixed(2)}%`
            marketPrice.style.color = 'green'
        }

    })
}

function popularCoin () {
    marketData();
    var popularCoinApi = 'https://api.coingecko.com/api/v3/search/trending'
    fetch (popularCoinApi)
    .then (function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        var popImgValue1 = data.coins[0].item.large
        var popImgValue2 = data.coins[1].item.large
        var popImgValue3 = data.coins[2].item.large
        var popImgValue4 = data.coins[3].item.large
        var popNameValue1 = data.coins[0].item.name
        var popNameValue2 = data.coins[1].item.name
        var popNameValue3 = data.coins[2].item.name
        var popNameValue4 = data.coins[3].item.name
        var rankValue1 = data.coins[0].item.market_cap_rank
        var rankValue2 = data.coins[1].item.market_cap_rank
        var rankValue3 = data.coins[2].item.market_cap_rank
        var rankValue4 = data.coins[3].item.market_cap_rank
        var btcPriceValue1 = data.coins[0].item.price_btc
        var btcPriceValue2 = data.coins[1].item.price_btc
        var btcPriceValue3 = data.coins[2].item.price_btc
        var btcPriceValue4 = data.coins[3].item.price_btc

        popImg.src = popImgValue1
        popImg1.src = popImgValue2
        popImg2.src = popImgValue3
        popImg3.src = popImgValue4
        popTitle.innerHTML = popNameValue1
        popTitle1.innerHTML = popNameValue2
        popTitle2.innerHTML = popNameValue3
        popTitle3.innerHTML = popNameValue4
        cardName.innerHTML = popNameValue1
        cardName1.innerHTML = popNameValue2
        cardName2.innerHTML = popNameValue3
        cardName3.innerHTML = popNameValue4
        rank.innerHTML = rankValue1
        rank1.innerHTML = rankValue2
        rank2.innerHTML = rankValue3
        rank3.innerHTML = rankValue4
        btcprice.innerHTML = btcPriceValue1
        btcprice1.innerHTML = btcPriceValue2
        btcprice2.innerHTML = btcPriceValue3
        btcprice3.innerHTML = btcPriceValue4

    })
}
  

function getApi () {
    var coinApi = 'https://api.coingecko.com/api/v3/search?query='+input.value+''
    fetch (coinApi)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        var nameValue = data.coins[0].id



        getCoinInfo(nameValue)
        getHistoricalData(nameValue)
    })
}

function getHistoricalData(coinID) {
    var toDate= parseInt((new Date().getTime()/1000).toFixed(0))
    var fromDate= parseInt((new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime()/1000).toFixed(0))
    var coinHistoricalInfo = 'https://api.coingecko.com/api/v3/coins/'+coinID+"/market_chart/range?vs_currency=usd&from="+fromDate+"&to="+toDate
    fetch(coinHistoricalInfo)
    .then(function(response){
        return response.json();
    }) .then(function(data){
        // console.log(data)
        var pricesArray = data.prices
        var timeArray = pricesArray.map(pricesUnix => moment.unix(pricesUnix[0]/1000).format('MM/DD/YY') )
        var priceArr = pricesArray.map(pricesUnix => pricesUnix[1])
        var labels = timeArray.filter((timeReader, i ) => {
            if(i % 24 === 0){
                return timeReader
            }
        })
        labels.push(timeArray[timeArray.length -1])
        console.log (labels)
        console.log(timeArray)
        var prices = pricesArray.map (pricesUnix => pricesUnix[1])
        console.log(prices)
        var prices = chunkAverage(priceArr, 24)
        prices.push(pricesArray[pricesArray.length -1][1])
        console.log(prices)
        if(myChart){
            myChart.destroy()
        }
          const chartData = {
            labels: labels,
            datasets: [{
              label: 'Price Change in USD',
              backgroundColor: '#5AFF15',
              borderColor: '#5AFF15',
              data: prices,
            }]
          };
          const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = 'black';
              ctx.strokeStyle = 'rgb(255, 99, 132)';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
          };

          Chart.defaults.color = 'white';
          Chart.defaults.font.size = 14
          Chart.defaults.font.family = 'Montserrat', 'sans-serif'
          console.log(Chart.defaults);
          
          const config = {
            type: 'line',
            data: chartData,
            options: {},
            plugins: [plugin]
          };

          myChart = new Chart(
            document.getElementById('chart'),
            config
            
          );
    })
}

function getCoinInfo (nameValue) {
    var coinInfoApi = 'https://api.coingecko.com/api/v3/coins/'+nameValue
    fetch (coinInfoApi)
    .then (function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        var iconValue = data.image.large
        var nameValue = data.id
        var symbolValue = data.symbol
        var currentPriceValue = data.market_data.current_price.usd
        var lowValue = data.market_data.low_24h.usd
        var highValue = data.market_data.high_24h.usd
        var priceChangeValue = data.market_data.price_change_percentage_7d
        var athValue = data.market_data.ath.usd
        var downValue = data.sentiment_votes_down_percentage
        var upValue = data.sentiment_votes_up_percentage
        var priceChangeValue24 = data.market_data.price_change_percentage_24h
        var priceChangeValue7 = data.market_data.price_change_percentage_7d

        icon.src = iconValue;
        coinName.innerHTML = ` ${nameValue}`
        symbol.innerHTML = ` ${symbolValue}`
        currentPrice.innerHTML = ` $${currentPriceValue}`
        lowPrice.innerHTML = ` $${lowValue}`
        highPrice.innerHTML = ` $${highValue}`
        athPrice.innerHTML = ` $${athValue}`
        sellBttn.innerHTML = `${downValue}%`
        buyBttn.innerHTML = `${upValue}%`
        priceChange24.innerHTML = `${priceChangeValue24.toFixed(2)}%`
        priceChange7d.innerHTML = `${priceChangeValue7.toFixed(2)}%`

        if (priceChangeValue24 && priceChangeValue7 > 0) {
            priceChange24.style.color = 'green'
            priceChange7d.style.color = 'green'
        } else {
            priceChange24.style.color = 'red'
            priceChange7d.style.color = 'red'
        }



        if (upValue < downValue) {
            sellBttn.style.backgroundColor = 'red'
            buyBttn.style.backgroundColor = 'white'
        } else {
            buyBttn.style.backgroundColor = '#8CFF98'
            sellBttn.style.backgroundColor = 'white'
        }

    })
}

