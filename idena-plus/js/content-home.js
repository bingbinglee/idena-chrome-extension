var curprice = '--';
var percentage = '--';
var percentage7 = '--';
var percentage30 = '--';
var totalvol = '--';
var growth_last = '';
var current = '';
var genesis = 60;
var previous = '';
var epoch = '';
var epochlink = '';
var epoch1 = '';
var growth_last = '--';

var countDownDate = new Date("").getTime();
var validTime = '--';


var parent3 = '';

var coinchange = '';
var minechange = '';

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


  var currentpricewidget = '<div class="col-12 col-sm-3">'
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

  var growthwidget = '<div class="col-12 col-sm-3">'
            +'<h1>Network Growth</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
             +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col">'
                    +'<div class="col-auto"><h3 class="info_block__accent" id="NetworkGrowth"> '+growth_last+'</h3></div>'
                    +'<div class="control-label" data-toggle="tooltip" title="Network growth since last epoch" data-original-title="Network growth since last epoch">Growth since last epoch</div>'
              +'</div>'
              +'</div>'
              +'</div>'
              +'</div></div>';


  var hotcontainer = document.createElement("section");
  hotcontainer.classList.add("section");
  hotcontainer.classList.add("section_info");

  hotcontainer.innerHTML = '<div class="row">'
            +currentpricewidget
            +'<div class="col-12 col-sm-6">'
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

              +growthwidget
              
            +'</div>';


  var hotcontainer1 = document.createElement("section");
  hotcontainer1.classList.add("section");
  hotcontainer1.classList.add("section_info");

  hotcontainer1.innerHTML = '<div class="row">'
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
                +'<div class="row" style="height: 30px;"><a href="https://nomics.com/assets/dna2-idena" target="_blank" style="display: inline-block; position: absolute; left:43.5%" class="btn btn-secondary btn-small"><span>More price data</span></a></div>'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>';

parent3.insertBefore(hotcontainer, minechange);
parent3.insertBefore(hotcontainer1, minechange);

}


function color(x) {
  if(x<0) {
     return '<span class="red">'+precise2(x)+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+precise2(x)+'% &#x2191;</span>';
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
  if(document.getElementById("counter")) {
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
  }
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "EXPIRED";
  }
}, 1000);
}


window.onload = (function(){

  ajax_get('https://api.coinpaprika.com/v1/tickers/dna-idena?quotes=USD', function(data) {
    //console.log(data);
    curprice = precise3(data['quotes']['USD']['price']);
    totalvol = precise3(data['quotes']['USD']['volume_24h']);

    percentage = color(data['quotes']['USD']['percent_change_24h']);
    percentage7 = color(data['quotes']['USD']['percent_change_7d']);
    percentage30 = color(data['quotes']['USD']['percent_change_30d']);
   

    parent3 = document.querySelector(".main .container:last-child");

    coinchange = parent3.querySelectorAll(".section")[0];
    minechange = parent3.querySelectorAll(".section")[2];

    pricemagic();

      ajax_get('https://api.idena.io/api/epoch/last', function(data) {
      epochlink = data['result']['epoch'];
      epoch = data['result']['epoch']-2;
      epoch1 = data['result']['epoch'];
      countDownDate = new Date(data['result']['validationTime']).getTime();
      var d = new Date(data['result']['validationTime']);
      validTime = d.toDateString() + ' ' + d.toLocaleTimeString();
      timemagic();

        ajax_get('https://api.idena.org/api/Epoch/'+epoch1+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {

          current = data["result"];

          ajax_get('https://api.idena.org/api/Epoch/'+epoch+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {  

            previous = data["result"];
            growth_last = color((current-previous)/previous*100);

            document.getElementById("NetworkGrowth").innerHTML = growth_last;

          });

        });

      });

  });


})();



