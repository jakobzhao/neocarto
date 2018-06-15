# Force Directed Layout

## Introduction

One way to display a network in D3.js is using a Force Directed layout. This type of layout assigns forces to nodes and links to generate a clean and readable network. The simulation effectively takes a list of data objects and uses them as **nodes**. Think of those nodes as the data bubbles in the image below. Another important feature of force simulations are **links**. They connect nodes to display relations. Every link needs to have at least a source and a target. Both are ids referencing one of the above nodes.

> A popular method for laying out networks is to assign repulsive and attractive forces to nodes and links so that the emergent behavior of the competing forces produces a network that is more legible than manually or hierarchically placing the nodes. These competing forces are typically a repulsive force exerted by nodes (which can be based on a numerical attribute of the node or a fixed value), an attractive force exerted by shared links between nodes (which can be based on the strength of the length, typically known as "weight" or fixed) and a canvas gravity that draws nodes toward the center of the screen and prevents them from being pushed beyond the view of the user. [Source: [Introduction to Network Analysis and Representation](http://dhs.stanford.edu/dh/networks/)]

![](img/ForceAtlas.png)

We are going to build a simple network showing character co-occurence in Les Misérables based on this [example](https://bl.ocks.org/mbostock/4062045) from Mike Bostock and following the steps of [this tutorial](https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811). To limit the network's dimension, we simplified the original data removing some nodes and links.

[Live Demo](index.html)


```js
{
    "nodes": [
      {"id": "Myriel", "group": 1},
      {"id": "Napoleon", "group": 1},
      {"id": "Mlle.Baptistine", "group": 1},
      {"id": "Mme.Magloire", "group": 1},
      {"id": "CountessdeLo", "group": 1},
      {"id": "Geborand", "group": 1},
      {"id": "Champtercier", "group": 1},
      {"id": "Cravatte", "group": 1},
      {"id": "Count", "group": 1},
      {"id": "OldMan", "group": 1},
      {"id": "Labarre", "group": 2},
      {"id": "Valjean", "group": 2},
      {"id": "Marguerite", "group": 3},
      {"id": "Mme.deR", "group": 2},
      {"id": "Isabeau", "group": 2},
      {"id": "Gervais", "group": 2},
      {"id": "Tholomyes", "group": 3},
      {"id": "Listolier", "group": 3},
      {"id": "Fameuil", "group": 3},
      {"id": "Blacheville", "group": 3},
      {"id": "Favourite", "group": 3},
      {"id": "Dahlia", "group": 3},
      {"id": "Zephine", "group": 3},
      {"id": "Fantine", "group": 3}
    ],
    "links": [
      {"source": "Napoleon", "target": "Myriel", "value": 1},
      {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
      {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
      {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
      {"source": "CountessdeLo", "target": "Myriel", "value": 1},
      {"source": "Geborand", "target": "Myriel", "value": 1},
      {"source": "Champtercier", "target": "Myriel", "value": 1},
      {"source": "Cravatte", "target": "Myriel", "value": 1},
      {"source": "Count", "target": "Myriel", "value": 2},
      {"source": "OldMan", "target": "Myriel", "value": 1},
      {"source": "Valjean", "target": "Labarre", "value": 1},
      {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
      {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
      {"source": "Valjean", "target": "Myriel", "value": 5},
      {"source": "Marguerite", "target": "Valjean", "value": 1},
      {"source": "Mme.deR", "target": "Valjean", "value": 1},
      {"source": "Isabeau", "target": "Valjean", "value": 1},
      {"source": "Gervais", "target": "Valjean", "value": 1},
      {"source": "Listolier", "target": "Tholomyes", "value": 4},
      {"source": "Fameuil", "target": "Tholomyes", "value": 4},
      {"source": "Fameuil", "target": "Listolier", "value": 4},
      {"source": "Blacheville", "target": "Tholomyes", "value": 4},
      {"source": "Blacheville", "target": "Listolier", "value": 4},
      {"source": "Blacheville", "target": "Fameuil", "value": 4},
      {"source": "Favourite", "target": "Tholomyes", "value": 3},
      {"source": "Favourite", "target": "Listolier", "value": 3},
      {"source": "Favourite", "target": "Fameuil", "value": 3},
      {"source": "Favourite", "target": "Blacheville", "value": 4},
      {"source": "Dahlia", "target": "Tholomyes", "value": 3},
      {"source": "Dahlia", "target": "Listolier", "value": 3},
      {"source": "Dahlia", "target": "Fameuil", "value": 3},
      {"source": "Dahlia", "target": "Blacheville", "value": 3},
      {"source": "Dahlia", "target": "Favourite", "value": 5},
      {"source": "Zephine", "target": "Tholomyes", "value": 3},
      {"source": "Zephine", "target": "Listolier", "value": 3},
      {"source": "Zephine", "target": "Fameuil", "value": 3},
      {"source": "Zephine", "target": "Blacheville", "value": 3},
      {"source": "Zephine", "target": "Favourite", "value": 4},
      {"source": "Zephine", "target": "Dahlia", "value": 4},
      {"source": "Fantine", "target": "Tholomyes", "value": 3},
      {"source": "Fantine", "target": "Listolier", "value": 3},
      {"source": "Fantine", "target": "Fameuil", "value": 3},
      {"source": "Fantine", "target": "Blacheville", "value": 3},
      {"source": "Fantine", "target": "Favourite", "value": 4},
      {"source": "Fantine", "target": "Dahlia", "value": 4},
      {"source": "Fantine", "target": "Zephine", "value": 4},
      {"source": "Fantine", "target": "Marguerite", "value": 2},
      {"source": "Fantine", "target": "Valjean", "value": 9}
    ]
  }
```



## Setting up the workspace

The first step is to include the necessary `d3.js` library in our page and to specify width and height of our SVG layout. These elements are placed inside the `head` tags. We also add the link to the stylesheet  (`style.css`) file, which we will discuss later.

```html
<head>    

    <meta charset="utf-8">
    <svg width="400" height="400"></svg>
    <script src="https://d3js.org/d3.v5.min.js"></script>		
    <link rel="stylesheet" href="assets/style.css">

</head>
```

### Dimensions and color

Inside the `body`  tags we create a variable SVG with the dimensions we specified for the SVG element between the `head` tags. We also create a color scale that we are going to use to color the nodes. For this example we use [schemeCategory10](https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9).

```js
var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory10);
```



## Building the Force Layout

### Start the simulation

Now that we have our container ready, we can create a force simulation instance.  `d3.forceSimulation()` creates a new simulation with the specified array of nodes and forces. If nodes is not specified, it defaults to an empty array. The simulator starts automatically. We start adding two different forces. The first one, **charge** is a global force that affects every node. It simulates electrostatic effects, which makes the graph feel organic and natural as the nodes affect each other. The many-body force applies mutually amongst all nodes. It can be used to simulate gravity (attraction) if the strength is positive, or electrostatic charge (repulsion) if the strength is negative. The second force, **center**, simply translates all nodes to visually move them into the center of the SVG element.

```js
    var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width / 2, height / 2));
```

​    

### Add the nodes

Now we load the data contained in the `json` file and start building the graph adding nodes. To do so, we define the `node` variable and create a `g` element to add to the SVG container. Then we append to `node ` SVG circles with a radius value of 5 and color based on the group number of each element in the data (`d.group`). Finally we add the nodes to the simulation and define the function `ticked`. The tick handler is an important part of the D3 force simulation:

> The force layout runs asynchronously. That is, when you call force.start() it starts doing its computations that determine the position of the nodes in parallel in the background. These computations are not a single step, but a simulation running over a long time (several seconds).
>
> The tick handler is the function that enables you to get the state of the layout when it has changed (the simulation has advanced by a tick) and act on it -- in particular, redraw the nodes and links where they currently are in the simulation. ([source](https://stackoverflow.com/questions/28745398/why-do-we-need-force-ontick-in-d3))



```js
    d3.json("assets/miserables.json").then (function(graph) { 
    
    var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g");
      
    var circles = node.append("circle")
    .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); });
    
    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);
    
    function ticked() {
    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
    }
    });
```



The result of this initial piece of code (step1.html) is shown in the image below.

![](D:\Cloud\Cloud\Force Atlas\img\step1.jpg)

### Add the links

Now that we have the nodes, we need to add the links between them. Before doing that, let's create the `css` file to style the lines which will visually display the links. 

```css
.links line {
    stroke: #999;
    stroke-opacity: 0.6;
  } 
```

Links also create forces which either push nodes together or apart depending on the applied strength. We add to the simulation a new force. The link force pushes linked nodes together or apart according to the desired link distance. The strength of the force is proportional to the difference between the linked nodes’ distance and the target distance. d3.forceLink([links]) creates a new link force with the specified links and default parameters. If links is not specified, it defaults to an empty array.

```js
      var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(width / 2, height / 2));
```

  Then we can create the `line` elements to display our links respectively. This works basically the same as the circle elements.  

```js
        var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
```

In order to move the links on every tick, we add the following snippet to the `ticked` function.  

```js
        function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        
```

And finally we need to apply all *links* to the **link** force.

```js
        simulation.force("link")
        .links(graph.links);
```

The result of these additions (step2.html) is shown in the image below.

![](D:\Cloud\Cloud\Force Atlas\img\step2.jpg)

### Add interactivity

To be able to interact with the graph, we at least need to add drag and drop. D3 already provides a nice API to add drag and drop functionalities without too much work. The alphaTarget adjustments help us to create a more natural feeling and to rerun the simulation after the drop.

```js
        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
        
        function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        }
        
        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        }
```

To activate these drag and drop events, we need to add them to the circle elements.

```js
        var circles = node.append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
```

The result of these additions is shown in step3.html.

Drag and drop is only one of the many interactive actions you can add to a Force Layout. To learn how to use more animations, you can read this very useful [article](http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/).

### Structure

To keep the structure clean, we organized the data creating separate folders for `css`, `js` and `assets` (the `json` data). Inside the body tags we inserted only the link to the JavaScript file which contains the script to create the visualization. 

```html
<body>
    <script src="js/main.js"></script>
</body>
```







