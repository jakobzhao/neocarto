### polar layout ###
polar = () ->
  # defaults
  #scale = d3.scale.linear
  angle = null
  
  self = (data) ->
    angle = 2*Math.PI/data.length
    
    data.forEach (d, i) ->
      d.angle = i * angle
      
    return data
  
  self.angle = () ->
    return angle
  
  return self
    
### --- ###

csv = '''
category,value
one,323
two,534
three,230
four,156
five,336
'''

data = d3.csv.parse csv
data.forEach (d) ->  d.value = +d.value

max = d3.max(data, (d) -> d.value)

width = 960
height = 500
RADIUS = Math.min(width, height) / 2 - 40


polar_layout = polar()
polar_data = polar_layout(data)
console.log polar_data

svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr
      transform: "translate(#{width/2}, #{height/2})"

color = d3.scale.ordinal()
  .range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"])
      
arc_generator = d3.svg.arc()
  .innerRadius(0)
  .outerRadius((d) -> RADIUS/max*d.value)
  .startAngle((d) -> d.angle - polar_layout.angle()/2)
  .endAngle((d) -> d.angle + polar_layout.angle()/2)

svg.selectAll('.arc')
    .data(polar_data)
  .enter().append('path')
    .attr
      class: 'arc'
      d: arc_generator
      fill: (d, i) -> color(i)
      