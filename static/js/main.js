var aboutActive = "data"

$(document).ready(function () {
  //retrieve URL
  url = window.location.pathname.replace(/\//g, '')
  if (url.length > 0) {
    if (url == 'search') {
      $('.sidebar-nav li:nth-child(4) a').addClass('navi-active');
    } else if (url == 'about') {
      $('.sidebar-nav li:nth-child(1) a').addClass('navi-active');
    } else if (url == 'projects') {
      $('.sidebar-nav li:nth-child(2) a').addClass('navi-active');
    } else if (url == 'timeline') {
      $('.sidebar-nav li:nth-child(3) a').addClass('navi-active');
    }
  }


  //timeline -display
  $("#timeline-1").delay(100).fadeIn(1500);
  $("#timeline-2").delay(300).fadeIn(1500);
  $("#timeline-3").delay(500).fadeIn(1500);
  $("#timeline-4").delay(700).fadeIn(1500);
  $("#timeline-5").delay(900).fadeIn(1500);
});
