//MMM converts to three letter abbrev
var moment = require('moment');

var data = [
{
    "value": "179",
    "time": "1454121215"
},
{
    "value": "209",
    "time": "1462070015"
},
{
    "value": "229",
    "time": "1462000015"
},
 {
    "value": "199",
    "time": "1472070015"
}


];


function convertTime(epoch) {
	var date = +epoch * 1000;

	var dateObj = new Date(date);

	return dateObj;
}

function convertDate(date) {

	return moment(date).format('DD-MMM-YY')
}

function getRange(arr) {
	var lowTime = Number.POSITIVE_INFINITY;
	var highTime = Number.NEGATIVE_INFINITY;

	var lowVal = Number.POSITIVE_INFINITY;
	var highVal = Number.NEGATIVE_INFINITY;
	
	var tmpTime;
	var tmpVal;

	for (var i= arr.length-1; i>=0; i--) {
	    
	    tmpTime = arr[i].time;
		tmpVal = arr[i].value;

		if (tmpTime < lowTime) lowTime = tmpTime

	    if (tmpTime > highTime) highTime = tmpTime

	    if (tmpVal < lowVal) lowVal = tmpVal

	    if (tmpVal > highVal) highVal = tmpVal
	}

	return {
		minTime:lowTime,
		maxTime:highTime,
		minVal:lowVal,
		maxVal:highVal
	}
}

var rangeObj = getRange(data);

var minTime = rangeObj.minTime;
var maxTime = rangeObj.maxTime;

var minVal = +rangeObj.minVal;
var maxVal = +rangeObj.maxVal;

var minDate = convertTime(minTime);
var maxDate = convertTime(maxTime);




// var range = endMonth - startMonth + 2;


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

var formatDate = d3.time.format("%d-%b-%y");

var xScale = d3.time.scale().domain([minDate,maxDate]).range([MARGINS.left, WIDTH - MARGINS.right]);


// var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([startMonth-1,endMonth + 1]);

var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minVal-10,maxVal + 100]);

var lineGen = d3.svg.line()
  .x(function(d) {
  	
    return xScale(convertTime(d.time));
  })
  .y(function(d) {
    return yScale(d.value);
  })



var xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(3);
    

var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(15)
    .orient("right");

vis.append("svg:g")
	.attr("class","axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);


vis.append("svg:g")
	.attr("class","axis")
    .attr("transform", "translate(" + (WIDTH-MARGINS.right) + ",0)")
    .call(yAxis);


vis.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
