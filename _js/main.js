'use strict';

var ArrowIcon = require('./ArrowIcon');
var Dolphin = require('./Dolphin');
var EndIcon = require('./EndIcon');
var HandIcon = require('./HandIcon');
var SaveTheDateCard = require('./SaveTheDateCard');
var ScrollDispatcher = require('./ScrollDispatcher');
var ScrollScene = require('./ScrollScene');
var SimpleScrollScene = require('./SimpleScrollScene');

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');

var OBFUSCATOR_OPACITY = 0.7;

// Force the location hash to be 'savethedate', so the URL is
// http://www.harmonli.com/#savethedate
// In the case that we move this page, we can check the hash information
// to know if we need to redirect to the new URL of this page.
if (location.hash != 'savethedate') {
  location.hash = 'savethedate';
}

$(document).ready(function() {
  // Make sure that we're scrolled to the top.
  $(document.body).scrollTop(0);

  //
  // Scene 1
  // - Arrow icon
  // - Save the date card
  //

  ArrowIcon.init();
  SaveTheDateCard.init();

  _.delay(function() {
    $('.app-bg-obfuscator')
        .velocity({
          opacity: OBFUSCATOR_OPACITY
        }, {
          duration: 500
        });

    SaveTheDateCard.show();
  }, 500);

  _.delay(ArrowIcon.show, 1000);

  //
  // Scene 2
  // - 

  HandIcon.init();
  HandIcon.show();

  //
  // Scene 3
  // - Dolphin
  // - End icon
  //

  Dolphin.init();
  EndIcon.init();

  // Dolphin
  $('#app-icon--end').on('click', function() {
    Dolphin.toggle();
  });

  // End icon
  new ScrollScene({
        triggerElement: '#app-icon--end',
        triggerHook: 'onEnter',
        downCallback: function() {
          EndIcon.show();
          ArrowIcon.hide();
        },
        upCallback: function() {
          EndIcon.hide();
          ArrowIcon.show();
        }
      })
      .addTo(ScrollDispatcher);

  if ($(document).width() > 768) {
    setupForDesktopScreen();
  }
});

/**
 * Setup for desktop screens.
 */
function setupForDesktopScreen() {
  // Coaster animation
  new SimpleScrollScene({
        onScroll: function(scrollInfo) {
          var windowHeight = scrollInfo.windowHeight;
          var scrollHeight = scrollInfo.scrollHeight;
          var scrollTop = scrollInfo.scrollTop;
          var $section = $('#app-section-3');
          var sectionTop = $section.offset().top;
          var sectionHeight = $section.height();

          var ratio = ((scrollTop + windowHeight) - sectionTop) / sectionHeight;

          if (ratio >= 0) {
            $('#app-card--coaster').css({
              transform: 'scale(' + ratio + ') rotate(' + (ratio * 360) + 'deg)'
            });
          }
        }
      })
      .addTo(ScrollDispatcher);

  // Simple scene that changes the opacity of the obfuscator.
  new SimpleScrollScene({
        onScroll: function(scrollInfo) {
          var windowHeight = scrollInfo.windowHeight;
          var scrollHeight = scrollInfo.scrollHeight;
          var scrollTop = scrollInfo.scrollTop;

          var ratioFromBottom = 1 - (scrollTop / (scrollHeight - windowHeight));

          $('.app-bg-obfuscator').css({
            opacity: OBFUSCATOR_OPACITY * ratioFromBottom
          });
        }
      })
      .addTo(ScrollDispatcher);
}
