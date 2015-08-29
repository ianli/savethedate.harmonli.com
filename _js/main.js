'use strict';

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
    revealDownIcon();
  }, 900);

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

  $('#app-card--savethedate').css({
    top: $(window).height() + 10
  });

  var $appIconDown = $('#app-icon--down');
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

function revealDownIcon() {
  $('#app-icon--down')
      .velocity({
        bottom: [32, [200, 15]],
      },
      500, // duration
      function() {
        subtlyMoveDownIcon();
      });
}

function subtlyMoveDownIcon() {
  $('#app-icon--down')
    .velocity({
      marginBottom: ['-10px', 'ease-in']
    }, {
      duration: 1000,
      loop: true
    });
}

function updateObfuscator(ratioFromBottom) {
  $('.app-bg-obfuscator').css({
    opacity: OBFUSCATOR_OPACITY * ratioFromBottom
  });
}
