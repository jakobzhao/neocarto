// Create the Leaflet map object to place inside the Map div (id="map")
var map = L.map("map");

// Assign a Leaflet Tile Layer Basemap from CartoDB, Mapbox, etc.
var url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png';  // replace the URL with a basemap of your choosing
L.tileLayer(url, {
    attribution: 'CartoDB', // attribute the source of your basemap
    maxZoom: 10,  // set the max zoom level
    minZoom: 5  // set the min zoom level
}).addTo(map);  // add the base map to the Leaflet map object

// Bounding Box
var corner1 = L.latLng(48, -130.5),
    corner2 = L.latLng(38, -120.5),
    bounds = L.latLngBounds(corner1, corner2);
map.fitBounds(bounds);  // fit the map bounds to the bounding box specified

// ScalarField derived from a Vectorfield (from IHCantabria Leaflet.CanvasLayer.Field)
d3.text('assets/arag_2050_07_u.asc', function (u) { // add the U data in ASCIIGrid (.asc) format
    d3.text('assets/arag_2050_07_v.asc', function (v) { // add the V data in ASCIIGrid (.asc) format (if you want to see a flowing example, replace the V data with the v data (arag_2050_07_v_original.asc)
        var toMetersPerSecond = 0.5; // coefficient multiplied with the U and V data to determine the speed (magnitude) of the animated vector field; larger coefficient result in faster animation speeds (larger magnitudes), smaller coefficient (i.e. decimals) result in slower animation speeds (smaller magnitudes); **This number may need to be modified to normalize the data values as close to their original values as possible. A coefficient very large will overstate the data values, and a small coefficient may understate the data values** Original example was 0.001
        var vf = L.VectorField.fromASCIIGrids(u, v, toMetersPerSecond);  // create the vector field

        // a) First derived field: Magnitude (m/s, or Omega aragonite saturation state)
        var s = vf.getScalarField('magnitude');  // << derived ScalarField
        // custom scale, based on 'earth.nullschool.net' (example:  https://earth.nullschool.net/#current/ocean/surface/currents/overlay=currents/equirectangular=-11.95,29.62,1112)
        var magnitude = L.canvasLayer.scalarField(s, {
            color: chroma.scale(
                ['#E0631D', '#E0631D', '#A5BF15', '#FFFFFF', '#C9F5F6'], [1.0, 1.4, 1.8, 2.2, 2.6]  // set color scale and break points for styling of magnitude layer
            ),
            opacity: 0.75 // 1 will block view of animation if magnitude layer is selected and brought to the front of the map object
        }).addTo(map);  // addTo(map) displays the layer on page-load vs. removing it keeps the layer off the map until the check-box is selected in the Leaflet layer control (see direction layer below for example)

        // b) Second derived field: DirectionFrom (º): (0 to 360º) | N is 0º and E is 90º
        var direction = L.canvasLayer.scalarField(
            vf.getScalarField('directionFrom'), {
                type: 'vector',
                color: '#DCDBDB',  // set color of direction arrows
                vectorSize: 20,  // set the size of the direction arrows
                arrowDirection: 'from'
            });

        // Animation field
        var animation = L.canvasLayer.vectorFieldAnim(vf, {
            id: "canvas",
            paths: 5000,  // set the number of concurrent animations; 1 is one movement animated at a time, 5000 is five thousand movements animated at a time
            fade: 0.97, // 0 animates sharp point movements with no line visible; 1 animates streamlike paths with an always-visible line; anything between 0 and 1 creates a line that fades away after the animation movement
            maxAge: 100,  // how many milliseconds should the animated movement last from start to end points
            velocityScale: 1 / 50,  // a velocityScale of 1 results in a crazy fast animation speed, and a velocityScale of 0 results in no animation whatsoever (no velocity) -- therefore, set velocityScale to a fraction value instead (i.e. 1 / 200). A fraction closer to 1 (i.e. smaller denominator; e.g. 1 / 50) will be faster than a fraction closer to 0 (i.e. larger denominator; e.g. 1 / 200)
            color: 'rgba(255, 255, 255, 0.7)'  // set color and opacity of animation
        }).addTo(map);

        // Leaflet layer control - for toggling between views of animation, magnitude, and direction layers
        L.control.layers({}, {
            "Vector animation": animation,
            "Derived magnitude": magnitude,
            "Derived direction": direction,
        }, {
            position: 'topright',  // change to your preference
            collapsed: true  // false always displays check-boxes for the animation, magnitude, and direction layers; true creates a layer-selector icon which hides these check-boxes until hovered over or clicked on
        }).addTo(map);

        // define legend
        var legend = L.control({position: 'bottomright'});
        // set legend color scale and breaks
        legend.onAdd = function () {
            var div = L.DomUtil.create('div', 'legend legend-colors');
            div.innerHTML += '<b>Projected &Omega;<sub>ar</sub> Saturation State in July 2050</b><br><br>';
            div.innerHTML += '<i style="background: ' + '#E0631D' + '; opacity: 1"></i><p>Below 1.4</p><br>';
            div.innerHTML += '<i style="background: ' + '#A5BF15' + '; opacity: 1"></i><p>1.4 - 1.8</p><br>';
            div.innerHTML += '<i style="background: ' + '#ffffff' + '; opacity: 1"></i><p>1.8 - 2.2</p><br>';
            div.innerHTML += '<i style="background: ' + '#C9F5F6' + '; opacity: 1"></i><p>2.2 - 2.6</p>';
            return div;
        };

        legend.addTo(map);

        // create a popup displaying magnitude values when a pixel is clicked
        magnitude.on('click', function (e) {
            if (e.value !== null) {
                var v = e.value.toFixed(2);
                var html = (`<span class="popupText">magnitude: ${v*2} &Omega; <sub>ar</sub></span>`); // multiply value by 2 to compensate for toMetersPerSecond 0.5
                var popup = L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
            }
        });

        // create a popup displaying direction values when a pixel is clicked
        direction.on('click', function (e) {
            if (e.value !== null) {
                var v = e.value.toFixed(0);
                var html = (`<span class="popupText">direction: ${v}&deg;</span>`);
                var popup = L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
            }
        });
    });
});
