//Global variables
var categorySelect = "Food"

$(document).ready(function () {
    //populate date
    var today = new Date()
    $(".form-date").val(today.getFullYear() + "-" + ('0' + (today.getMonth()+1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2))
    
    //make all category grey
    categoryReset();

    $(".category-food").css("filter","grayscale(0)");
    $(".category-food").css("-webkit-filter","grayscale(0)");
    
    //retrieveData();
});

var categoryReset = function() {
    $(".category").css("filter","grayscale(1)");
    $(".category").css("-webkit-filter","grayscale(1)");
}

var script_url = "https://script.google.com/macros/s/AKfycbxKPtUxtPG5FGt5z_8Lg6AHzPie_g53724OVGuU6ruNl_suGIw/exec";

// Make an AJAX call to Google Script
var addTransaction = function () {
    var date = $(".form-date").val()
    var cost = $(".form-cost").val()
    var item = $(".form-item").val()
    
    var url = script_url + "?date=" + date + "&cost=" + cost + "&cat=" + window.categorySelect + "&item=" + item + "&action=insert";
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}

var clearTransaction = function() {
    categorySelect = "Food"
    var today = new Date()
    $(".form-date").val(today.getFullYear() + "-" + ('0' + (today.getMonth()+1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2))
    $(".form-cost").val("")
    $(".form-item").val("")
}

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

$( ".row .navi-right" ).click(function() {
    console.log("clicked")
    addTransaction();
    clearTransaction();
});

