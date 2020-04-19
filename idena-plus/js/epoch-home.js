var parent2 = document.querySelector(".col-sm-6:first-child");
var lastepoch = parent2.querySelector(".section__group:first-child");

var parent3 = document.querySelector(".col-sm-6:last-child");
var firstepoch = parent3.querySelector(".section__group:first-child");


var current = '';
var genesis = 60;
var previous = '';

var growth_last = '';
var growth_first = '';
var first = 8;
var epoch = getUrlVars()["epoch"];
var prevEpoch = epoch - 1;
var prevEpoch1 = epoch - 2;


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


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
     return '<span class="red" style="margin-left: 7px;">'+x+' %</span>';
  } else {
    return '<span class="green" style="margin-left: 7px;">+'+x+' %</span>';
  }
}



window.onload = (function(){
  
  ajax_get('https://api.idena.org/api/Epoch/'+prevEpoch+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {
    
    current = data["result"];

    ajax_get('https://api.idena.org/api/Epoch/'+prevEpoch1+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {  
    
    previous = data["result"];

    growth_last = color(precise2((current-previous)/previous*100));
    growth_first = color(precise2((current-genesis)/genesis*100));
    
    lastepoch.innerHTML += '<hr><div class="control-label">Growth since last epoch: </div><div class="text_block"> '+growth_last+'</div>';
    firstepoch.innerHTML += '<hr><div class="control-label">Growth since first epoch('+first+'): </div><div class="text_block"> '+growth_first+'</div>';
    
    });

  });


})();



