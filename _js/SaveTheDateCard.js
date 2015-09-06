'use strict';

var SaveTheDateCard = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  // Save the Date card is outside of the viewport.
  $('#app-card--savethedate').css({
    top: $(window).height() + 10,
    opacity: 0.7
  });
}

function show() {
  var $postcard = $('#app-card--savethedate');

  // Compute the offset so that the card is in the middle of screen.
  var offset = ($(window).height() - $postcard.height()) / 2;

  // Offset is never smaller than the minimum offset.
  if (offset < 20) {
    offset = 20;
  }

  $postcard
      .velocity(
        {
          // Custom spring physics.
          top: [offset, [120, 13]],
          opacity: 1
        },
        {
          duration: 500
        }
      );
}

function hide() {
  // Do not hide.
}

module.exports = SaveTheDateCard;
