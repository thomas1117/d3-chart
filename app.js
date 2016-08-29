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

// var minDate = convertTime(minTime);
// var maxDate = convertTime(maxTime);

var rangeObj2 = getRange(dataset2);

var minTime2 = rangeObj2.minTime;
var maxTime2 = rangeObj2.maxTime;

var minVal2 = +rangeObj2.minVal;
var maxVal2 = +rangeObj2.maxVal;

var minDate2 = convertTime(minTime2);
var maxDate2 = convertTime(maxTime2);


var minDate = padTime(maxTime,minTime).minDate;
var maxDate = padTime(maxTime,minTime).maxDate;

function padTime(maxTime,minTime) {
  var diffTime = maxTime - minTime;

  var pad = diffTime * .10;

  var minWithPad = minTime - pad;

  var maxWithPad = maxTime + pad;

  return {
    minDate: convertTime(minWithPad),
    maxDate: convertTime(maxWithPad)
  }
}


 
/* Invoke the tip in the context of your visualization */



var vis = d3.select("#visualization");


var boxes = d3.select("#boxes");


//for tool tips

var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);



var WIDTH = 1000;
var HEIGHT = 450;
var PAD = 20;
var MARGINS = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 0
};

vis.append('svg:rect')
.attr("id","background")
.attr("x",0)
.attr("y",MARGINS.top)
.style("width",WIDTH - MARGINS.right)
.style("height",HEIGHT - MARGINS.bottom - MARGINS.bottom)


var xScale = d3.time.scale().domain([minDate,maxDate]).range([MARGINS.left, WIDTH - MARGINS.right]);

var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100]);

var lineGen1 = lineCreate(maxVal);
var lineGen2 = lineCreate(maxVal2);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(d3.time.format("%b"))
    // .innerTickSize(-HEIGHT)
    .outerTickSize(0)

    
var yAxis = d3.svg.axis()
    .outerTickSize(0)
    .scale(yScale)
    .ticks(5)
    .innerTickSize((-WIDTH + MARGINS.right))
    .orient("right");

var parseDate = d3.time.format("%Y-%m-%d").parse;

xAxisGenerate();
yAxisGenerate();

lineAppend('line-1',lineGen1,dataset1,'#3C8D2F');
lineAppend('line-2',lineGen2,dataset2,'#AA3939');

circleAppend('line-1',dataset1,maxVal,'#3C8D2F');
circleAppend('line-2',dataset2,maxVal2,'#AA3939');

function xAxisGenerate() {
    vis.append("svg:g")
    .attr("id",'x-axis')
    .attr("class","axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
  }
  

function yAxisGenerate() {
  vis.append("svg:g")
    .attr("id",'y-axis')
    .attr("class","axis")
      .attr("transform", "translate(" + (WIDTH-MARGINS.right) + ",0)")
      .call(yAxis);
}



function lineAppend(id,func,dataSet,color) {
  vis.append('svg:path')
    .attr('id',id)
    .attr('d', func(dataSet))
    .attr('stroke', color)
    .attr('fill', 'none');
}


function lineCreate(maxVal) {
  return d3.svg.line()
    .x(function(d){
      
      return xScale(convertTime(d.time))
    })
    .y(function(d){
      return yScale((+d.value/maxVal) * 96);
    })
}

function circleAppend(id,dataSet,maxed,color) {
    var that = vis;
    vis.selectAll(id)
      .data(dataSet)
      .enter().append('circle')
      .attr('cx', function(d) {
        
        return xScale(convertTime(d.time));
      })
      .attr('cy', function(d) {
        
        return yScale((+d.value/maxed) * 96);
      })
      .attr('fill',color)
      .on("mouseover",function(d){

        div.transition()    
        .duration(200)    
        .style("opacity", .9);
        div.html(
          "<span>Value: " + d.value + "</span>" + "<br/>" +
          "<span>Time: " + moment(convertTime(d.time)).format('M/DD/YY') + "</span>"
          )
        .style("left", (d3.event.pageX) + "px")   
        .style("top", (d3.event.pageY - 45) + "px");  
      })
}


function rectCreate(id,data,ypos,color,masterData) {
  var x = xScale(convertTime(data.start));
  var end = xScale(convertTime(data.end))

  var width = end - x;

  boxes.append('rect')
  .attr("id",id)
  .attr("x",x)
  .attr("y",ypos)
  .attr("width",width)
  .attr("height",20)
  .attr("fill",color)
  .on("mouseover",function(d){
    
    div.transition()    
    .duration(200)    
    .style("opacity", .9)
    div.html(
      "<h2>Campaign Name:" + masterData.name + "</h2>" + 
      "<h4>Start Time: " + moment(convertTime(data.start)).format("MM/DD/YY") + "</h4>" +
      "<h4>End Time: " + moment(convertTime(data.end)).format("MM/DD/YY") + "</h4>"
    )
    .style("left", (d3.event.pageX) + "px")   
    .style("top", (d3.event.pageY - 28) + "px");  
  })


}

var colors = ['#214586','green']

campaignSet.forEach(function(masterObj,index){
    var yPos = 20 + (40*index);
    var color = colors[index];

    appendToKey(masterObj,color)

    masterObj.dates.forEach(function(dates,i){
      
      rectCreate('rect-' + (i+ "" + index) ,dates,yPos,color,masterObj);
    })
})

function appendToKey(obj,color) {
  var list = document.getElementById('key');
  var li = document.createElement('li');

  li.innerHTML = "<div class='colorbox' style=background-color:" + color + "></div>" + "<span>" + obj.name + "</span>";


  list.appendChild(li)
}


        

