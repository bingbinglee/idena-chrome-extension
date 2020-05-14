
var imgURL = chrome.extension.getURL("idena-logo-dark.svg");
var parent = document.querySelector(".header_logo");

var mode = localStorage.getItem('mode') || '';


document.getElementsByClassName('header')[0].classList.add('fixed-header');
document.getElementsByClassName('main')[0].classList.add('extra-main-padding');

var sticky = document.getElementsByClassName('header')[0].offsetTop;


	scrolltop = '<button type="button" class="btn btn-icon hide" id="scrollTop" onclick="window.scrollTo({ top: 0, behavior: \'smooth\' });">'
					+'<i class="icon icon--thin_arrow_up"></i></button>'
				+'<span id="themeTop" class="hide">'
				+'<button type="button" id="moon" class="rem btn btn-icon theme"'
							+' onclick="localStorage.setItem(\'mode\', \'dark\');'
	            +'document.querySelector(\'.header_logo a img\').setAttribute(\'src\',\''+imgURL+'\');'
	            +'document.getElementsByTagName(\'html\')[0].classList.add(\'darkmode\');'
	            +'document.getElementById(\'moon\').classList.add(\'rem\');'
	            +'document.getElementById(\'sun\').classList.remove(\'rem\');'
							+'" id="moon">'
							+'<img src="'+chrome.extension.getURL("images/moon.svg")+'" width="18px" height="18px"' 
							+'style="opacity: 0.8;"/></button>';

	themetop = '<button type="button" id="sun" class="rem btn btn-icon theme"'
							+' onclick="localStorage.setItem(\'mode\', \'light\'); document.getElementsByTagName(\'html\')[0].classList.remove(\'darkmode\');'
	            +'document.querySelector(\'.header_logo a img\').setAttribute(\'src\',\'https://scan.idena.io/static/images/idena-logo.svg\');'
	            +'document.getElementById(\'moon\').classList.remove(\'rem\');'
	            +'document.getElementById(\'sun\').classList.add(\'rem\');'
							+'" id="sun">'
							+'<img src="'+chrome.extension.getURL("images/sun.svg")+'" width="18px" height="18px"' 
							+'style="opacity: 0.8;"/></button>'
							+'</span>'; 

	document.getElementsByTagName('body')[0].innerHTML += themetop+scrolltop;

	if (mode =='dark') {
	  parent.querySelector("a img").src = imgURL;
	  document.getElementById('sun').classList.remove('rem');

	} else {
	  parent.querySelector("a img").src = 'https://scan.idena.io/static/images/idena-logo.svg';
	  document.getElementById('moon').classList.remove('rem');
	} 


window.onscroll = function() {
	shadowFunction()
};


function shadowFunction() {
  if (window.pageYOffset > sticky) {
    document.getElementsByClassName('header')[0].classList.add('header-shadow');
    document.getElementById('scrollTop').classList.remove('hide');
    document.getElementById('themeTop').classList.remove('hide');

  } else {
    document.getElementsByClassName('header')[0].classList.remove('header-shadow');
    document.getElementById('scrollTop').classList.add('hide');
    document.getElementById('themeTop').classList.add('hide');

  }
}