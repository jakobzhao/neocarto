# Bar Chart

![image](assets/image.svg)

A bar chart is a chart with rectangular bars with lengths proportional to the values that they represent.  One axis of the chart shows the specific categories being compared, and the other axis represents a discrete value.

Bar charts provide a visual presentation of categorical data. Categorical data is a grouping of data into discrete groups, such as months of the year, age group, shoe sizes, and animals. These categories are usually qualitative. Bars on the chart may be arranged in any order.

[Live Demo](http://geoviz.ceoas.oregonstate.edu/neocarto/modules/graphics/bar/index.html)


    <!DOCTYPE html>
    <html lang="en">
    
    <head> 
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <link rel="stylesheet" href="css/billboard.css">
        <script src="js/billboard.js"></script>    
    </head>
    <body>
        <div id="BarChart"></div>
       <script>
    var chart = bb.generate({
      data: {
        columns: [
    	["data1", 15,55, 135, 156, 145, 84, 61, 10]
        ],
        type: "bar",
        onclick: function (d, i) { console.log("onclick", d, i); },
        onover: function (d, i) { console.log("onover", d, i); },
        onout: function (d, i) { console.log("onout", d, i); }
        },       
        bar: {width: {
          ratio: 0.6,
         
        },
            title: "Bar Chart"
        },
        bindto: "#BarChart"
        });
    
        chart.data.colors({
        data1: "#EAA000"
        });
    
        </script>
    </body>
    
    </html>


[More info](http://datavizproject.com/data-type/bar-chart/)