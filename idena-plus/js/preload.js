
var imgURL = chrome.extension.getURL("idena-logo-dark.svg");
var mode = localStorage.getItem('mode') || '';


if (mode =='dark') {
  document.getElementsByTagName('html')[0].classList.add('darkmode');

} else {
  
} 

