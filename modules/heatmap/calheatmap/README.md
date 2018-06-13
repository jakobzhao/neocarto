# Missing Migrants Calendar Heatmap

**Calendar Heatmap** | **Last updated: May 2018** | **Applicable data types: CSV or JSON** | **Author: [Hannah Friedrich]**

![](img/cal-01.png)
This tutorial will walk through how to create a calendar heatmap of CSV data using D3. This calendar heatmap shows frequency of
reported migrant deaths or missing people that have been reported since 2014.

## 1\. Set up the workspace
Set up workspace by getting csv with cleaned up columns of date and count. Include appropriate CDNs in header. See below.

## 2\. Data Sources
The data source used for this geovisualization is the [Missing Migrants] database. The database contains dates of events
that involved migrant deaths or injuries that have been reported.

## 3\. A function-by-function Tutorial
### CSS

    <style>

    body {
        font: 12px sans-serif;
        shape-rendering: crispEdges;
        width: 70%;
    }

    .day {
        fill: #fff;
        stroke: #ccc;
    }

    .month {
        fill: none;
        stroke: #000;
        stroke-width: 1px;
    }

    #info, text, p {
        font-family: 'Josefin Sans', sans-serif;
    }

    .container {
        color: grey;
        text-align: right;
        position: absolute;
        right: 20px;
        padding-top: 120px;
        padding-left: 80px;
        width: 20%;
        height: 20%;
    }

    #info {
        color: grey;
        text-align: right;
        position: absolute;
        right: 20px;
        padding-top: 80px;
        padding-left: 80px;
        width: 20%;
        height: 20%;
    }
    .title {
        text-align: right;
        position: absolute;
        right: 20px;
        padding-top: 10px;
        padding-left: 80px;
        width: 20%;
        height: 20%;
    }

    a{
        color: green;
    }

    h1{
        font-family: 'Josefin Sans', sans-serif;
    }

    .RdYlGn .q0-5{fill:rgb(220, 219, 219)}
    .RdYlGn .q1-5{fill:rgb(232, 203, 139)}
    .RdYlGn .q2-5{fill:rgb(243, 187, 59)}
    .RdYlGn .q3-5{fill:rgb(232, 128, 32)}
    .RdYlGn .q4-5{fill:rgb(220, 68, 4)}

    </style>

### HTML
At the beginning within the body tag is the HTML:

    <body>
        <div class = "title">
            <h1>Missing Migrants<br>Calendar Heatmap</h1>
        </div>
        <header>
            <span id="info">Mouse over the calendar to see the date and count of total reported migrant deaths and missing peoples.</span>
        </header>

        <div class="container">
            <div class="row top-buffer">
                <div class="col-xs-4">
                    <p>This calendar heatmap shows the daily frequency of reported global migrant deaths or missing migrants from the <a href="http://missingmigrants.iom.int/" target="_blank"> Missing Migrant database</a>. The Missing
                    Migrant database has been recording instances of reported deaths or missing peoples reports since 2014. </p>
                </div>
            </div>
            <div class="row top-buffer">
            <div class="col-xs-4">
                <p>This calendar heatmap is built on D3 using calendar heatmap, which is inspired by Mike Bostock. This geovisualization was created by <a href="https://github.com/hannahfriedrich/MissingMigrantDateHeatmap" target="_blank"> Hannah Friedrich</a>.</p>
            </div>
            </div>
        </div>

        <section id="body"></section>

### CDNs
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

### Javascript

        <script>

        //define size of graphic: width, height, and cellSize
        var width = 960,
            height = 136,
            cellSize = 17; // cell size

        //define variable called format which define the d3.timeFormat
        var format = d3.timeFormat("%Y-%m-%d");

        //define variable called color which scales the colors defined above
        var color = d3.scaleQuantize()
            .domain([0, 5]) //sets the "range" of values
            .range(d3.range(5).map(function(d) { return "q" + d + "-5"; })); //this maps the colors on to the data

        //this creates the calendar cell graphic
        var svg = d3.select("body").selectAll("svg")
            .data(d3.range(2014, 2019))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "RdYlGn")
            .append("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .style("text-anchor", "middle")
            .text(function(d) { return d; });

        //this creates the graphic for days
        var rect = svg.selectAll(".day")
            .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append("rect")
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
            .attr("y", function(d) { return d.getDay() * cellSize; })
            .datum(format);


        rect.append("title")
            .text(function(d) { return d; });

        //this creates the graphic for days
        svg.selectAll(".month")
            .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append("path")
            .attr("class", "month")
            .attr("d", monthPath);

        //load in csv data
        d3.csv("migrants_updated.csv", function(error, csv) {
            if (error) throw error;

            //nest data, obtain date and count data columns
            var data = d3.nest()
                .key(function(d) { return d.Date.substring(0,4) + "-" + d.Date.substring(4,6) + "-" + d.Date.substring(6,8); })
                //d.Date.substring(0,4) + "-" + d.Date.substring(4,6) + "-" + d.Date.substring(6,8)
                .rollup(function(d) { return (+d[0].Count); })
                .map(csv);

            console.log('data', data);

            //give data to rect variable
            rect.filter(function(d) { return data.has(d); })
                .attr("class", function(d) { return "day " + color(data.get(d)); })
                .select("title")
                .text(function(d) { return d + ": " + data.get(d); });
        });

        //monthPath function
        function monthPath(t0) {
            var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
                d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0)
            d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
                + "H" + w0 * cellSize + "V" + 7 * cellSize
                + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
                + "H" + (w1 + 1) * cellSize + "V" + 0
                + "H" + (w0 + 1) * cellSize + "Z";
        }

        //populate info header with date and count values
        rect.on('mouseover', function (d, i) {
            d3.select('#info')
                .text(function () {
                      var a = $( "title:contains('"+d+"')" ).text();
                      d = (a.split(":")[0]).toString()
                      c = (+a.split(":")[1]).toString()
                    //if (c = "NaN") {c = 0}

                    return 'Date: ' + d + ' | value: ' + c;
                });

        });

    </script>

## 4\. More examples of similiar geovisualizations
[Resuable Calendar Heatmap] allows the user to hover over individual cells which update the header information with
the cell value and date
[Heatmap with key] consists of a heatmap with a color key legend
[Vertical heatmap] is a similar construction of the heatmap with
[Alternative Calendar View] is a heatmap

## Acknowledgement
Thanks to Bo Zhao for helping me debug displaying the value in the mouse over function. Ahh!

## References
This tutorial is based on the calander heatmap examples created by [Micah Stubbs] and [Mike Bostock], which were made
with Version 4 of D3.

[Hannah Friedrich]: https://github.com/hannahfriedrich/MissingMigrantDateHeatmap
[Missing Migrants]: http://missingmigrants.iom.int/
[Micah Stubbs]: https://gist.github.com/micahstubbs/89c6bd879d64aa511372064c6cf85711
[Mike Bostock]: https://bl.ocks.org/mbostock/4063318
[Resuable Calendar Heatmap]: http://bl.ocks.org/eesur/5fbda7f410d31da35e42
[Heatmap with key]: https://bl.ocks.org/alansmithy/6fd2625d3ba2b6c9ad48
[Vertical heatmap]: https://bl.ocks.org/danbjoseph/13d9365450c27ed3bf5a568721296dcc
[Alternative Calendar View]: http://bl.ocks.org/KathyZ/c2d4694c953419e0509b
