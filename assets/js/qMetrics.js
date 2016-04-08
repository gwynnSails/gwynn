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


function modelChart() {

  var chartData = modpop[month][topModels];

  var chartSJSON = "";

  for (var loop = 1; loop < 10; loop++) {
    var temp = JSON.stringify(chartData[loop.toString()]);
    for (var innerLoop = 1; innerLoop < 31; innerLoop++) {
      replaceString = "\",\"" + innerLoop.toString() + "\":\"";
      temp = temp.replace("-", replaceString);
    }
    if (loop != 9) {
      temp += "]},";
    } else {
      temp += "]}";
    }

    chartSJSON += temp;
  }

  var chartStringJSON = "[" + chartSJSON + "]";
  for (var t = 1; t < 30; t++) {
    chartStringJSON = chartStringJSON.replace("monthLapse\"", "values\": [{\"0\"")
  }

  var chartJSON = JSON.parse(chartStringJSON);
  var betterChartJSON = JSON.parse

  var finalData = [];

  var j=0;
  chartJSON.forEach(function (d) {
    j++;

    var xx = d["values"];
    var xlist = {};



    for (var kk=0; kk<30; kk++) {
      xlist = xlist + parseFloat(xx[0][kk.toString()]);
    }

    var thisOne = {};

    thisOne.name = d["name"];
    thisOne.users = d["users"];
    thisOne.modelRuns = d["modelRuns"];
    thisOne.values = xlist;

    thisOne.maxValue = d3.max(thisOne.values);
    thisOne.minValue = d3.min(thisOne.values);
    thisOne.range = thisOne.maxValue - thisOne.minValue;

    thisOne.index = j;
    finalData.push(thisOne);
  });

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
    .data(finalData)
    .enter()
    .append("tr");

  var theFirstColumn = rows.append("td");
  var theSecondColumn = rows.append("td");
  var theThirdColumn = rows.append("td");
  var theGraphColumn = rows
    .append("td")
    .attr("colspan",12)
    .append("div")
    .style("height","100%")
    .style("width","100%");


  theFirstColumn
    .attr("abbr",1)
    .attr("dataSort",function(d) {return d.name})
    .append("span")
    .attr("class","name")
    .text(function(d) {return ' ' + d.name});

  theSecondColumn
    .attr("abbr",1)
    .attr("dataSort",function(d) {return d.users})
    .append("span")
    .attr("class","users")
    .text(function(d) {return ' ' + d.users});

  theThirdColumn
    .attr("abbr",1)
    .attr("dataSort",function(d) {return d.modelRuns})
    .append("span")
    .attr("class","modelRuns")
    .text(function(d) {return ' ' + d.modelRuns})

  var theWidth = (theGraphColumn.style("width"));
  var theHeight = 40;
  theWidth = parseInt(theWidth.substring(0,theWidth.length-2));

  var svgLine = theGraphColumn
    .append("svg")
    .attr("width",theWidth)
    .attr("height",theHeight)
    .attr("class","svgCell");

  var scaleY = function(fraction) {
    return (8-theHeight)*fraction + (theHeight-4);
  };

  var xScale = d3.scale.linear()
    .domain([0,11])
    .range([0,200]);

  var lineFunction = d3.svg.line()
    .x(function(d,i) { return i*(12/theWidth); })
    .y(function(d) { return d; })
    .interpolate("monotone");

  svgLine.append("path")
    .attr("d", function(d) {
      return (d3.svg.line()
        .x(function(dValue,i) {
          //console.log(i);
          return theWidth/24 + i*(theWidth/12); })
        .y(function(dValue) {
          if (d.range===0) {
            return scaleY(0.5);
          }
          else {
            return scaleY( ( (dValue - d.minValue) / (d.range)));
          }

        })
        .interpolate("linear"))(d.values);

    })
    .attr("stroke","blue")
    .attr("fill","none")
    .attr("stroke-width",1);

  for (i=0;i<30;i++) {
    svgLine.append("line")
      .attr("class","dayLine day_m_" + i)
      .attr("x1",theWidth/24 + i*(theWidth/12))
      .attr("x2",theWidth/24 + i*(theWidth/12))
      .attr("y1",0)
      .attr("y2",theHeight)
      .attr("dayIndex","m_" + i)
      .on("mouseover", function() {
        var ii = d3.select(this).attr("dayIndex");
        var dayLines = d3.selectAll('.day_' + ii);
        dayLines.classed('selected',true);
      })
      .on("mouseout", function() {
        var ii = d3.select(this).attr("dayIndex") + "";
        var dayLines = d3.selectAll('.day_' + ii);
        dayLines.classed('selected',false);
      });
  }

  $("ticker-table").stickyTableHeaders();

}

var aAsc = [];
function sortTable(e) {
  var nr = $(e.currentTarget).index();
  console.log(nr);
  aAsc[nr] = aAsc[nr]=='asc'?'desc':'asc';
  $(tableSelector + '>tbody>tr').tsort('td:eq('+nr+')[abbr]',{order:aAsc[nr],attr:"dataSort" });
}


