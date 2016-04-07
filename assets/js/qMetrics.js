
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




function blaarg() {

  var amazonData = d3.json(modpop[0]["month"]["topModels"]);

  var theTable = d3.select("#theDataTable");
  var tHead = theTable.append("thead");
  var tBody = theTable.append("tbody");

  //add the header row
  var columnTitles = ["Search",
    "Avg Monthly Searches",
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  //note the use of ".html(..)" rather than ".text(...")
  //This allows using html stuff; if you used ".text"(...)" then
  //any html will be escaped
  tHead.append("tr")
    .selectAll("th")
    .data(columnTitles)
    .enter()
    .append("th")
    .html(function(column) { return column + " "; })
    .attr("id",function(column,i) {return "header_" + i;})
    .attr("month",function(column, i) {return i-2;})
    .on("mouseover", function() {
      var month = d3.select(this).attr("month");
      if (month>=0) {
        var monthLines = d3.selectAll('.month_m_' + month);
        monthLines.classed('selected',true);
      }
    })
    .on("mouseout", function() {
      var month = d3.select(this).attr("month");
      if (month>=0) {
        var monthLines = d3.selectAll('.month_m_' + month);
        monthLines.classed('selected',false);
      }
    });

  //set up the rows and the different columns that will be
  //    dealt with separately
  //"amazonData" is the array of custom json objects
  //    created from the input data file;
  // there is one such object for each search term "amazon foo"

  var rows = tBody.selectAll("tr")
    .data(amazonData)
    .enter()
    .append("tr");

  //Prepare to create the different columns.
  //Note that these will have access to the data
  // "amazonData" attached to the parent object "rows".
  //This is yet more D3.js magic!

  var theFirstColumn = rows.append("td");
  var theSecondColumn = rows.append("td");
  var theGraphColumn = rows.append("td")
    .attr("colspan",12)
    .append("div")
    .style("height","100%")
    .style("width","100%");

  //populate the first column
  //the "d" referenced below will be a row in the
  // "amazonData array", since we attached the array
  //to the parent object "rows"

  //the word "amazon" in italics
  theFirstColumn
    .attr("class","searchWordColumn")
    .attr("searchTerms",function(d) {
      return d.words;
    })
    .attr("dataSort",function(d) {
      return d.words;
    })
    .attr("abbr",1)
    .append("span")
    .attr("class","amazonWord")
    .html(function(d) {return  d.words.split(' ')[0]});
  //the second search term
  theFirstColumn
    .append("span")
    .attr("class","amazonSearchWord")
    .text(function(d) {return ' ' + d.words.split(' ')[1]});

  //populate the second column
  //the "d" referenced below will be a row in the amazonData array
  theSecondColumn
    .attr("abbr",1)
    .attr("dataSort",function(d) {return d.monthlySearches})
    .append("span")
    .attr("class","monthlySearches")
    .text(function(d) {return ' ' + addCommas(d.monthlySearches)});

  //make the chart
  //get width and height we want to use
  // (had to hard-code height for now)
  var theWidth = (theGraphColumn.style("width"));
  var theHeight = 40; // doesn't work:theGraphColumn.style("height");

  //add the svg element with the desired width and height
  var svgLine = theGraphColumn
    .append("svg")
    .attr("width",theWidth)
    .attr("height",theHeight)
    .attr("class","svgCell");

  //helper function - I should change this to use D3's built-in
  //   scaling functions.  Did lots of silly putzing with this.
  var scaleY = function(fraction) {
    //  0 --> height - 4
    //  1 --> 4
    return (8-theHeight)*fraction + (theHeight-4);
  };

  //add the line for the searches each month
  //try to set the x values so that they are
  // roughly in the middle of the header cells
  svgLine.append("path")
    .attr("d",
      function(d) {
        return (d3.svg.line()
          .x(function(dValue,i) {
            return theWidth/24 + i*(theWidth/12);
          })
          .y(function(dValue) {
            if (d.searchesRange===0) {
              //just return the middle
              return scaleY(0.5);
            }
            else {
              var f = (dValue - d.minSearches) /
                (d.searchesRange);
              return scaleY(f);
            }
          })
          //"d.values" is the array of
          //  searches for each month
          .interpolate("linear"))(d.values);
      })
    .attr("stroke","blue")
    .attr("fill","none")
    .attr("stroke-width",1);

  //add light vertical divider lines... somewhat crudely done here;
  //  had some fighting with getting the selectors to work
  for (i=0;i<12;i++) {
    svgLine.append("line").attr("class","monthLine month_m_" + i)
      .attr("x1",theWidth/24 + i*(theWidth/12))
      .attr("x2",theWidth/24 + i*(theWidth/12))
      .attr("y1",0)
      .attr("y2",theHeight)
      .attr("monthIndex","m_" + i)
      .on("mouseover", function() {
        var ii = d3.select(this).attr("monthIndex");
        var monthLines = d3.selectAll('.month_' + ii);
        monthLines.classed('selected',true);
      })
      .on("mouseout", function() {
        var ii = d3.select(this).attr("monthIndex") + "";
        var monthLines = d3.selectAll('.month_' + ii);
        monthLines.classed('selected',false);
      });
  }
}


