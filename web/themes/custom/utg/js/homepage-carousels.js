(function($, Drupal) {
  'use strict';
  $(document).ready(function() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1.5
        },
        375: {
          items: 2.5
        },
        768: {
          items: 3.5
        }
      }
    });
  });
})(jQuery, Drupal);
