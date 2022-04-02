var currnetTime = moment().format("h" + ':' + "mm" + "a")
  $("#current-time").html(currnetTime);
var currentDay = moment().format("dddd, MMMM Do YYYY");
  $("#current-day").html(currentDay); 

var nameMain = document.getElementById('name')
var price = document.getElementById('price')
var lowPrice = document.getElementById('lowerprice')
var input = document.getElementById('inputfield')
var icon = document.getElementById('icon')

input.addEventListener('keypress', function(event) {
    // event.preventDefault();
    if (event.key === 'Enter') {
        getApi();
    }
})

// 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

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
        var priceValue = data.market_data.current_price.aud

    })
}

// $(document).ready(function() {
//     var urls = ['https://pp.userapi.com/c629327/v629327473/db66/r051joYFRX0.jpg', 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg', 'https://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src:Image:-FreeDigitalPhotos.net.jpeg', 'http://www.travelettes.net/wp-content/uploads/2014/03/IMG_3829-Medium-600x400.jpg'];
  
//     var cout = 1;
//     $('#mainimg').css('background-image', 'url("' + urls[0] + '")');
//     setInterval(function() {
//       $('#mainimg').css('background-image', 'url("' + urls[cout] + '")');
//       cout == urls.length-1 ? cout = 0 : cout++;
//     }, 5000);
//   });

