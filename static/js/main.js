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

//  var events = [
//    {
//      title: 'Software Engineer Program',
//      date: 'Aug 2018 - Present',
//      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
//    },
//    {
//      date: 'Aug 2014 - May 2018',
//      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
//    },
//    {
//      title: 'Business Intelligence Analyst (Intern)',
//      date: 'Mar 2017 - Nov 2017',
//      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
//    },
//    {
//      title: 'Full Stack Developer (Intern)',
//      date: 'May 2016 - Aug 2016',
//      content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
//    }
//  ];
//
//  $('#my-timeline').roadmap(events, {
//    eventsPerSlide: 50,
//    slide: 1,
//    orientation: 'vertical',
//
//  });

});
