/* polar layout
*/


(function() {
    var RADIUS, arc_generator, color, csv, data, height, max, polar, polar_data, polar_layout, svg, width;
  
    polar = function() {
      var angle, self;
  
      angle = null;
      self = function(data) {
        angle = 2 * Math.PI / data.length;
        data.forEach(function(d, i) {
          return d.angle = i * angle;
        });
        return data;
      };
      self.angle = function() {
        return angle;
      };
      return self;
    };
  
    /* ---
    */
  
  
    csv = 'category,value\none,323\ntwo,534\nthree,230\nfour,156\nfive,336';
  
    data = d3.csv.parse(csv);
  
    data.forEach(function(d) {
      return d.value = +d.value;
    });
  
    max = d3.max(data, function(d) {
      return d.value;
    });
  
    width = 960;
  
    height = 500;
  
    RADIUS = Math.min(width, height) / 2 - 40;
  
    polar_layout = polar();
  
    polar_data = polar_layout(data);
  
    console.log(polar_data);
  
    svg = d3.select("body").append("svg").attr("width", width).attr("height", height).append("g").attr({
      transform: "translate(" + (width / 2) + ", " + (height / 2) + ")"
    });
  
    color = d3.scale.ordinal().range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"]);
  
    arc_generator = d3.svg.arc().innerRadius(0).outerRadius(function(d) {
      return RADIUS / max * d.value;
    }).startAngle(function(d) {
      return d.angle - polar_layout.angle() / 2;
    }).endAngle(function(d) {
      return d.angle + polar_layout.angle() / 2;
    });
  
    svg.selectAll('.arc').data(polar_data).enter().append('path').attr({
      "class": 'arc',
      d: arc_generator,
      fill: function(d, i) {
        return color(i);
      }
    });
  
  }).call(this);
  