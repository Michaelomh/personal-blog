//Global variables
currentCategory = "Food"

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
    let today = new Date();
    let day = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
    let month = (today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1);

    //populate time
    let hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
    let minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

    $(".form-date").val(day + "/" + month);
    $(".form-time").val(hour + ":" + minute);
});

//Calculator Function
$(".row-calculator > .col-4").click(function () {
    currentAmt = $("#transaction-amt").text()
    char = this.id[this.id.length - 1];

    if (char === 'l') {
        //delete
        $("#transaction-amt").text(currentAmt.substr(0, currentAmt.length - 1));
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
        addTransaction();
    } else {
        //number
        //if there are more than 2 decimal point, ignore.
        //if the first digit is 0, without a dot, remove the 0
        if (currentAmt.substr(currentAmt.indexOf("."), currentAmt.length - 1).length > 2) {
            console.log("too much decimals");
        } else if (currentAmt.substr(0, 1) === "0" && !currentAmt.includes(".")) {
            $("#transaction-amt").text(currentAmt.substr(1, currentAmt.length) + char);
        } else {
            $("#transaction-amt").text(currentAmt + char);
        }
    }

    //change setings accoridngly
    //get new transactionAmount
    //change settings accordingly.
    newCurrentAmt = $("#transaction-amt").text()
    console.log(newCurrentAmt);
    if (newCurrentAmt.length > 9) {
        //cut down, error
        console.log("Error hit");
        $("#transaction-amt").text(newCurrentAmt.substr(0, newCurrentAmt.length - 1));
    } else if (newCurrentAmt.length > 6) {
        //make it smaller
        $("#transaction-amt").css("font-size", "3em");
        $("#transaction-amt").css("line-height", "4.5em");
    } else {
        //make it bigger
        $("#transaction-amt").css("font-size", "4em");
        $("#transaction-amt").css("line-height", "3em");
    }

})

//Category Active
$(".row-category > .col-4 > button").click(function () {
    $(".row-category > .col-4 > button").removeClass("btn-active");
    currentCategory = $(this).text()
    $(this).addClass("btn-active");
    console.log(currentCategory);
});

//Add Transaction Function
function addTransaction() {
    //get the number
    let currentAmt = $("#transaction-amt").text()

    //get the date + time
    let day = $(".form-date").val().substr(0, $(".form-date").val().indexOf("/"))
    let month = $(".form-date").val().substr($(".form-date").val().indexOf("/") + 1, 2) - 1;
    let hour = $(".form-time").val().substr(0, $(".form-time").val().indexOf(":"));
    let min = $(".form-time").val().substr($(".form-time").val().indexOf(":") + 1, 2)
    let year = new Date().getFullYear();

    console.log(year, month, day, hour, min)
    var currentTimeStamp = new Date(year, month, day, hour, min, 0, 0);
    console.log(currentTimeStamp);

    //get the note
    let currentNote = $(".form-notes").val();
    //do some conditionals.

    //add to firebase
    let message = currentAmt + currentTimeStamp + currentNote + currentCategory;

    toastr["success"](message, "Added Transaction:")
}
