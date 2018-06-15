
var svg = d3.select("svg"),
    margin = {top: 30, right: 30, bottom: 65, left: 65},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var hsvcolor = d3.interpolateHsvLong('#5581ba', '#dcdbdb');
var color = d3.scaleSequential(hsvcolor).domain(ZRANGE);


var x = d3.scaleLinear()
    .range([0, width])
    .domain(xi);
var y = d3.scaleLinear()
    .range([0, height])
    .domain(yi);



d3.json(FNAME, function(error, mountain) {
    if (error) throw error;

    g.selectAll("path")
        .data(d3.contours()
            .size([mountain.width, mountain.height])
            .thresholds(d3.range(ZRANGE[0], ZRANGE[1], dZ))
            (mountain.values))
        .enter().append("path")
        .attr("d", d3.geoPath(d3.geoIdentity().scale((width) / mountain.width)))
        .attr("fill", function(d) { return color(d.value); })
        .on("mouseover", function(d,i){highlight(this);})
        .on("mouseout", function(d,i){unhighlight(this);});
});
function highlight(x){
    d3.select(x).style("stroke","black");
    d3.select(x.nextElementSibling).style("stroke","black");
}

function unhighlight(x) {
    d3.select(x).style("stroke", "white");
    d3.select(x.nextElementSibling).style("stroke", "white");
}

// x axis
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))
    .attr("class", "axis axis--x");

// y axis
g.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y).ticks(5))
    .attr("class", "axis axis--y")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3em")
    .attr("dy", "-1em")
    .attr("transform", "rotate(-90)");


g.append("text")      // text label for the x axis
    .attr("x", width/2 )
    .attr("y",  height+32 )
    .style("text-anchor", "middle")
    .text("Easting(km)")
    .attr("class", "axislabel");

g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", - 45)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Northing(km)")
    .attr("class", "axislabel");


