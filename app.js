
var data = [{
    "sale": "202",
    "year": "2000"
}, {
    "sale": "215",
    "year": "2001"
}, {
    "sale": "179",
    "year": "2002"
}, {
    "sale": "199",
    "year": "2003"
}, {
    "sale": "134",
    "year": "2003"
}, {
    "sale": "176",
    "year": "2010"
}];

var vis = d3.select("#visualisation");
var WIDTH = 1000;
var HEIGHT = 500;
var MARGINS = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 50
    };

var xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000,2010]);
var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134,215]);

var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.sale);
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
