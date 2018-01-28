function renderWordCloud (dataset,dom_element_to_append_to,type, positiveColorScheme, negativeColorScheme){

    var margin = {top: 20, right: 20, bottom: 20, left: 20};

    var width = $(dom_element_to_append_to).width() - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var maxValue = d3.max(dataset, function(d) { return d.size; });

    var scaleFontSize = d3.scale.linear().domain([ 0, maxValue ]).range([ 16, 48 ]);

    var color = d3.scale.linear()
            .domain([ 0, maxValue ])
            .range(type==1?positiveColorScheme:negativeColorScheme);

    d3.layout.cloud().size([width,height])
            .words(dataset)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select(dom_element_to_append_to).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "wordcloud")
                .append("g")
                .attr("transform", "translate(" + (width/2 ) + "," + (height-margin.top)/2 + ")")
                .attr("class", "gElement") //used to transform the words
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return scaleFontSize(d.size) + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });


/*
        d3.select(dom_element_to_append_to + " svg g")
        .attr("transform","translate(" + (width/2 - $('.gElement')[0].getBoundingClientRect().width/2) + "," + (height*2/3 - $('.gElement')[0].getBoundingClientRect().height/2) + ")")
  */  }
}