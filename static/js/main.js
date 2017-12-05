$(document).ready(function(){
    //retrieve URL
    url = window.location.pathname.replace(/\//g,'')
    if (url.length > 0) {
        if (url == 'search') {
            $('.sidebar-nav li:nth-child(1) a').addClass('navi-active');
        } else if (url == 'about') {
            $('.sidebar-nav li:nth-child(2) a').addClass('navi-active');
        } else if (url == 'projects') {
            $('.sidebar-nav li:nth-child(3) a').addClass('navi-active');
        } else if (url == 'blog') {
            $('.sidebar-nav li:nth-child(4) a').addClass('navi-active');
        }
    }
});