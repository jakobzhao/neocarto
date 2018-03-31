var currentDate = '2014-2-10';
var mapWidth = 200;
var mapHeight = 120;

var projection = d3.geo.albersUsa()
    .scale(220)
    .translate([mapWidth / 2, mapHeight / 2]);

var path = d3.geo.path()
    .projection(projection);

var dateFormat = d3.time.format("%B %e");

d3.json("map.geojson", function(error, map) {
var dates_o = {};
map.features.forEach(function(d,i){
    if(!dates_o[d.properties.date]){
        dates_o[d.properties.date] = true;
    }
});
var dates = Object.keys(dates_o);
console.log(dates);
//draw a map for each date
var dateJoin = d3.select('#maps').selectAll('div.map')
    .data(dates);

var divs = dateJoin.enter()
    .append('div').attr({
        'id':function(d){ return 'map_'+d; },
        'class':'map'
    })


    divs.append('p').text(function(d){ return dateFormat(new Date(d)); })

    var SVGs = divs.append('svg').attr({
        'width':mapWidth,
        'height':mapHeight
    });

    SVGs.each(function(date){
        d3.select(this).selectAll('path')
            .data(map.features)
            .enter().append("path")
                .attr({
                    "d":path,
                    "id":function(d){
                        return d.properties.name + date;
                    }
                });
    });

    function update(){
        SVGs.each(function(date){
            var now = new Date(date);
            d3.select(this).selectAll('path')
                .data(map.features)
                    .attr({
                        "class":function(d,i){
                            if(d.properties.date){
                                var stateDate = new Date(d.properties.date);
                                if(stateDate > now){
                                    return 'yet-to-vote';	
                                }else if(stateDate < now){
                                    return 'voted';
                                }
                                return 'voting';
                            }
                            return 'none';
                        }
                    });
        })
    }

    update();

});
