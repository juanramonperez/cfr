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
    $build['markup'] = [
      '#type' => 'markup',
      '#markup' => '<div class="open-street-map"></div>'
    ];
    return $build;
  }

}
