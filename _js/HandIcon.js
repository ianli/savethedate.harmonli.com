'use strict';

var HandIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('#app-icon--hand')
      .css({
        bottom: -500
      });
}

function show() {
  $('#app-icon--hand')
      .velocity('stop', true)
      .velocity(
        {
          bottom: -40
        },
        {
          duration: 1000,
          easing: [150, 15]
        }
      );
}

function hide() {
  $('#app-icon--hand')
      .velocity('stop', true)
      .velocity(
        {
          bottom: -500
        },
        {
          duration: 1000,
          easing: [150, 15]
        }
      );
}

module.exports = HandIcon;