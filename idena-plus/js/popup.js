var curprice = 0;
var buyusd = '--';
var buyeth = '--';
var buybtc = '--';

function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
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


function color(x) {
  if(x<0) {
     return '<span class="red">'+x+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+x+'% &#x2191;</span>';
  }
}


function fetch()
{
	ajax_get('https://api.coingecko.com/api/v3/coins/idena?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false', function(data) {
	
	buyusd = data['market_data']['current_price']['usd'];
  buybtc = data['market_data']['current_price']['btc'];
  buyeth = data['market_data']['current_price']['eth'];

	document.getElementById("USD").innerHTML = buyusd;
  document.getElementById("BTC").innerHTML = buybtc;
  document.getElementById("ETH").innerHTML = buyeth;

  document.getElementById("h24").innerHTML = color(precise2(data['market_data']['price_change_percentage_24h']));
  document.getElementById("d7").innerHTML = color(precise2(data['market_data']['price_change_percentage_7d']));
  document.getElementById("d30").innerHTML = color(precise2(data['market_data']['price_change_percentage_30d']));

  }); 
}


function pricerefresh(){
  var x = setInterval(function() {
  fetch(); 
  
}, 2000);
}

fetch();