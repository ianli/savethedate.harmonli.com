'use strict';

var HandIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('#app-icon--hand')
      .css({
        scale: 1
      });
}

function show() {
  $('#app-icon--hand')
      .velocity('stop', true)
      .velocity(
        {
          scale: 1.2
        },
        {
          duration: 1000,
          easing: 'ease-out',
          loop: true
        }
      );
}

function hide() {
  $('#app-icon--hand')
      .velocity('stop', true);
}

module.exports = HandIcon;