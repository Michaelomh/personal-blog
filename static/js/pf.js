//Global variables
let userField = ''
let typeField = 'EXPENSE'
let today = new Date();
let monthsInText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//Toaster options
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-full-width",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000"
}

/*Validations*/
$("#dateField").blur(function () {
  let thereAreDateErrors = false
  //if format is wrong, complain and ask them to complete
  //acceptable 01-31 / 01-12
  let currentDate = $('#dateField').val()
  //once separate, check if it falls between acceptable ranges
  //check month with day
  //once complete, add 0 if needed.
  if (/[/]/.test(currentDate)) {
    let day = currentDate.substr(0, currentDate.search('/'))
    let month = currentDate.substr(currentDate.search('/') + 1, currentDate.length)
    day = (parseInt(day) < 10 ? '0' + day : day);
    month = (parseInt(month) < 10 ? '0' + month : month);
  } else {
    thereAreDateErrors = true;
    toastr["error"]("slash (/) is required to separate DD/MM", "Failure:")
  }

  if (!validateDayMonth(currentDate.split('/')[0], currentDate.split('/')[1], today.getFullYear())) {
    thereAreDateErrors = true;
    toastr["error"]("Day & Month combination is wrong, please try again.", "Failure:")
  }

  if (thereAreDateErrors) {
    $('#dateField').focus();
  } else {
    $('#dateField').val(formatDate(currentDate))
  }

});

/*Validations*/
$("#dateField").click(function () {
  if (!/[/]/.test($('#dateField').val())) {
    $('#dateField').val(unformatDate($('#dateField').val()))
  }
});

$("#typeField > button.btn").click(function () {
  typeField = this.innerHTML
  if (typeField == "INCOME") {
    typeField = 'Income'
    $("#btn-expenses").css("-webkit-filter", "grayscale(100%)")
    $("#btn-expenses").css("filter", "grayscale(100%)")
    $("#btn-income").css("-webkit-filter", "grayscale(0%)")
    $("#btn-income").css("filter", "grayscale(0%)")
  } else {
    typeField = 'Expense'
    $("#btn-income").css("-webkit-filter", "grayscale(100%)")
    $("#btn-income").css("filter", "grayscale(100%)")
    $("#btn-expenses").css("-webkit-filter", "grayscale(0%)")
    $("#btn-expenses").css("filter", "grayscale(0%)")
  }
});

$("#userField > button.btn").click(function () {
  userField = this.innerHTML
  if (userField.match("Michael")) {
    userField = "Michael";
    $("#btn-sherry").css("-webkit-filter", "grayscale(100%)")
    $("#btn-sherry").css("filter", "grayscale(100%)")
    $("#btn-michael").css("-webkit-filter", "grayscale(0%)")
    $("#btn-michael").css("filter", "grayscale(0%)")
  } else {
    userField = "Sherry";
    $("#btn-michael").css("-webkit-filter", "grayscale(100%)")
    $("#btn-michael").css("filter", "grayscale(100%)")
    $("#btn-sherry").css("-webkit-filter", "grayscale(0%)")
    $("#btn-sherry").css("filter", "grayscale(0%)")
  }
});

$("#amtField").keyup(function () {
  let currentAmt = $('#amtField').val()
  let newInput = currentAmt.substr(currentAmt.length - 1, currentAmt.length)
  //check number
  if (!newInput.match(/[0-9.]/g)) {
    $('#amtField').val(currentAmt.substr(0, currentAmt.length - 1))
    toastr["error"]("Please input a number(0-9)", "Failure:")
  }

  //check decimal
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

/*Misc Function*/
//Google Sheets
$("#btn-sheets").click(function () {
  console.log("opening Google sheets...")
  location.href = "https://docs.google.com/spreadsheets/d/1ATRPbe_RUS0rjJ2d1glCuVRsm6reql0zZIKbwvqBvEA/edit#gid=0";
})

//Sync
$("#btn-sync").click(function () {
  console.log("Syncing now...")
  $('.table-transactions').html('');
  retrievePastTransactions();
})

/*Ready*/
$(document).ready(function () {
  //populate date
  let day = (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
  let month = (today.getMonth() + 1 < 10 ? '0' + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1));

  $(".form-date").val(formatDate(day + "/" + month));

  retrievePastTransactions()
});

//retrieve data
function retrievePastTransactions() {
  const sheetId = '1ATRPbe_RUS0rjJ2d1glCuVRsm6reql0zZIKbwvqBvEA'
  var url = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/od6/public/values?alt=json";

  $.getJSON(url, function (data) {

    var entries = data.feed.entry;
    let maxRows = 5
    let currentRows = 0
    entries.slice().reverse().forEach(function (entry) {
      let tableTypeStyle = (entry.gsx$type.$t.trim() === 'Income' ? 'ta-income' : 'ta-expense')
      if (entry.gsx$amount.$t.length > 0 && currentRows < maxRows) {
        $('.table-transactions').append(
          "<table class='table table-xs'><tr>" +
          "<td class='ta-comments'>" +
          entry.gsx$comments.$t +
          "</td><td class='tar " + tableTypeStyle + "'>" +
          (entry.gsx$type.$t.trim() === 'Income' ? '+' : '-') + entry.gsx$amount.$t +
          "</td></tr><tr>" +
          "<td class='ta-date'>" +
          formatDate(entry.gsx$date.$t.trim()) +
          "</td><td class='tar'>" +
          entry.gsx$user.$t +
          "</td></tr></table>");
        currentRows++;
      }
    });
  });
}

$("#sendTransaction").click(function () {
  sendTransaction();
})


function sendTransaction() {
  let hour = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours());
  let minute = (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

  var dateField = unformatDate($("#dateField").val()) + "/" + today.getFullYear()
  
  var timeField = hour + ":" + minute + ":00";
  var amtField = $("#amtField").val();
  var descField = $("#descField").val();
  typeField = typeField.toLowerCase().charAt(0).toUpperCase() + typeField.toLowerCase().substring(1);

  
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

//format Date (12/05 -> 12th may 2019)
function formatDate(dateToFormat) {
  let splitDateValue = dateToFormat.split('/');
  let toReturn = ''

  if (splitDateValue[0] == '01') {
    toReturn = splitDateValue[0] + 'st '
  } else if (splitDateValue[0] == '02') {
    toReturn = splitDateValue[0] + 'nd '
  } else if (splitDateValue[0] == '03') {
    toReturn = splitDateValue[0] + 'rd '
  } else {
    toReturn = splitDateValue[0] + 'th '
  }

  if (toReturn.charAt(0) == '0') {
    toReturn = toReturn.substr(1, toReturn.length)
  }

  toReturn = toReturn + monthsInText[parseInt(splitDateValue[1] - 1)] + ' '

  if (splitDateValue[2] != null) {
    toReturn = toReturn + splitDateValue[2]
  } else {
    toReturn = toReturn + today.getFullYear();
  }
  return toReturn;
}

//format Date (12th may 2019 -> 12/05)
function unformatDate(dateToUnformat) {
  let splitDateValue = dateToUnformat.split(' ');
  let UnformattedDay = splitDateValue[0].replace(/[a-zA-Z]/g, "");
  let UnformattedMonth = monthsInText.indexOf(splitDateValue[1]) + 1

  let formattedDay = UnformattedDay < 10 ? '0' + UnformattedDay : UnformattedDay;
  let formattedMonth = (UnformattedMonth + 1 < 10 ? '0' + parseInt(UnformattedMonth) : parseInt(UnformattedMonth));

  return formattedDay + '/' + formattedMonth;
}

function validateDayMonth(day, month, year) {
  let dayInMonthYear = new Date(year, month, 0).getDate();
  if (day > dayInMonthYear || day <= 0) {
    return false;
  }
  if (month > 12 || month <= 0) {
    return false;
  }
  return true
}


function validateSubmit(dateField, timeField, amtField) {
  if (typeField != null && typeField.length > 0) {
    if (dateField != null && timeField != null && amtField != null && dateField.length > 0 && timeField.length > 0 && amtField.length > 0) {
      return true
    } else {
      toastr["error"]("Please do not leave date, time or amount empty", "Failure to add Transaction:")
    }
  } else {
    toastr["error"]("Choose either income or expense", "Failure to add Transaction:")
  }
}
