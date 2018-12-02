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
    window.scrollTo(0, 1);
    
    //populate date
    var today = new Date();
    var day = (today.getDate()<10 ? '0'+today.getDate() : today.getDate());
    var month = (today.getMonth()+1<10 ? '0'+today.getMonth()+1 : today.getMonth()+1);
    
    //populate time
    var hour = (today.getHours()<10 ? '0'+today.getHours() : today.getHours());
    var minute = (today.getMinutes()<10 ? '0'+today.getMinutes() : today.getMinutes());
    console.log(day + "/" +  month + " --- " + hour + ":" + minute);
    
    $(".form-date").val(day + "/" +  month);
    $(".form-time").val(hour + ":" + minute);

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


/*Calculator Function*/
//when click on number 
//get the current value in the calculator.
//+ accordingly



$(".row-calculator > .col-4").click(function() {
    currentAmt = $("#transaction-amt").text()
    char = this.id[this.id.length -1];
    
    if (char === 'l') {
        //delete
        $("#transaction-amt").text(currentAmt.substr(0, currentAmt.length -1));
    } else if (char === 't') {
        //add a dot
        //if dot exist, ignore
        if (!currentAmt.includes(".")) {
            if (currentAmt.length === 0) {
                console.log("hit - " + "0" + currentAmt + ".")
                $("#transaction-amt").text("0" + currentAmt + ".");
            } else {
                $("#transaction-amt").text(currentAmt + ".");
            }
        }
    } else if (char === 'd') {
        //submit transaction
        console.log("submitted")
        alert("submitted!");
    } else {
        //number
        //if there are more than 2 decimal point, ignore.
        //if the first digit is 0, without a dot, remove the 0
        if (currentAmt.substr(currentAmt.indexOf("."),currentAmt.length-1).length > 2) {
            console.log("too much decimals");
        } else if (currentAmt.substr(0,1) === "0" && !currentAmt.includes(".")) {
           $("#transaction-amt").text(currentAmt.substr(1,currentAmt.length) + char);
       } else {
            $("#transaction-amt").text(currentAmt + char);
        }
    }
})


