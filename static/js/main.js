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
            $('.sidebar-nav li:nth-child(3) a').addClass('navi-active');
        } else if (url == 'blog') {
            $('.sidebar-nav li:nth-child(2) a').addClass('navi-active');
        }
    }

});


//For About Page
$(".btn-data").click(function () {
    $(".btn-data").addClass("btn-active");
    $(".btn-dev").removeClass("btn-active");
    $(".btn-design").removeClass("btn-active");
    if (aboutActive == "design") {
        $(".skills-design").fadeOut(1000, function () {
            $(".skills-data").fadeIn(1000);
            aboutActive = "data"
            $(".skills-dev").css("display", "none");
            $(".skills-design").css("display", "none");
        });
    }

    if (aboutActive == "dev") {
        $(".skills-dev").fadeOut(1000, function () {
            $(".skills-data").fadeIn(1000);
            aboutActive = "data"
            $(".skills-dev").css("display", "none");
            $(".skills-design").css("display", "none");
        });
    }
});

$(".btn-dev").click(function () {
    $(".btn-data").removeClass("btn-active");
    $(".btn-dev").addClass("btn-active");
    $(".btn-design").removeClass("btn-active");
    if (aboutActive == "design") {
        $(".skills-design").fadeOut(1000, function () {
            $(".skills-dev").fadeIn(1000);
            aboutActive = "dev"
            $(".skills-data").css("display", "none");
            $(".skills-design").css("display", "none");
        });
    }

    if (aboutActive == "data") {
        $(".skills-data").fadeOut(1000, function () {
            $(".skills-dev").fadeIn(1000);
            aboutActive = "dev"
            $(".skills-data").css("display", "none");
            $(".skills-design").css("display", "none");
        });
    }
});

$(".btn-design").click(function () {
    $(".btn-data").removeClass("btn-active");
    $(".btn-dev").removeClass("btn-active");
    $(".btn-design").addClass("btn-active");
    if (aboutActive == "dev") {
        $(".skills-dev").fadeOut(1000, function () {
            $(".skills-design").fadeIn(1000);
            aboutActive = "design"
            $(".skills-dev").css("display", "none");
            $(".skills-data").css("display", "none");
        });
    }

    if (aboutActive == "data") {
        $(".skills-data").fadeOut(1000, function () {

            $(".skills-design").fadeIn(1000);
            aboutActive = "design"
            $(".skills-dev").css("display", "none");
            $(".skills-data").css("display", "none");
        });
    }
});
