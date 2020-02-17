<?php

namespace Drupal\utg_places\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class RestaurantsController.
 */
class RestaurantsController extends ControllerBase {

  /**
   * Restaurants.
   *
   * @return string
   *   Return Hello string.
   */
  public function content() {
    return [
      '#theme' => 'utg_restaurants',
    ];
  }

}
