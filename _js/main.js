'use strict';

var ScrollDispatcher = require('./ScrollDispatcher');
var ScrollScene = require('./ScrollScene');

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');
_.throttle = require('lodash.throttle');

var OBFUSCATOR_OPACITY = 0.7;

$(document).ready(function() {
  initialize();

  _.delay(function() {
    revealSaveTheDateCard();
  }, 500);

  _.delay(function() {
    slideUpArrowIcon();
    subtlyAnimateArrowIcon();
  }, 1000);

  // Mailbox scene
  new ScrollScene({
        triggerElement: '#app-card--mailbox',
        triggerOffset: 135,
        downCallback: function() {
          $('#app-icon--hand')
            .velocity(
              {
                bottom: -40
              },
              {
                duration: 500,
                easing: [150, 15]
              }
            );
        },
        upCallback: function() {
          $('#app-icon--hand')
            .velocity(
              {
                bottom: -500
              },
              {
                duration: 500,
                easing: [150, 15]
              }
            );
        }
      })
      .addTo(ScrollDispatcher);

  // End icon scene
  new ScrollScene({
        triggerElement: '#app-icon--end',
        triggerHook: 'onEnter',
        downCallback: function() {
          hideArrowIcon();
          revealEndIcon();
          $('#app-string--sf').addClass('reveal');

          _.delay(function() {
            $('#app-string--heart').addClass('reveal');
          }, 100);

          _.delay(function() {
            $('#app-string--happy').addClass('reveal');
          }, 200);
        },
        upCallback: function() {
          hideEndIcon();
          slideUpArrowIcon();
          subtlyAnimateArrowIcon();
          $('#app-string--happy').removeClass('reveal');

          _.delay(function() {
            $('#app-string--heart').removeClass('reveal');
          }, 100);

          _.delay(function() {
            $('#app-string--sf').removeClass('reveal');
          }, 200);
        }
      })
      .addTo(ScrollDispatcher);

  $(window).scroll(_.throttle(function() {
    var windowHeight = $(window).height();
    var scrollHeight = $(document.body).prop('scrollHeight');
    var scrollTop = $(document.body).scrollTop();

    var ratioFromBottom = 1 - (scrollTop / (scrollHeight - windowHeight));

    updateObfuscator(ratioFromBottom);
  }, 100));
});

/**
 * Sets the initial states of elements.
 */
function initialize() {
  // Make sure that we're scrolled to the top.
  $(document.body).scrollTop(0);

  // Save the Date card is outside of the viewport.
  $('#app-card--savethedate').css({
    top: $(window).height() + 10
  });

  // Arrow icon is outside of the viewport.
  var $appIconDown = $('#app-icon--arrow');
  $appIconDown.css({
    bottom: -($appIconDown.height() + 10)
  })
  .show();
}

function revealSaveTheDateCard() {
  $('.app-bg-obfuscator')
      .velocity({
        opacity: OBFUSCATOR_OPACITY
      }, {
        duration: 500
      });

  var $postcard = $('#app-card--savethedate');

  // Compute the offset so that the card is in the middle of screen.
  var offset = ($(window).height() - $postcard.height()) / 2;

  // Offset is never smaller than the minimum offset.
  if (offset < 100) {
    offset = 100;
  }

  $postcard
      .velocity({
        // Custom spring physics.
        top: [offset, [120, 13]],
        opacity: 1
      }, {
        duration: 500
      });
}

function slideUpArrowIcon() {
  $('#app-icon--arrow')
      .velocity(
        { bottom: [24, [200, 15]] },
        // duration
        500
      );
}

function subtlyAnimateArrowIcon() {
  $('#app-icon--arrow')
      .velocity(
        {
          bottom: [-8, 'ease-out']
        },
        {
          duration: 1000,
          loop: true
        }
      );
}

function hideArrowIcon() {
  $('#app-icon--arrow')
      .velocity('stop')
      .velocity(
        {
          bottom: [24, [200, 15]]
        },
        100
      )
      .velocity(
        {
          bottom: [-100, [200, 15]]
        },
        500
      );
}

function revealEndIcon() {
  $('#app-icon--end')
      .velocity({
        opacity: 1
      }, {
        duration: 500
      });
}

function hideEndIcon() {
  $('#app-icon-end')
      .velocity({
        opacity: 0
      },
      // duration
      500);
}

function updateObfuscator(ratioFromBottom) {
  $('.app-bg-obfuscator').css({
    opacity: OBFUSCATOR_OPACITY * ratioFromBottom
  });
}
