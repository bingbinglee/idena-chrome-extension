var parent2 = document.querySelector(".main .container:last-child");
var topheader = parent2.querySelector(".section:first-child");
//console.log(modechange);

topheader.innerHTML += '<div class="button-group">'
        +'<a href="#" onclick="javascript:history.go(-1);" class="btn btn-secondary btn-small" id="EpochPageLink">'
         +'<i class="icon icon--back"></i>'
          +'<span>Back</span>'
        +'</a>'
        +'</div>';


window.onload = (function(){

})();



