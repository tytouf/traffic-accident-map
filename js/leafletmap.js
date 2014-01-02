var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {
  // set up the map
  map = new L.Map('map');
  map.crs = L.CRS.EPSG3857
  //map.crs = L.CRS.EPSG4326
  //map.crs = L.CRS.EPSG3395

  // create the tile layer with correct attribution
  //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  // Use same tiles than used by layers.openstreetmap.fr
  var osmUrl='http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png';
  var osmAttrib='Map data © OpenStreetMap contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom: 16, attribution: osmAttrib});		

  // start the map in Vannes
  map.setView(new L.LatLng(47.66, -2.75), 9);
  map.addLayer(osm);

}

