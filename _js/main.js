'use strict';

var ArrowIcon = require('./ArrowIcon');
var EndIcon = require('./EndIcon');
var HandIcon = require('./HandIcon');
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

  _.delay(ArrowIcon.show, 1000);

  // Mailbox scene
  new ScrollScene({
        triggerElement: '#app-card--mailbox',
        triggerOffset: 135,
        downCallback: HandIcon.show,
        upCallback: HandIcon.hide
      })
      .addTo(ScrollDispatcher);

  // End icon scene
  new ScrollScene({
        triggerElement: '#app-icon--end',
        triggerHook: 'onEnter',
        downCallback: function() {
          EndIcon.show();
          ArrowIcon.hide();

          $('#app-string--sf').addClass('reveal');

          _.delay(function() {
            $('#app-string--heart').addClass('reveal');
          }, 100);

          _.delay(function() {
            $('#app-string--happy').addClass('reveal');
          }, 200);
        },
        upCallback: function() {
          EndIcon.hide();
          ArrowIcon.show();
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

  ArrowIcon.init();
  EndIcon.init();
  HandIcon.init();
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

function updateObfuscator(ratioFromBottom) {
  $('.app-bg-obfuscator').css({
    opacity: OBFUSCATOR_OPACITY * ratioFromBottom
  });
}
