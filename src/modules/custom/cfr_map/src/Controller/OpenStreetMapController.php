<?php

namespace Drupal\cfr_map\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Class OpenStreetMapController.
 */
class OpenStreetMapController extends ControllerBase {

  /**
   * View.
   *
   * @return array
   *   Return build array.
   */
  public function view() {
    // Api URL.
    $url = Url::fromUserInput('/api/v.1.0/markers', [
            'query' => ['_format' => 'json']]
           )->toString();
    // Attach the library.
    $build['#attached']['library'][] = 'cfr_map/markers';
    $build['#attached']['drupalSettings']['cfr_map'] = [
      'markers_url' => $url
    ];
    $build['google'] = [
      '#type' => 'markup',
      '#markup' => '<div class="google-map"></div>'
    ];
    $build['osm'] = [
      '#type' => 'markup',
      '#markup' => '<div id="osm" class="open-street-map"></div>'
    ];
    return $build;
  }

}
