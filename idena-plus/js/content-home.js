var curprice = '--';
var percentage = '--';
var percentage7 = '--';
var percentage30 = '--';
var totalvol = '--';
var countDownDate = new Date("").getTime();
var validTime = '--';


var parent3 = document.querySelector(".main .container:last-child");
var coinchange = parent3.querySelector(".section:first-child");
var minechange = parent3.querySelector(".section:last-child");

function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
}

function precise3(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:3});
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function pricemagic(){
  var currentpricewidget = '<div class="col-3 col-sm-3">'
            +'<h1>Current Price</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
             +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col">'
                    +'<div class="col-auto"><h3 class="info_block__accent" id="CurrentPrice">$ '+curprice+'</h3></div>'
                    +'<div class="control-label" data-toggle="tooltip" title="Current market price in USD" data-original-title="Current market price in USD">Price in (USD)</div>'
              +'</div>'
              +'</div>'
              +'</div>'
              +'</div></div>';

  var timewidget = '<section class="section section_info">' 
            +'<div class="row">'
            +currentpricewidget
            +'<div class="col-9 col-sm-9">'
            +'<h1>Next Validation In</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
            +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col lead_info__counter" id="TimerPanel">'
                +'<div id="counter" class="_value row justify-content-center">'
                  +'<div class="col-auto">'
                    +'<span class="days">--</span>'
                    +'<span class="_smalltext"> days</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="hours">--</span>'
                    +'<span class="_smalltext"> hours</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="minutes">--</span>'
                    +'<span class="_smalltext"> min</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="seconds">--</span>'
                    +'<span class="_smalltext"> seconds</span>'
                  +'</div>'
                +'</div>'
                +'<div class="control-label" data-toggle="tooltip">'
                  +'Validation time: <span id="NextValidationDateTime">--</span>'
                +'</div>'
              +'</div>'
              +'</div>'
              +'</div>'
              +'</div>'              
              +'</div>'
              
            +'</div>'
          +'</section>';

  var pricewidget = '<section class="section section_info">'
        +'<div class="row">'
         +'<div class="col-12 col-sm-12">'
            +'<h1>Price Change</h1>'
            +'<div class="card">'
              +'<div class="info_block">'
                +'<div class="row" id="PriceSection">'
                  +'<div class="col-12 col-sm-3 bordered-col">'
                    +'<h3 class="info_block__accent" id="CurrentPrice">'+percentage+'</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="Percentage change in price over 24 hours" data-original-title="Percentage change in price over 24 hours">24 hr change</div>'
                  +'</div>'
                  +'<div class="col-12 col-sm-3 bordered-col">'
                    +'<h3 class="info_block__accent" id="PercentageChange">'+percentage7+'</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="Percentage change in price over last 7 days" data-original-title="Percentage change in price over 7 days">7 days change</div>'
                  +'</div>'
                  +'<div class="col-12 col-sm-3 bordered-col">'
                    +'<h3 class="info_block__accent" id="PercentageChange">'+percentage30+'</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="Percentage change in price over last 30 days" data-original-title="Percentage change in price over 30 days">30 days change</div>'
                  +'</div>'
                  +'<div class="col-12 col-sm-3 bordered-col">'
                    +'<h3 class="info_block__accent" id="MarketVolume">'+totalvol+' USD</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="24 hour volume in USD" data-original-title="24 hour volume in USD">24 hr volume (USD)</div>'
                  +'</div>'                  
                +'</div>'
                +'<div class="row" style="height: 30px;"><a href="https://www.coingecko.com/en/coins/idena" target="_blank" style="display: inline-block; position: absolute; left:43.5%" class="btn btn-secondary btn-small"><span>More price data</span></a></div>'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
     +'</section>';


parent3.innerHTML = '<section class="section section_info">'+coinchange.innerHTML+'</section>' + timewidget + pricewidget + '<section class="section section_info">'+minechange.innerHTML +'</section>';

}


function color(x) {
  if(x<0) {
     return '<span class="red">'+x+' %</span>';
  } else {
    return '<span class="green">+'+x+' %</span>';
  }
}


function timemagic(){
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("counter").innerHTML = '<div class="col-auto">'
                    +'<span class="days">'+days+'</span>'
                    +'<span class="_smalltext"> days</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="hours">'+hours+'</span>'
                    +'<span class="_smalltext"> hours</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="minutes">'+minutes+'</span>'
                    +'<span class="_smalltext"> min</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="seconds">'+seconds+'</span>'
                    +'<span class="_smalltext"> seconds</span>'
                  +'</div>';
  document.getElementById("NextValidationDateTime").innerHTML = validTime;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "EXPIRED";
  }
}, 1000);
}


window.onload = (function(){

  ajax_get('https://api.coingecko.com/api/v3/coins/idena?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false', function(data) {
    //console.log(data);
    curprice = precise3(data['market_data']['current_price']['usd']);
    totalvol = precise3(data['tickers'][0]['converted_volume']['usd']);

    percentage = color(precise2(data['market_data']['price_change_percentage_24h']));
    percentage7 = color(precise2(data['market_data']['price_change_percentage_7d']));
    percentage30 = color(precise2(data['market_data']['price_change_percentage_30d']));
   
    pricemagic();

      ajax_get('https://api.idena.io/api/epoch/last', function(data) {
      countDownDate = new Date(data['result']['validationTime']).getTime();
      var d = new Date(data['result']['validationTime']);
      validTime = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
      timemagic();
      });

  });


})();



