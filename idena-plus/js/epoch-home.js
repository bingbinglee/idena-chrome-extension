var parent2 = document.querySelector(".col-sm-6:first-child");
var lastepoch = parent2.querySelector(".section__group:first-child");

var parent3 = document.querySelector(".col-sm-6:last-child");
var firstepoch = parent3.querySelector(".section__group:first-child");
var details = '';

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
     return '<span class="red" style="margin-left: 7px;">'+precise2(x)+'% &#x2193;</span>';
  } else {
    return '<span class="green" style="margin-left: 7px;">+'+precise2(x)+'% &#x2191;</span>';
  }
}



window.onload = (function(){
  
  ajax_get('https://api.idena.org/api/Epoch/'+prevEpoch+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {
    
    current = data["result"];

    ajax_get('https://api.idena.org/api/Epoch/'+prevEpoch1+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {  
    
    previous = data["result"];

    growth_last = color((current-previous)/previous*100);
    growth_first = color((current-genesis)/genesis*100);
    
    lastepoch.innerHTML += '<hr><div class="control-label">Growth since last epoch: </div><div class="text_block"> '+growth_last+'</div>';
    firstepoch.innerHTML += '<hr><div class="control-label">Growth since first epoch('+first+'): </div><div class="text_block"> '+growth_first+'</div>';

    details = document.querySelector(".section_details");

    	ajax_get('https://api.idena.org/api/Epoch/'+(getUrlVars()["epoch"]-1)+'/IdentityStatesSummary', function(data2) {  
    		console.log(data2);

    		details.innerHTML = '<section class="section section_details">'+details.innerHTML
    		+'</section>'
    		+'<section class="section section_info">'
    		+'<div class="row">'
    		
	    		+'<div class="col-3 col-sm-3">'
	    			+'<h1>Humans</h1>'
	    				+'<div class="card">'
	    					+'<div class="info_block">'
	    						+'<div class="col-12 col-sm-12 bordered-col">'
	    							+'<div class="col-auto">'
	    								+'<h3 class="info_block__accent">'+precise2(data2["result"][0]["count"]/(data2["result"][0]["count"]+data2["result"][1]["count"]+data2["result"][2]["count"])*100)+'%</h3>'
	    								+'<div class="control-label">'+data2["result"][0]["count"]+' out of '+current+'</div>'
	    							+'</div>'
	    						+'</div>'
	    					+'</div>'
	    				+'</div>'
	    		+'</div>'

	    		+'<div class="col-3 col-sm-3">'
	    			+'<h1>Verified</h1>'
	    				+'<div class="card">'
	    					+'<div class="info_block">'
	    						+'<div class="col-12 col-sm-12 bordered-col">'
	    							+'<div class="col-auto">'
	    								+'<h3 class="info_block__accent">'+precise2(data2["result"][1]["count"]/(data2["result"][0]["count"]+data2["result"][1]["count"]+data2["result"][2]["count"])*100)+'%</h3>'
	    								+'<div class="control-label">'+data2["result"][1]["count"]+' out of '+current+'</div>'
	    							+'</div>'
	    						+'</div>'
	    					+'</div>'
	    				+'</div>'
	    		+'</div>'


	    		+'<div class="col-3 col-sm-3">'
	    			+'<h1>Newbie</h1>'
	    				+'<div class="card">'
	    					+'<div class="info_block">'
	    						+'<div class="col-12 col-sm-12 bordered-col">'
	    							+'<div class="col-auto">'
	    								+'<h3 class="info_block__accent">'+precise2(data2["result"][2]["count"]/(data2["result"][0]["count"]+data2["result"][1]["count"]+data2["result"][2]["count"])*100)+'%</h3>'
	    								+'<div class="control-label">'+data2["result"][2]["count"]+' out of '+current+'</div>'
	    							+'</div>'
	    						+'</div>'
	    					+'</div>'
	    				+'</div>'
	    		+'</div>'


	    		+'<div class="col-3 col-sm-3">'
	    			+'<h1>Identities Killed</h1>'
	    				+'<div class="card">'
	    					+'<div class="info_block">'
	    						+'<div class="col-12 col-sm-12 bordered-col">'
	    							+'<div class="col-auto">'
	    								+'<h3 class="info_block__accent" id="killed">--</h3>'
	    								+'<div class="control-label">Killed this epoch</div>'
	    							+'</div>'
	    						+'</div>'
	    					+'</div>'
	    				+'</div>'
	    		+'</div>'

    		
    		+'</div>'
        	+'</section>';

	        	ajax_get('https://api.idena.org/api/Epoch/'+prevEpoch+'/Identities/Count?states[]=Undefined', function(data3) {
	        		document.getElementById("killed").innerHTML = precise2(data3["result"]);
	        	});

    	});
    
    });

    

  });


})();



