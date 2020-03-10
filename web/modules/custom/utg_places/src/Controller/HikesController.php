<?php

namespace Drupal\utg_places\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class HikesController.
 */
class HikesController extends ControllerBase {

  /**
   * Hikes.
   *
   * @return string
   *   Return Hello string.
   */
  public function content() {
    return [
      '#theme' => 'utg_hikes',
    ];
  }

}
