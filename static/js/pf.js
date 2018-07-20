//Global variables
var categorySelect = "Food-Drinks"; //Default always start at "Food"
var script_url = "https://script.google.com/macros/s/AKfycbxKPtUxtPG5FGt5z_8Lg6AHzPie_g53724OVGuU6ruNl_suGIw/exec";
var currentView = "Add"; //4 states - Add, Template, Archive, Edit

//Toaster options
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000"
}

$(document).ready(function () {
    //populate date
    var today = new Date()
    $(".form-date").val(today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2))

    //make all category grey except for food-drink category.
    categoryReset();

    //retrieveData();
});

//ADD TRANSACTIONS FUNCTION ======================================
// Contains all functions that belongs in Add transactions 
//================================================================
var categoryReset = function () {
    $(".category").css("filter", "grayscale(1)");
    $(".category").css("-webkit-filter", "grayscale(1)");
    $(".category-food").css("filter", "grayscale(0)");
    $(".category-food").css("-webkit-filter", "grayscale(0)");
}

// Make an AJAX call to Google Script
var addTransaction = function (date, cost, item) {
    var url = script_url + "?date=" + date + "&cost=" + cost + "&cat=" + window.categorySelect + "&item=" + item + "&action=insert";
    var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp"
        })
        .done(function () {
            var message = (item + " (" + window.categorySelect + "), for $" + cost + " on " + date);
            toastr["success"](message, "Added Transaction:")
            clearTransaction();
        })
        .fail(function () {
            toastr["error"]("Please try again.", "Server Failure:")
        });
}

var clearTransaction = function () {
    categorySelect = "Food-Drinks"
    var today = new Date()
    $(".form-date").val(today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2))
    $(".form-cost").val("")
    $(".form-item").val("")
    categoryReset();
}

$(".category").click(function () {
    categoryReset();
    $(this).css("filter", "grayscale(0)");
    $(this).css("-webkit-filter", "grayscale(0)");
    //console.log(this.id)
    categorySelect = this.id;

    if (categorySelect == "Income") {
        $("#costValue .form-control").css("color", "#7DB545");
        $("#costIndicator").css("color", "#7DB545");
        $("#cost-minus").css("display", "none");
        $("#cost-plus").css("display", "initial");
    } else {
        $("#costValue .form-control").css("color", "#D64545");
        $("#costIndicator").css("color", "#D64545");
        $("#cost-minus").css("display", "initial");
        $("#cost-plus").css("display", "none");
    }
});

//Back Date function
$(".date-back").click(function () {
    var currentd = $("#date").val();

});

//Forward Date function
$(".date-forward").click(function () {

});

//Add transaction Button Function
$(".row .navi-right").click(function () {
    var date = $(".form-date").val();
    var cost = $(".form-cost").val();
    var item = $(".form-item").val();
    addTransaction(date, cost, item);
    $('.navi-block').css('display', 'block');
    setTimeout(function () {
        $('.row .navi-right').addClass('show');
        $('.navi-block').css('display', 'none');
    }, 5000);
});

//ARCHIVE FUNCTION ==============================================
// Contains all functions that belongs looking at past transactions
//================================================================
//retrieve all data from google sheets.
var retrieveData = function () {
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1a651AAdIyFp630rKwQuwa2n-M5gGg3_rzoBRi40H7R0&sheet=Sheet1',
        success: function (responseText) {
            var data = responseText.Sheet1;
            console.log(data);
        }
    });
}

//MISC FUNCTION ==================================================
// Contains all functions that belongs in every part of the app 
//================================================================
var resetBars = function () {
    $(".row").hide("slide", {
        direction: "left"
    }, 1000);
};

//Add transactions > Template.
$(".navi-left").click(function () {
    if (currentView == "Add") {
        //Add Transactions > Template
        currentView = "Template";
        $(".row-container-add").hide("slide", {
            direction: "left"
        }, 1000);

        $(".row-container-template").show("slide", {
            direction: "right"
        }, 1000);
    } else if (currentView == "Template") {
        //Template > Add Transactions
        currentView = "Add";
        $(".row-container-template").hide("slide", {
            direction: "left"
        }, 1000);

        $(".row-container-add").show("slide", {
            direction: "right"
        }, 1000);
    }
});


//TEMPLATES ======================================================
//categories=    Food-Drinks   Shopping    Transport   Entertainment   Housing     Others      Income
//================================================================
//main template method
var addTemplate = function (cost, item, category) {
    var today = new Date()
    var date = (today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2))

    var url = script_url + "?date=" + date + "&cost=" + cost + "&cat=" + category + "&item=" + item + "&action=insert";
    var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp"
        })
        .done(function () {
            var message = (item + " (" + category + "), for $" + cost + " on " + date);
            toastr["success"](message, "Added Transaction:")
        })
        .fail(function () {
            toastr["error"]("Please try again.", "Server Failure:")
        });
}



//template-1 - Toast Box Coffee
$(".row-template").click(function () {
    //check id.
    templateID = this.id;
    console.log(templateID);
    //From template use switch statement and add Template

    switch (templateID) {
        case 'template-1':
            addTemplate(1.1, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-2':
            //addTemplate(1.2, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-3':
            //addTemplate(1.3, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-4':
            //addTemplate(1.4, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-5':
            //addTemplate(1.5, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-6':
            //addTemplate(1.6, "Toast Box Coffee", "Food-Drinks")
            break;
        case 'template-7':
            //addTemplate(1.7, "Toast Box Coffee", "Food-Drinks")
            break;
    }
});
