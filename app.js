var moment = require('moment');

var dataset1 = require('./data/db.js').dataset1;
var dataset2 = require('./data/db.js').dataset2;
var campaignSet = require('./data/db.js').campaignSet;

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

var lineGen1 = lineCreate(maxVal);
var lineGen2 = lineCreate(maxVal2);

var xAxis = d3.svg.axis()
    .scale(xScale)

    
var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(1)
    .orient("right");

var parseDate = d3.time.format("%Y-%m-%d").parse;

xAxisGenerate();
yAxisGenerate();

lineAppend('line-1',lineGen1,dataset1,'green');
lineAppend('line-2',lineGen2,dataset2,'blue');

circleAppend('line-1',dataset1,maxVal);
circleAppend('line-2',dataset2,maxVal2);

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



function lineAppend(id,func,dataSet,color) {
  vis.append('svg:path')
    .attr('id',id)
    .attr('d', func(dataSet))
    .attr('stroke', color)
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}


function lineCreate(maxVal) {
  return d3.svg.line()
    .x(function(d){
      
      return xScale(convertTime(d.time))
    })
    .y(function(d){
      return yScale((+d.value/maxVal) * 100);
    })
}

function circleAppend(id,dataSet,maxed) {
    vis.selectAll(id)
      .data(dataSet)
      .enter().append('circle')
      .attr('cx', function(d) {
        
        return xScale(convertTime(d.time));
      })
      .attr('cy', function(d) {
        
        return yScale((+d.value/maxed) * 100);
      })
      .attr('r', 6);
}




function rectCreate(id,data,color) {
  var totalDiff = +maxTime - minTime;

  var rectDiff = data.end - data.start;

  var width = (rectDiff / totalDiff) * WIDTH;

  var start = new Date(data.start *1000);

  var end = new Date(data.end *1000);




  var fromBeg = (data.start - minTime);

  vis.append('rect')
  .attr("id",'rect-1')
  .attr("x",fromBeg)
  .attr("y",10)
  .attr("width",width)
  .attr("height",20)
  .attr("fill",color)

}



rectCreate('rect-1',campaignSet[0].dates[0],'blue');







