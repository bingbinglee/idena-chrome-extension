var parent2 = document.querySelector(".main .container:last-child");
var topheader = parent2.querySelector(".section:first-child");

var str = window.location.href.split( "/transaction/" );
var tx_str = str[1].split("#");

var trgt = '';

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



window.onload = (function(){

	ajax_get('https://api.idena.org/api/Transaction/'+tx_str[0], function(data) {

	trgt = data["result"]["from"];


	topheader.innerHTML += '<div class="button-group">'
        +'<a href="https://scan.idena.io/address?address='+trgt+'" class="btn btn-secondary btn-small" id="AddressPageLink">'
         +'<i class="icon icon--back"></i>'
          +'<span>Back</span>'
        +'</a>'
        +'</div>';
    });

})();