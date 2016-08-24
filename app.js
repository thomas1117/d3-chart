//MMM converts to three letter abbrev
var moment = require('moment');

var data = [{
    "value": "202",
    "time": " 1469391615"
}, {
    "value": "215",
    "time": "1466799615"
}, {
    "value": "179",
    "time": "1464121215"
}, {
    "value": "199",
    "time": "1472070015"
}];

var months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug'];




function convertToMonth(epoch) {
	return moment(epoch * 1000).utc().format('M');
}

function getRange(arr) {
	var lowest = Number.POSITIVE_INFINITY;
	var highest = Number.NEGATIVE_INFINITY;
	
	var tmp;

	for (var i= arr.length-1; i>=0; i--) {
	    
	    tmp = arr[i].time;
		
		if (tmp < lowest) lowest = tmp;

	    if (tmp > highest) highest = tmp;
	}

	return {
		min:lowest,
		max:highest
	}
}

var min = getRange(data).min;
var max = getRange(data).max;

var startMonth = convertToMonth(min);
var endMonth = convertToMonth(max);

console.log(startMonth,endMonth)



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

var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000,2010]);
var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134-PAD,215+PAD]);

var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.time);
  })
  .y(function(d) {
    return yScale(d.value);
  })



var xAxis = d3.svg.axis()
    .scale(xScale);
  
var yAxis = d3.svg.axis()
    .scale(yScale)
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
