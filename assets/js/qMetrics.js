
var month = "month";
var topModels = "topModels";

var monthly_uniqueUsers = JSON.stringify(modpop["month"]["uniqueUsers"]);
var monthly_uniqueModels = JSON.stringify(modpop["month"]["uniqueModels"]);
var monthly_totalModelRuns = JSON.stringify(modpop["month"]["totalModelRuns"]);
var monthly_totalRecords = JSON.stringify(modpop["month"]["totalRecords"]);
var monthly_totalOrgs = JSON.stringify(modpop["month"]["totalOrgs"]);

function qMetricsDashboard() {
  document.getElementById("unique_users").innerHTML = monthly_uniqueUsers;
  document.getElementById("unique_models").innerHTML = monthly_uniqueModels;
  document.getElementById("total_model_runs").innerHTML = monthly_totalModelRuns;

}

var x = "d3.keys(chartData[0])"
var y = ".text(function(d){return d});"
var z = "alert(JSON.stringify(chartData));"


function modelChart() {

  var chartData = modpop[month][topModels];

  var chartJSON = "";

  for (var loop = 1; loop < 10; loop++) {
    var temp = JSON.stringify(chartData[loop.toString()]);
    for (var innerLoop = 1; innerLoop < 31; innerLoop++) {
      replaceString = "\",\"" + innerLoop.toString() + "\":\"";
      temp = temp.replace("-", replaceString);
    }
    if (loop != 9) {
      temp += ",";
    }
    chartJSON += temp;
  }

  document.getElementById("total_model_runs").innerHTML = chartJSON;

  var columnTitles = [
    "Model Number",
    "Month Users",
    "Month Runs",
    "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ",
    "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ",
    "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "];


  // append the column headers and such
  var thead = d3.select("thead")
    .selectAll("th")
    .data(columnTitles)
    .enter()
    .append("th")
    .html(function(column) { return column + " "; })
    .attr("id",function(column,i) {return "header_" + i;})
    .attr("day",function(column, i) {return i-3;})
    .on("mouseover", function() {
      var day = d3.select(this).attr("day");
      if (day>=0) {
        var dayLines = d3.selectAll('.day_m_' + day);
        dayLines.classed('selector',true);
      }
    })
    .on("mouseout", function() {
      var day = d3.select(this).attr("day");
      if (day>=0) {
        var dayLines = d3.selectAll('.day_m_' + day)
        dayLines.classed('selected',false);
      }
    });

  // set up the rows

  var rows = d3.select("tbody")
    .selectAll("tr")
    .data(chartJSON)
    .enter()
    .append("tr");

  var theFirstColumn = rows.append("td");
  var theSecondColumn = rows.append("td");
  var theThirdColumn = rows.append("td");
  var theFourthColumn = rows.append("td")
    .attr("colspan",12)
    .append("div")
    .style("height","100%")
    .style("width","100%");



}


