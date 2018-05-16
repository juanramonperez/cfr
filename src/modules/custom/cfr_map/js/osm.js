/**
 * @file
 * JS for adding markers on a Google Map.
 */

(function ($, Drupal, settings, _) {
  'use strict';

  /**
   * Show markers on the map.
   */
  Drupal.behaviors.openStreetMap = {
    attach: function (context, settings) {
      $('.open-street-map', context).once('open-street-map').each(function (index, element) {
        // Create map.
        var map = new OpenLayers.Map('osm');
        map.addLayer(new OpenLayers.Layer.OSM());
        // Add markers layer.
        var markers = new OpenLayers.Layer.Markers('Markers');
        map.addLayer(markers);
        // Get markers from service.
        $.ajax({
          type: 'get',
          url: settings.cfr_map.markers_url,
          success: function (response) {
            // Set first element as center.
            var first = _.first(response);
            // First marker.
            var marker = new OpenLayers.LonLat(first.longitude, first.latitude).transform(
              new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
              map.getProjectionObject() // to Spherical Mercator Projection
            );
            // Set center
            map.setCenter(marker, 5);
            // Add markers.
            $.each(response, function(index, marker) {
              var markerOSM = new OpenLayers.LonLat(marker.longitude, marker.latitude).transform(
                new OpenLayers.Projection("EPSG:4326"),
                map.getProjectionObject()
              );
              // Add marker to the map.
              markers.addMarker(new OpenLayers.Marker(markerOSM));
            });
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings, _);
