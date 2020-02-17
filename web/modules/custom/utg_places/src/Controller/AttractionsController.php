<?php

namespace Drupal\utg_places\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class AttractionsController.
 */
class AttractionsController extends ControllerBase {

  /**
   * Attractions.
   *
   * @return string
   *   Return Hello string.
   */
  public function content() {
    return [
      '#theme' => 'utg_attractions',
    ];
  }

}
