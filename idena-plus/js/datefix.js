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

var validTime = '';


window.onload = (function(){

  ajax_get('https://api.idena.io/api/epoch/last', function(data) {
      var d = new Date(data['result']['validationTime']);
      validTime = d.toDateString() + ' ' + d.toLocaleTimeString();

      document.getElementById("NextValidationDateTime").innerHTML = validTime;
    
    });

});  
