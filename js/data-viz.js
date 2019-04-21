// Leaflet Code Map 2
// Create second map variable 
var map2 = L.map('map2', { zoomControl:false }).setView([34.980061, -79.920941], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 6.45,
	minZoom: 6.45,
	zoomSnap: 1,
	attribution: 'Map data from <a href="https://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html" target="_blank">U.S. Census Bureau</a> + ' + '<a href="https://www.american.edu/spa/ccps/data-sets.cfm" target="_blank">AU School of Public Affairs</a>' ,
	id: 'mapbox.dark'
}).addTo(map2);

console.log("map loaded")

// control that shows state info on hover
var info2 = L.control();

info2.onAdd = function(map2) {
	this._div = L.DomUtil.create('div', 'info2');
	this.update();
	return this._div; 
}
console.log("info function one added")


// Election results + margin of victory
info2.update = function(props) {
	this._div.innerHTML = '<h4>Results</h4>' + (props ? '<h3>' + props.NAME + ' County</h3><br>' + '<h6>Gore: ' + props.demp2000 + '%<br>' + 'Bush: ' + props.gopp2000 + '%<br>' + 'Margin: ' + Math.abs(props.movp2000) + ' pts</h6>'
	:'<br><h5>Hover over a county</h5>');
};

info2.addTo(map2);

// second geojson file

var geojson2 = L.geoJson(Elec00, {style: style}).addTo(map2);
// console.log(geojson2.getLayers().length);
// console.log(Elec00.features.length);
				
function style(feature) {
	return {
	fillColor: getColor(feature.properties.movp2000),
	weight: 1.5,
	opacity: .5,
	color: '#eeeeee',
	fillOpacity: 1
	}
}; 

// add colors to each county
	function getColor(d) {
  	return d > 40 ? '#3c7cc6' :
      d > 20 ? '#81a8d9' :
      d > 0 ? '#c0d4e9' :
      d > -20 ? '#e5c3c3' :
      d > -40 ? '#d48c8b' :
           '#b51f1d' ;
}

// control hover features / colors 
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 5,
		color: '#000',
		dashArray: '',
		fillOpacity: 1.5
	});
				
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
	};

info2.update(layer.feature.properties);
}

function resetHighlight(e) {
	geojson2.resetStyle(e.target);
}

console.log(highlightFeature)

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight
	});
}

var geojson2 = L.geoJson(Elec00, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map2);

var icon = L.Icon.extend({
  options: {
    iconSize:     [10, 10],
    iconAnchor:   [5, 5],
    popupAnchor:  [0, 0]
  }
});

// add points to the map (cities)
var point = new icon({iconUrl: 'img/dot-circle.svg'});
  L.marker([35.2271, -80.8431], {icon: point})
  	.bindTooltip("Charlotte")
   	.openTooltip(map2)
   	.addTo(map2);
  L.marker([35.796, -78.6382], {icon: point})
   	.bindTooltip("Raleigh")
   	.openTooltip(map2)
   	.addTo(map2);
  L.marker([35.5951, -82.5515], {icon: point})
   	.bindTooltip("Asheville")
  	.openTooltip(map2)
  	.addTo(map2);
  L.marker([36.0726, -79.7920], {icon: point})
  	.bindTooltip("Greensboro")
  	.openTooltip(map2)
  	.addTo(map2);

// legend controls 
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [-60, -40, -20, 0, 20, 40],
    labels = ["<b>Margin of Victory (pts)</b>"],
  from, to;
  
  // create the llabel variable for the legend
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
            
  if(grades[i] < 0) {
    party = 'GOP'
  } else {
    party = 'Dem'
  }

  if (grades[i] < -40) {
  	llabel = '(40+)'
  }	else if (grades[i] < -20) {
  	llabel = '(20-40)'
  }	else if (grades[i] < 0) {
  	llabel = '(0-20)'
  }	else if (grades[i] > 40) {
  	llabel = '(0-20)'
  }	else if (grades[i] > 20) {
  	llabel = '(40+)'
  }	else if (grades[i] > 0) {
  	llabel = '(20-40)'
  }

labels.push(
  '<i style="background:' + getColor(from + 1) + '"></i>'+ party + ' ' + llabel);

  }

div.innerHTML = labels.join('<br>');
return div;
};

legend.addTo(map2);

var mapmed2 = L.map('mapmed2', { zoomControl:false }).setView([34.980061, -79.920941], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 5.7,
	minZoom: 5.7,
	zoomSnap: 2,
	attribution: 'Map data from <a href="https://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html" target="_blank">U.S. Census Bureau</a> + ' + '<a href="https://www.american.edu/spa/ccps/data-sets.cfm" target="_blank">AU School of Public Affairs</a>' ,
	id: 'mapbox.dark'
}).addTo(mapmed2);
console.log("map loaded")

// control that shows state info on hover


// second geojson file

var geojson3 = L.geoJson(Elec00, {style: style}).addTo(mapmed2);
// console.log(geojson2.getLayers().length);
// console.log(Elec00.features.length);
				
// function style(feature) {
// 	return {
// 	fillColor: getColor(feature.properties.movp2000),
// 	weight: 1.5,
// 	opacity: .5,
// 	color: '#eeeeee',
// 	fillOpacity: 1
// 	}
// }; 

// // add colors to each county
// 	function getColor(d) {
//   	return d > 40 ? '#3c7cc6' :
//       d > 20 ? '#81a8d9' :
//       d > 0 ? '#c0d4e9' :
//       d > -20 ? '#e5c3c3' :
//       d > -40 ? '#d48c8b' :
//            '#b51f1d' ;
// }

// // control hover features / colors 
// function highlightFeature(e) {
// 	var layer = e.target;
// 	layer.setStyle({
// 		weight: 5,
// 		color: '#000',
// 		dashArray: '',
// 		fillOpacity: 1.5
// 	});
				
// 	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// 			layer.bringToFront();
// 	};

// info2.update(layer.feature.properties);
// }

// function resetHighlight(e) {
// 	geojson3.resetStyle(e.target);
// }

// console.log(highlightFeature)

// function onEachFeature(feature, layer) {
// 	layer.on({
// 		mouseover: highlightFeature,
// 		mouseout: resetHighlight
// 	});
// }

// var geojson3 = L.geoJson(Elec00, {
// 	style: style,
// 	onEachFeature: onEachFeature
// }).addTo(mapmed2);

// var icon = L.Icon.extend({
//   options: {
//     iconSize:     [10, 10],
//     iconAnchor:   [5, 5],
//     popupAnchor:  [0, 0]
//   }
// });

// // add points to the map (cities)
// var point = new icon({iconUrl: 'img/dot-circle.svg'});
//   L.marker([35.2271, -80.8431], {icon: point})
//   	.bindTooltip("Charlotte")
//    	.openTooltip(map2)
//    	.addTo(map2);
//   L.marker([35.796, -78.6382], {icon: point})
//    	.bindTooltip("Raleigh")
//    	.openTooltip(map2)
//    	.addTo(map2);
//   L.marker([35.5951, -82.5515], {icon: point})
//    	.bindTooltip("Asheville")
//   	.openTooltip(map2)
//   	.addTo(map2);
//   L.marker([36.0726, -79.7920], {icon: point})
//   	.bindTooltip("Greensboro")
//   	.openTooltip(map2)
//   	.addTo(map2);

// legend controls 


var htmlObject = info2.getContainer();
// Get the desired parent node.
var a = document.getElementById('info_container2');

function setParent(el, newParent)
{
    newParent.appendChild(el);
}
setParent(htmlObject, a);

var htmlObjectL = legend.getContainer();
// Get the desired parent node.
var b = document.getElementById('legend_container2');

function setParent(el, newParent)
{
    newParent.appendChild(el);
}
setParent(htmlObjectL, b);
