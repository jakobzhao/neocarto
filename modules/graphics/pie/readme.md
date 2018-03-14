# Pie Chart

![image](assets/image.svg)

A pie chart is divided into sectors, illustrating numerical proportion. In a pie chart, the arc length of each sector (and consequently its central angle and area), is proportional to the quantity it represents. While it is named for its resemblance to a pie which has been sliced, there are variations on the way it can be presented.


[Live Demo](http://geoviz.ceoas.oregonstate.edu/neocarto/modules/graphics/pie/index.html)

[More info](http://datavizproject.com/data-type/pie-chart/)

```html
<!DOCTYPE html>
<html lang="en">

<head> 
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <link rel="stylesheet" href="css/billboard.css">
    <script src="js/billboard.js"></script>    
</head>
<body>
    <div id="PieChart"></div>
   <script>
var chart = bb.generate({
  data: {
    columns: [
    ["data1", 15],
    ["data2", 56],
    ["data3", 32],
    ["data4", 44]
    ],
    type: "pie",
    onclick: function (d, i) { console.log("onclick", d, i); },
    onover: function (d, i) { console.log("onover", d, i); },
    onout: function (d, i) { console.log("onout", d, i); }
    },       
    pie: {
        title: "Pie Chart"
    },
    bindto: "#PieChart"
    });

    chart.data.colors({
    data4: "#FF753A",
    data1: "#EAA000",
    data2: "#FFC750",
    data3: "#DC4405",
    });

    </script>
</body>

</html>
```
