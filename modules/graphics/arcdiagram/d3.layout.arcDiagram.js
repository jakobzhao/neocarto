(function() {
    d3.layout.arcDiagram = function() {
      var directed = true,
        size = [1,1],
        nodes = [],
        edges = [],
        edgeWeight = function (d) {return 1},
        nodeID = function (d) {return d.id};
  
      function arcDiagram() {
        var width = size[0],
        height = size[1],
        nodeStep = width / nodes.length,
        nodeHeight = height / nodes.length,
        constructedMatrix = [],
        matrix = [],
        edgeHash = {},
        nodeHash = {};
  
        nodes.forEach(function (node, i) {
          nodeHash[nodeID(node)] = node;
          node.x = i * nodeStep;
          node.y = size[1];
        })
  
        edges.forEach(function(edge) {
          if (typeof edge.source === "number") {
            edge.source = nodes[edge.source];
          }
          if (typeof edge.target === "number") {
            edge.target = nodes[edge.target];
          }
          var id = nodeID(edge.source) + "-" + nodeID(edge.target);
  
          if (!edgeHash[id]) {
            edgeHash[id] = edge;
          }
          else {
            edgeHash[id].weight = edgeHash[id].weight + edgeWeight(edge);
          }
        });
  
        return arcDiagram;
      }
  
      arcDiagram.directed = function(x) {
        if (!arguments.length) return directed;
        directed = x;
        return arcDiagram;
      }
  
      arcDiagram.size = function(x) {
        if (!arguments.length) return size;
        size = x;
        return arcDiagram;
      }
  
      arcDiagram.nodes = function(x) {
        if (!arguments.length) return nodes;
        nodes = x;
        return arcDiagram;
      }
  
      arcDiagram.links = function(x) {
        if (!arguments.length) return edges;
        edges = x;
        return arcDiagram;
      }
  
      arcDiagram.edgeWeight = function(x) {
        if (!arguments.length) return edgeWeight;
        if (typeof x === "function") {
          edgeWeight = x;
        }
        else {
          edgeWeight = function () {return x};
        }
        return arcDiagram;
      }
  
      arcDiagram.nodeID = function(x) {
        if (!arguments.length) return nodeID;
        if (typeof x === "function") {
          nodeID = x;
        }
        return arcDiagram;
      }
  
      arcDiagram.arc = function (d) {
  
          var draw = d3.svg.line().interpolate("basis");
          var midX = (d.source.x + d.target.x) / 2; //
          var midPercent = Math.abs(((d.source.x - d.target.x) / size[0]));
  
          var midY = size[1] + (midPercent * size[1]);
          if (d.source.x > d.target.x) {
            var midY = size[1] - (midPercent * size[1]);
          }
  
          return draw([[d.source.x,d.source.y],[midX,midY],[d.target.x,d.target.y]])
      }
  
  
      return arcDiagram;
    }
  
  })();