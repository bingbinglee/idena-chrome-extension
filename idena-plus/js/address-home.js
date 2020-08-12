var parent2 = document.querySelector(".main .container:last-child");
var modechange = parent2.querySelector(".section_info");

var address = document.querySelector(".section_main__subtitle");

var str = window.location.href.split( "/address/" );
var address_str = str[1].split("#");

//console.log(modechange);

var balance = '';
var stake = '';
var total = '';
var curprice = '';
var txCount = '';


function copyFunction() {
  var copyText = address_str[0];
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}


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
if(address_str[0]=='0x83B8A2F9Bd1bE7f1fB496ec91eB0C6983cD38725'){
    
 address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Qtrade.io exchange</span>';

} else if(address_str[0]=='0x1f96445BE4D941934277CCe0C02D9EA8c9cc02f5'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Qbtc exchange</span>';

} else if(address_str[0]=='0x4E55380bD90b754615A779FC3C4cf949481875CB'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Hotbit exchange</span>';

} else if(address_str[0]=='0xcbb98843270812eeCE07BFb82d26b4881a33aA91'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Foundation wallet</span>';

} else if(address_str[0]=='0x0000000000000000000000000000000000000000'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Zero Wallet</span>';

} else if(address_str[0]=='0x0a8B4b113d863c86f64E49a1270F7a4A9B65dAAc'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">2020 Funding wallet</span>';

} else if(address_str[0]=='0x9bf19e7d58B2A95aaBD0cB8bd0Bc7da1c72E696b'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Investor wallet 1</span>';

} else if(address_str[0]=='0x5b8896aEd1d98604c00bAcF1643F752949Fe807D'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Investor wallet 2</span>';

} else if(address_str[0]=='0xc94D32638D71aBA05F0bDADE498948eF93944428'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Ambassador fund</span>';

} else if(address_str[0]=='0xCe12D460d2dd8786f409Ae7E5AE43dB8d9C6Dc29'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">Team funds distribution wallet</span>';

} else if(address_str[0]=='0x477E32166cd16C1b4909BE783347e705Aef3d5db'){
address.innerHTML = address_str[0]+'<span class="badge badge-secondary">2021-2022 Funding Wallet</span>';

} else {
    address.innerHTML = '<span id="Address">'+address_str[0]+'</span>';

}
var topheader = parent2.querySelector(".section:first-child");
topheader.innerHTML += '<div class="button-group">'
        +'<a href="javascript:void(0);" onclick="var range \= document.createRange();'
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


var qr = '<div class="qr"><img src="https://chart.apis.google.com/chart?cht=qr&amp;chs=150x150&amp;chl='+address_str[0]+'&amp;chld=H|0"></div>';

topheader.innerHTML += qr;
}


window.onload = (function(){

  ajax_get('https://api.idena.io/api/Address/'+address_str[0], function(data) {
    //console.log(data);
    
    balance = precise2(data['result']['balance']);
    stake = precise3(data['result']['stake']);
    txCount = precise2(data['result']['txCount']);

    ajax_get('https://api.coinpaprika.com/v1/tickers/dna-idena?quotes=USD', function(data2) {
    

    curprice = rounder(data2['quotes']['USD']['price']);
    //console.log(curprice+balance+stake);
    
    total = precise2(curprice*(rounder(balance)+rounder(stake)));

    details_switch(round3(balance),round3(stake),round3(total),round3(txCount));
    
    exchange_id();
    //balance = precise3(balance);
    //stake = precise3(stake);

    });

  });


})();



