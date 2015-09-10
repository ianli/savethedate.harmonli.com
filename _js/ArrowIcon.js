'use strict';

var ArrowIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  // Arrow icon is outside of the viewport.
  var $appIconArrow = $('#app-icon--arrow');
  $appIconArrow
    .css({
      bottom: -($appIconArrow.height() + 10)
    })
    .show();

  $appIconArrow.on('click', function() {
    var currScrollTop = $(document.body).scrollTop();
    var windowHeight = $(window).height();
    var arrowPositionY = currScrollTop + windowHeight - 100;
    var $section2 = $('#app-section-2');
    var $section3 = $('#app-section-3');

    if (arrowPositionY < $section2.offset().top) {
      $section2
        .velocity('scroll', {
          duration: 1000,
          offset: 10,
          easing: 'ease-in-out'
        });
    } else if (arrowPositionY < $section3.offset().top) {
      $section3
        .velocity('scroll', {
          duration: 1000,
          offset: 10,
          easing: 'ease-in-out'
        });
    }
  });
}

function show() {
  $('#app-icon--arrow')
      // Stop all previous animation.
      .velocity('stop', true)
      // Slide up.
      .velocity(
        {
          bottom: 24
        },
        {
          duration: 500,
          easing: [200, 15]
        }
      )
      // Loop it moving up and down.
      .velocity(
        {
          bottom: -8
        },
        {
          duration: 1000,
          easing: 'ease-out',
          loop: true
        }
      );
}

function hide() {
  $('#app-icon--arrow')
      // Stop all previous animation.
      .velocity('stop', true)
      // Return to its original position when showing.
      .velocity(
        {
          bottom: 24
        },
        {
          duration: 100,
          easing: [200, 15]
        }
      )
      // Slide down.
      .velocity(
        {
          bottom: -100
        },
        {
          duration: 500,
          easing: [200, 15]
        }
      );
}

module.exports = ArrowIcon;