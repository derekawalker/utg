(function($, Drupal) {
  'use strict';
  $(document).ready(function() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1.5
        },
        480: {
          items: 2.5
        },
        768: {
          items: 3.5
        }
      }
    });
  });
})(jQuery, Drupal);
