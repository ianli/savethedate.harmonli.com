'use strict';

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');
_.throttle = require('lodash.throttle');

$(document).ready(function() {
  initialize();

  _.delay(function() {
    reveal();
  }, 500);

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

  $('.app-postcard').css({
    marginTop: $(window).height() + 10,
    scaleX: 0.8,
    scaleY: 1.25
  });
}

function reveal() {
  $('.app-bg-obfuscator')
      .velocity({
        opacity: 0.7
      }, {
        duration: 500
      });

  var $postcard = $('.app-postcard');

  // Compute the offset so that the card is in the middle of screen.
  var offset = ($(window).height() - $postcard.height()) / 2;

  // Offset is never smaller than the minimum offset.
  if (offset < 100) {
    offset = 100;
  }

  $postcard
      .velocity({
        // Custom spring physics.
        marginTop: [offset, [120, 13]],
        opacity: 1
      }, {
        duration: 500
      });
}

function updateObfuscator(ratioFromBottom) {
  $('.app-bg-obfuscator').css({
    opacity: (0.5) * ratioFromBottom
  });
}
