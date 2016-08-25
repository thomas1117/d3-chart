//MMM converts to three letter abbrev
//has to be ordered by time due to line draw...

var moment = require('moment');

var dataset1 = require('./data/db.js').dataset1;
var dataset2 = require('./data/db.js').dataset2;

var convertTime = require('./utils/utils.js').convertTime;
var convertDate = require('./utils/utils.js').convertDate;
var getRange = require('./utils/utils.js').getRange;

var rangeObj1 = getRange(dataset1);

var minTime = rangeObj1.minTime;
var maxTime = rangeObj1.maxTime;

var minVal = +rangeObj1.minVal;
var maxVal = +rangeObj1.maxVal;

var minDate = convertTime(minTime);
var maxDate = convertTime(maxTime);

var rangeObj2 = getRange(dataset2);

var minTime2 = rangeObj2.minTime;
var maxTime2 = rangeObj2.maxTime;

var minVal2 = +rangeObj2.minVal;
var maxVal2 = +rangeObj2.maxVal;

var minDate2 = convertTime(minTime2);
var maxDate2 = convertTime(maxTime2);

var vis = d3.select("#visualization");

var WIDTH = 1000;
var HEIGHT = 500;
var PAD = 20;
var MARGINS = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
    };

var xScale = d3.time.scale().domain([minDate,maxDate]).range([MARGINS.left, WIDTH - MARGINS.right]);

var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100]);

var lineGen1 = line1Create();

var lineGen2 = line2Create();

var xAxis = d3.svg.axis()
    .scale(xScale)

    
var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(1)
    .orient("right");

var parseDate = d3.time.format("%Y-%m-%d").parse;

xAxisGenerate();
yAxisGenerate();

line1Append();
line2Append();

line1CircleAppend();
line2CircleAppend();

function xAxisGenerate() {
    vis.append("svg:g")
    .attr("class","axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
  }
  

function yAxisGenerate() {
  vis.append("svg:g")
    .attr("class","axis")
      .attr("transform", "translate(" + (WIDTH-MARGINS.right) + ",0)")
      .call(yAxis);
}

function line1Append() {
  vis.append('svg:path')
    .attr('id','line-1')
    .attr('d', lineGen1(dataset1))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}



function line2Append() {
  vis.append('svg:path')
    .attr('id','line-2')
    .attr('d', lineGen2(dataset2))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}



function line1Create() {
  return d3.svg.line()
    .x(function(d) {
     
      return xScale(convertTime(d.time));
    })
    .y(function(d) {
      
      return yScale((+d.value/maxVal) * 100);
    })

}

function line2Create() {
  return d3.svg.line()
    .x(function(d) {
     
      return xScale(convertTime(d.time));
    })
    .y(function(d) {
     
      return yScale((+d.value/maxVal2) * 100);
    })
}

function line1CircleAppend() {
  vis.selectAll('#line-1')
    .data(dataset1)
    .enter().append('circle')
    .attr('cx', function(d) {
      
      return xScale(convertTime(d.time));
    })
    .attr('cy', function(d) {
      
      return yScale((+d.value/maxVal) * 100);
    })
    .attr('r', 6);
}

function line2CircleAppend() {
  vis.selectAll('#line-2')
    .data(dataset2)
    .enter().append('circle')
    .attr('cx', function(d) {
      
      return xScale(convertTime(d.time));
    })
    .attr('cy', function(d) {
      
      return yScale((+d.value/maxVal2) * 100);
    })
    .attr('r', 6);
}


