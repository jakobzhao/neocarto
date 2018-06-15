# Sankey Diagram of Estimated Water Treatment Flow in Washington Co., OR

**Sankey** | **May 1, 2018** | **Processes with Numerical Data** | **Contributors:** [Courtney van Stolk](https://github.com/vanstolc)

![](/assets/mywatersankey.jpeg)

This visualization creates a Sankey diagram, commonly used to show the magnitude of flows between parts of a unidirectional system. In this case I have used it to show the flow of water in Washington County, Oregon from water sources through the water distribution nodes, to the consumers, and then to wastewater treatment. 

The Tualatin Valley Water District (represented on the diagram as "Water Consumers") buys water from the Joint Water Commision (JWC) and from the City of Portland. The JWC's water is sourced from the Tualatin River and processed at their treatment plant. The City of Portland delivers water from both the Columbia South Shore Well Field and the Bull Run Watershed via the Powell Butte Reservoir and the Washington County Pipeline. 

Once the water is used, water from the sewers flows to one of two treatment plant systems owned by Clean Water Service (CWS). This includes the Durham Plant and the Rock Creek plant on average, although two additional ancillary plants can be brought online as needed.

The flows depicted here are approximate. The actual flow pattern changes on a daily basis depending on demand and availability. A certain amount of error is introduced as the water distribution entities describe their flow in maximum capacity per day while the water treatment entity describes their flow in average volume treated per day. This discrepancy is shown in the "Other" category in the top right corner of the diagram.

[Live Demo](index.html)



## 1\. Set up the workspace

This visualization requires three files in your workspace:
* your data, in .json format
* the index.html file with your code
* the javascript file with the Sankey code, which can also be grabbed from an online host

## 2\. Data Sources

The Sankey HTML code is straightforward but requires the data to be inputted in a specific syntax in order for it to interact nicely with the Sankey JavaScript code.

I recommend first drawing out a sketch of the process and the flows which will make the following steps easier. Assign each step a number from 0 to one less than the total number of nodes.

First, you create an array named ```"nodes" ```which contains all of the steps in your process and assigns their names. Write these in the order you determined in the sketch.

```json
{"nodes":[
{"name":"Columbia South Shore Well Field"},
{"name":"Bull Run Watershed"},
{"name":"Haggs Lake"},
{"name":"Barney Reservoir"},
{"name":"Powell Butte Reservoir"},
{"name":"Tualatin River"},
{"name":"Washington County Pipeline"},
{"name":"JWC Treatment Plant"},
{"name":"Water Consumers"},
{"name":"Other"},
{"name":"CWS Durham Treatment Plant"},
{"name":"CWS Rock Creek Treatment Plant"}
],
```

Next, you create a second array called ```"links"```. This array calls in each of the nodes in the first array as either a ```source``` or a ```target``` (for example, ```"Columbia South Shore Well Field"``` is represented here by 0 in the code and was also number 0 on my sketch - here's where the sketch comes back to help you). Once the source and the target are defined, you then assign the ```value``` of the flow between the two.  There's no need to state the units in here unless you'd like to in a comment. The unit will be added in the HTML code.

```json
"links":[
{"source":0,"target":4,"value":21.1},

{"source":1,"target":4,"value":21.2},

{"source":2,"target":5,"value":38},

{"source":3,"target":5,"value":37},

{"source":4,"target":6,"value":42.3},

{"source":5,"target":7,"value":75},

{"source":6,"target":8,"value":42.3},

{"source":7,"target":8,"value":75},

{"source":8,"target":9,"value":52.3},{"source":8,"target":10,"value":26},{"source":8,"target":11,"value":39}]}
```

This .json file is then saved and will be referenced in the HTML file.

## 3\. Tutorial

### JavaScript

The JavaScript code that makes this visualization run is hosted at https://unpkg.com/d3-sankey@0.6

The HMTL code as written streams it from that source, but you can also download the code to your local server.

If you are only looking to customize the Sankey diagram to your dataset, size, and colors and not hoping to modify any of its underlying functions, you will not have to make edits in the JavaScript code. I did not alter any of the JavaScript code for this project.

A step-by-step walkthrough of this code can be found at:

https://www.npmjs.com/package/d3-sankey



### HTML

The HTML code for this visualization takes the processes performed by the JavaScript code and turns it into a display. We'll make changes in this code to modify the size, color, and dataset visualized.

First up, the first block of code sets the title, display width and height, and also calls in the code for the D3 platform as well as the d3-sankey code.

```html
<!DOCTYPE html>
<title>Estimated Treated Water Flow in Washington County</title>
<svg width="750" height="400"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://unpkg.com/d3-sankey@0.6"></script>
<script>
```

Next we create a variable which feeds that stated width and height to the D3 code.

```html
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
```

Then it's time to start customizing the format - the following section set the pop-up when the viewer mouses over a node as well as the color of the node. This is originally written as follows:

```html
var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " "+"MGD"; },
    color = d3.scaleOrdinal(d3.schemeCategory10);
```

That original code calls in the default random colors from D3. I wanted to specify colors for each node based on my own color scheme, and used the code from https://stackoverflow.com/questions/13006712/d3-js-sankey-diagram-rectangles-fill-color. This solution suggested making a matrix with domain and range attributes, and using that matrix to assign colors. My altered code for this variable looks like:

```html
var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " "+"MGD"; },
    // color = d3.scaleOrdinal(d3.schemeCategory10);
    // altered color scheme based on https://stackoverflow.com/questions/13006712/d3-js-sankey-diagram-rectangles-fill-color
    color = d3.scaleOrdinal()
        .domain(["Columbia South Shore Well Field",
            "Bull Run Watershed",
            "Haggs Lake",
            "Barney Reservoir",
            "Powell Butte Reservoir",
            "Tualatin River",
            "Washington County Pipeline",
            "JWC Treatment Plant",
            "Water Consumers",
            "Other",
            "CWS Durham Treatment Plant",
            "CWS Rock Creek Treatment Plant"])
        .range(["#dc4404",
            "#f3bb3b",
            "#dc4404",
            "#f3bb3b",
            "#84aec8",
            "#84aec8",
            "#5581ba",
            "#5581ba",
            "#f3bb3b",
            "#dc4404",
            "#84aec8",
            "#5581ba"]);
```

The next part of the code creates three more variables which specify the width and padding of the rectangular nodes, the color and opacity of the linkages, and the attributes of the labels.

```html
// Sets width and padding of nodes
var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 6]]);

// Sets color and opacity of links
var link = svg.append("g")
    .attr("class", "links")
    .attr("fill", "none")
    .attr("stroke", "#dcdbdb")
    .attr("stroke-opacity", 1)
  .selectAll("path");

// Sets attributes of the labels
var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
  .selectAll("g");
```

This has all been formatting to set the stage. Let's bring the data into play! My .json file with the data is called "energy1"

```html
//links the dataset and sets up error message
d3.json("energy1.json", function(error, energy1) {
  if (error) throw error;

  sankey(energy1);
```

Next, we feed the link information from energy1.json into the d3-sankey code. This scales the size of the linkages to the magnitude of the flow that we specified in the .json for each set of source and target.

```html
link = link
    .data(energy1.links)
    .enter().append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke-width", function(d) { return Math.max(1, d.width); });

  link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });
```

Finally, we bring in the node information. The size of the node is determined by the size of the linkages that flow in and out of it, as calculated above.  This section of code also calls in the name of each node from that first array in the .json file. 

```html
  node = node
    .data(energy1.nodes)
    .enter().append("g");

  // adds the colored node boxes to the Sankey diagram, each size based on the link values
  node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");

  // Makes the names of each node show up on the Sankey diagram
  node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

  node.append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });
});

</script>
```

## 4\. More examples of similar geovisualizations

This is a simple example of a Sankey diagram, but others can be extremely complex! For example Mike Bostock visualizes projected energy data for the United Kingdom in 2050 is his Sankey example:
![](/assets/Original_bostock_sankey1.JPG)



## Acknowledgement

The original code for this visualization was developed by Mike Bostok of D3 

https://github.com/d3/d3-sankey Version 0.6.1. Copyright 2017 Mike Bostock.

## References

The volumes of water flowing through the stages of the process are based on information from the following sources:

### Tualatin Valley Water Department

<https://www.tvwd.org/your-water/water-sources.aspx> 

### City of Portland Water Department

<https://www.portlandoregon.gov/water/29332>

### Joint Water Commission

<http://jwcwater.org/>

### Clean Water Services

<https://www.cleanwaterservices.org/about-us/one-water/our-facilities/>

