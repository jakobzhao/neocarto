# ternary-plot

**Ternary Plot** | **Last updated: 05/15/2018** | **Contributor:** Chunxue Xu

![](/img/tplot.jpeg)

[Live Demo](http://geoviz.ceoas.oregonstate.edu/neocarto/modules/charts/ternaryplot/index.html)

## Introduction
Ternary plot is a barycentric plot on three variables which sum to a constant. It graphically depicts the ratios of the three variables as positions in an equilateral triangle. It is used in physical chemistry, petrology, mineralogy, metallurgy, and other physical sciences to show the compositions of systems composed of three species. In population genetics, it is often called a de Finetti diagram. In game theory, it is often called a simplex plot.[1-3]

In a ternary plot, the proportions of the three variables a, b, and c must sum to some constant. Usually, this constant is represented as 100%.
## 1\.Applicable data types
Basically, the data can be from different fiels like physical chemistry, petrology, geography, and other physical sciences to show the compositions of systems. For example, there are three types of urban expension types include infilling, leapfrogging and edge-expansion. The change of the proportional composition, calculated from the numbers of patches, of the three growth types can be visualized in this plot.The Data used in this template are generated randomly.

## 2\. Set up the workspace
For the workspace, we need to include the necessary d3.js library and add the link to the stylesheet (style.css) file. 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ternary Plot</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="https://d3js.org/d3.v5.min.js"></script>
</head>
```
## 3\. A function-by-function Tutorial

- Set the dimension of svg
```html
    var svg = d3.select("svg"),
        margin = {top: 30, right: 20, bottom: 30, left: 20},
        m = 15,
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        axis_labels = ['A','B','C'];

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
```
- Set three corners
```html
    var corners = [[m,height-2*m],[width-m, height-2*m],[width/2,(height-2*m-(width/2-m)* Math.sqrt(3))]];
    corners.forEach(function(corner, idx) {
        var c1 = idx, c2 = idx + 1; if(c2 >= corners.length) { c2 = 0;}
        g.append("line")
            .attr("x1", corners[c1][0])
            .attr("y1", corners[c1][1])
            .attr("x2", corners[c2][0])
            .attr("y2", corners[c2][1])
            .classed('axis', true);
    });
```
- Load data from csv
```html
    d3.csv("assets/data.csv").then(function(data) {
        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return coord(+d.a,+d.b,+d.c)[0]
            })
            .attr("cy", function (d) { return coord(+d.a,+d.b,+d.c)[1] })
            .attr("r", 5)


        // }
    });
```

## 4\. More examples of similiar geovisualizations
http://bl.ocks.org/tomgp/7674234


## References
[1]Karl Tuyls, "An evolutionary game-theoretic analysis of poker strategies", Entertainment Computing January 2009 doi:10.1016/j.entcom.2009.09.002, p. 9   
[2]Vaughan, Will (September 5, 2010). "Ternary plots". Retrieved September 7, 2010.  
[3]https://en.wikipedia.org/wiki/Ternary_plot
