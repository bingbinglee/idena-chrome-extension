var parent2 = document.querySelector(".main .container:last-child");
var modechange = parent2.querySelector(".section_info");

var topheader = parent2.querySelector(".section:first-child");

var address = document.querySelector(".section_main__subtitle");
//console.log(modechange);

var balance = '';
var stake = '';
var total = '';
var curprice = '';
var txCount = '';


function copyFunction() {
  var copyText = document.getElementById("Address");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}


topheader.innerHTML += '<div class="button-group">'
        +'<a href="#" onclick="var range \= document.createRange();'
                    +'range.selectNode(document.getElementById(\'Address\'));'
                    +'window.getSelection().removeAllRanges();' // clear current selection
                    +'window.getSelection().addRange(range);' // to select text
                    +'document.execCommand(\'copy\');'
                    +'document.getElementById(\'copycat\').innerHTML \= \'Copied!\';'
                    +'window.getSelection().removeAllRanges();" class="btn btn-secondary btn-small">'
         +'<i class="icon icon--coins"></i>'
          +'<span id="copycat">Copy Address</span>'
        +'</a>'
        +'</div>';


function details_switch(x1,y1,z1,n1) {

var details = '<div class="row">'
                +'<div class="col-9 col-sm-9">'
                +'<h3>Details</h3>'
            +'<div class="card">'
              +'<div class="info_block">'
                +'<div class="row" id="BalanceSection">'
                  +'<div class="col-12 bordered-col col-sm-4">'
                    +'<h3 class="info_block__accent" id="AddressBalance">'+x1+' DNA</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="" data-original-title="Available balance">Balance</div>'
                    +'</div>'
                    +'<div class="col-12 bordered-col col-sm-4">'
                    +'<h3 class="info_block__accent" id="AddressStake">'+y1+' DNA</h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="" data-original-title="Frozen balance">Stake</div>'
                    +'</div>'
                  +'<div class="col-12 bordered-col col-sm-4">'
                    +'<h3 class="info_block__accent" id="AddressTxs">'+n1+'</h3>'
                    +'<div class="control-label">Transactions</div>'
                  +'</div>'
                +'</div>'
              +'</div>'
            +'</div>'
          +'</div>'
          +'<div class="col-3 col-sm-3">'
            +'<h3>Total address value</h3>'
            +'<div class="card">'
                +'<div class="info_block">'
                    +'<div class="row">'
                        +'<div class="col-12 col-sm-12 bordered-col">'
                        +'<h3 class="info_block__accent" id="AddressBalance">$ '+z1+'</h3>'
                        +'<div class="control-label" data-toggle="tooltip" title="Total DNA Address in USD" data-original-title="Total DNA Address in USD">DNA address value (USD)</div>'
                        +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
          +'</div>'
        +'</div>';

modechange.innerHTML = details;

}



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
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


function rounder(num)
{
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function precise2(x) {
  return Math.round(x * 100) / 100;
}

function precise3(x) {
  return Math.round(x * 1000) / 1000;
}

function round3(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:3});
}

function round2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
}



function exchange_id()
{
if(getUrlVars()["address"]=='0x83B8A2F9Bd1bE7f1fB496ec91eB0C6983cD38725'){
 address.innerHTML = '<span id="Address">'
                        +getUrlVars()["address"]
                        +'</span>'
                        +'<span class="badge badge-secondary">Qtrade.io exchange</span>';
} else if(getUrlVars()["address"]=='0x1f96445BE4D941934277CCe0C02D9EA8c9cc02f5'){
 address.innerHTML = '<span id="Address">'
                        +getUrlVars()["address"]
                        +'</span>'
                        +'<span class="badge badge-secondary">qbtc exchange</span>';
} else if(getUrlVars()["address"]=='0xcbb98843270812eeCE07BFb82d26b4881a33aA91'){
address.innerHTML = '<span id="Address">'
                        +getUrlVars()["address"]
                        +'</span>'
                        +'<span class="badge badge-secondary">Foundation wallet</span>';
} else if(getUrlVars()["address"]=='0x0000000000000000000000000000000000000000'){
address.innerHTML = '<span id="Address">'
                        +getUrlVars()["address"]
                        +'</span>'
                        +'<span class="badge badge-secondary">Zero wallet</span>';
} else {
    address.innerHTML = '<span id="Address">'
                        +getUrlVars()["address"]
                        +'</span>';
}
}


window.onload = (function(){

  ajax_get('https://api.idena.io/api/Address/'+getUrlVars()["address"], function(data) {
    //console.log(data);
    exchange_id();
    balance = precise2(data['result']['balance']);
    stake = precise3(data['result']['stake']);
    txCount = precise2(data['result']['txCount']);

    ajax_get('https://api.coingecko.com/api/v3/coins/idena?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false', function(data2) {
    

    curprice = rounder(data2['market_data']['current_price']['usd']);
    //console.log(curprice+balance+stake);
    
    total = precise2(curprice*(rounder(balance)+rounder(stake)));

    details_switch(round3(balance),round3(stake),round3(total),round3(txCount));
    
    
    //balance = precise3(balance);
    //stake = precise3(stake);

    });

  });


})();



