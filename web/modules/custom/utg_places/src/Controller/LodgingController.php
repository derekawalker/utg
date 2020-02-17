<?php

namespace Drupal\utg_places\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class LodgingController.
 */
class LodgingController extends ControllerBase {

  /**
   * Lodging.
   *
   * @return string
   *   Return Hello string.
   */
  public function content() {
    return [
      '#theme' => 'utg_lodging',
    ];
  }

}
