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
        // Get DOM object.
        var container = $(element)[0];
        // Create map.
        var map = new google.maps.Map(container, {zoom: 5});
        // Get markers from service.
        $.ajax({
          type: 'get',
          url: settings.cfr_map.markers_url,
          success: function (response) {
            // Set first element as center.
            var first = _.first(response);
            // Set center.
            map.setCenter(new google.maps.LatLng(first.latitude, first.longitude));
            // Add markers.
            $.each(response, function(index, marker) {
              var position = new google.maps.LatLng(marker.latitude, marker.longitude);
              var gMarker = new google.maps.Marker({
                position: position,
                title: marker.title,
              });
              // Add marker to the map.
              gMarker.setMap(map);
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
