var parent2 = document.querySelector(".justify-content-between");
var modechange = parent2.querySelector(".col-auto:last-child");


var parent4 = document.querySelector(".main .container:last-child");
var topheader = parent4.querySelector(".section:first-child .row .col");
var addressh1 = topheader.querySelector(".section_main__title");

var status = '';


var str = window.location.href.split( "/identity/" );
var address_str = str[1].split("#");


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

  ajax_get('https://api.idena.io/api/Identity/'+address_str[0], function(data) {
    //console.log(data);
    status = data['result']['state'];

    if(status!='Human') {
      document.getElementsByClassName('verified_sign')[0].classList.add('hide');
    }

    addressh1.setAttribute("id", "IdentityAddress");
    topheader.innerHTML += '<a href="javascript:void(0);" style="margin-left: 10px;" onclick="var range \= document.createRange();'
                    +'range.selectNode(document.getElementById(\'IdentityAddress\'));'
                    +'window.getSelection().removeAllRanges();' // clear current selection
                    +'window.getSelection().addRange(range);' // to select text
                    +'document.execCommand(\'copy\');'
                    +'document.getElementById(\'copycat\').innerHTML \= \'Copied!\';'
                    +'window.getSelection().removeAllRanges();" class="btn btn-secondary btn-small">'
          +'<span id="copycat">Copy Address</span>'
        +'</a>';

  });


})();



