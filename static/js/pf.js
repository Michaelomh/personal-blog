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
    let today = new Date();
    let day = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
    let month = (today.getMonth() + 1 < 10 ? '0' + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1));

    //populate time
    let hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
    let minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

    $(".form-date").val(day + "/" + month);
    $(".form-time").val(hour + ":" + minute);
});

