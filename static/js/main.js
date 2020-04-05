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

  var events = [
    {
      date: 'Q1 - 2018',
      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
        		},
    {
      date: 'Q2 - 2018',
      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
        		},
    {
      date: 'Q3 - 2018',
      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
        		},
    {
      date: 'Q4 - 2018',
      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
        		},
    {
      date: 'Q1 - 2019',
      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                }
        	];

  $('#my-timeline').roadmap(events, {
    eventsPerSlide: 50,
    slide: 1,
    orientation: 'vertical'
  });

});

