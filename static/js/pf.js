//Global variables
let userField = ''
let typeField = ''
let today = new Date();

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
  "timeOut": "2000",
  "extendedTimeOut": "1000"
}

/*Validations*/
$("#dateField").blur(function () {
  //if format is wrong, complain and ask them to complete
  //acceptable 01-31 / 01-12
  console.log($('#dateField').val())
  let currentDate = $('#dateField').val()
  //once separate, check if it falls between acceptable ranges
  //check month with day
  //once complete, add 0 if needed.
  if (/[/]/.test(currentDate)) {
    let day = currentDate.substr(0, currentDate.search('/'))
    let month = currentDate.substr(currentDate.search('/') + 1, currentDate.length)
    day = (parseInt(day) < 10 ? '0' + day : day);
    month = (parseInt(month) < 10 ? '0' + month : month);
    console.log("day = " + day + " , " + "month = " + month)
  } else {
    toastr["error"]("slash (/) is required to separate DD/MM", "Failure:")
  }

});

$("#typeField > button.btn").click(function () {
  typeField = this.innerHTML
});

$("#userField > button.btn").click(function () {
  userField = this.innerHTML
});

$("#amtField").keyup(function () {
  let currentAmt = $('#amtField').val()
  if (currentAmt.match(/[.]/g)) {
    if (currentAmt.match(/[.].*/)[0].length > 3) {
      $('#amtField').val(currentAmt.substr(0, currentAmt.length - 1))
      toastr["error"]("Cannot add a number that has more than 2 decimal place ", "Failure:")
    }
  }
});

$("#descField").keyup(function () {
  let currentDesc = $('#descField').val()
  if (currentDesc.length > 50) {
    $('#descField').val(currentDesc.substr(0, currentDesc.length - 1))
    toastr["error"]("Please keep the description below 50 characters.", "Failure:")
  }
});

/*Ready*/
$(document).ready(function () {
  //populate date
  let day = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
  let month = (today.getMonth() + 1 < 10 ? '0' + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1));

  //populate time
  /*  let hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
    let minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());*/
//  $(".form-time").val(hour + ":" + minute);

  $(".form-date").val(day + "/" + month);

  retrievePastTransactions()
});

//retrieve data
function retrievePastTransactions() {
  const sheetId = '1ATRPbe_RUS0rjJ2d1glCuVRsm6reql0zZIKbwvqBvEA'
  var url = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/od6/public/values?alt=json";

  $.getJSON(url, function (data) {
    var entries = data.feed.entry;
    entries.slice().reverse().forEach(function (entry) {
      let rowStyle = entry.gsx$user.$t === 'Michael' ? 'table-warning' : 'table-primary'
      if (entry.gsx$amount.$t.length > 0) {
        $('.table-transactions').append(
          "<tr class='" + rowStyle + "'><td>" + entry.gsx$date.$t.substr(0, 6) +
          "</td><td class='table-align-left'>" + entry.gsx$amount.$t +
          "</td><td class='table-align-center'>" + (entry.gsx$type.$t === 'Income' ? 'I' : 'E') +
          "</td><td class='table-align-left'>" + entry.gsx$comments.$t +
          "</td></tr>");
      }
    });
  });
}

function submitTransaction() {
  event.preventDefault();
  sendTransaction();
}

function sendTransaction() {
  let hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
  let minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
  
  var dateField = $("#dateField").val() + "/" + today.getFullYear()
  var timeField = hour + ":" + minute + ":00";
  var amtField = $("#amtField").val();
  var descField = $("#descField").val();
  let message = dateField + ' ' + timeField + ' ' + amtField + ' ' + typeField + ' ' + userField + ' ' + descField

  if (validateSubmit(dateField, timeField, amtField)) {
    $.ajax({
      url: "https://docs.google.com/forms/d/e/1FAIpQLScJ-BLUsMlbVcb7Z_aIeak2UpL7R5b-Udj6ECDJ_reexYDFjQ/formResponse?",
      data: {
        "entry.1202591697": dateField,
        "entry.988237308": timeField,
        "entry.1387302766": amtField,
        "entry.1764327740": typeField,
        "entry.1199091773": userField,
        "entry.961656414": descField
      },
      type: "POST",
      dataType: "xml",
      error: function (x, y, z) {
        toastr["success"](message, "Added Transaction:")
      }
    });
  }
}

function validateDayMonth(day, month) {
  console.log("day = " + day + " , " + "month = " + month)
  if (day.length != 2) {
    return false
  } else if (month.length != 2) {
    return false
  } else if (month > 12 || month <= 0) {
    return false
  }
  return true
}

function validateSubmit(dateField, timeField, amtField) {
  console.log(typeField)
  if (typeField != null && typeField.length > 0) {
    if (userField != null && userField.length > 0) {
      if (dateField != null && timeField != null && amtField != null && dateField.length > 0 && timeField.length > 0 && amtField.length > 0) {
        return true
      } else {
        console.log('datefield = ' + dateField)
        console.log('timeField = ' + timeField)
        console.log('amtField = ' + amtField)
        toastr["error"]("Please do not leave date, time or amount empty", "Failure to add Transaction:")
      }
    } else {
      toastr["error"]("Choose the person that made that transaction", "Failure to add Transaction:")
    }
  } else {
    toastr["error"]("Choose either income or expense", "Failure to add Transaction:")
  }
}
