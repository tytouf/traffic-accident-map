var group;
var ajax_requests = 0;
var accidents = [];
var lat_min = 100;
var lat_max = 0;
var lng_min = 100;
var lng_max = 0;

function initAccidents() {
  group = new L.LayerGroup();
  map.addLayer(group);
  map.on('viewreset', function(e) {
    reqLoadAccidents();
  });
  map.on('moveend', function(e) {
    reqLoadAccidents();
  });
  reqLoadAccidents();
}

function reqLoadAccidents() {
  bounds = map.getBounds();
  ll = bounds.getSouthWest();
  lat_min = Math.floor(ll.lat);
  lng_min = Math.floor(ll.lng);
  ll = bounds.getNorthEast();
  lat_max = Math.ceil(ll.lat);
  lng_max = Math.ceil(ll.lng);

  accidents = [];

  for (i = lat_min; i <= lat_max; i++) {
    for (j = lng_min; j <= lng_max; j++) {
      ajax_requests++;
      $.ajax({
        url: 'data/accidents.' + i + '.' + j + '.json',
        cache: true,
        dataType: 'json',
        error: function(data) {
                 $('#error').html('Could not load data file.'+lat_max+', '+lng_min);
               },
        success: function(data) {
                 ajax_requests--;
                 accidents.push.apply(accidents, data['accidents']);
                 loadAccidents();
               }
           });
    }
  }
}

function loadAccidents() {
  if (ajax_requests != 0) {
    return;
  }
  group.clearLayers();
  bounds = map.getBounds();
  n = (new Date()).getTime();
  count = 0;
  for(i = 0; i < accidents.length; i++) {
    acc = accidents[i];
    if (acc.lat) {
      acc.latlng = new L.LatLng(acc.lat, acc.lng);
      if (bounds.contains(acc.latlng)) {
        var marker = new L.Circle(acc.latlng, 4, {color: acc.grv, opacity: 0.7});
        group.addLayer(marker);
        count++;
      }
    }
  }
  n = (new Date()).getTime() - n;
  $('#stats').html(count + ' accidents en ' + n / 1000.0 + ' secondes');
}

