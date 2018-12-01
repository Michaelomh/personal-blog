//Global variables


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
    var today = new Date();
});

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

