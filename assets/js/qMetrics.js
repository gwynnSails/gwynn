
function subtractDays(date, days) {
  var result = new Date(date);
  result.setDate(date.getDate() - days);
  return result;
}

$.getJSON("http://localhost:1337/Query/find?question=total&value=users", callbackGetUsers);
$.getJSON("http://localhost:1337/Query/find?question=total&value=models", callbackGetModels);
$.getJSON("http://localhost:1337/Query/find?question=total&value=modelRuns", callbackGetRuns);

function callbackGetUsers(data) {
  var milkUsers = JSON.stringify(data)
  document.querySelector('.monthlyUniqueUsers').innerHTML = milkUsers;
}

function callbackGetModels(data) {
  var milkModels = JSON.stringify(data);
  document.querySelector('.monthlyUniqueModels').innerHTML = milkModels;
}

function callbackGetModels(data) {
  var milkRuns = JSON.stringify(data);
  document.querySelector('.monthlyModelRuns').innerHTML = milkRuns;
}

var jqxhr = $.getJSON("http://localhost:1337/Query/find?question=total",
  function(count) {
    $.each(count, function(i, item) {
      alert(item.count)
    });
  });
  .success(function() {alert("sucess"); })
  .error(function() {alert("error"); })
  .complete(function() {alert("complete"); });
