'use strict';

var Dolphin = {
  init: init,
  toggle: toggle
};

var dolphinState = 0;
var isAnimating = false;

function init() {
  $('#app-dolphin')
      .velocity(
        {
          rotateZ: -125
        },
        {
          duration: 0
        }
      );
}

function toggle() {
  if (isAnimating)
    return;

  dolphinState = (dolphinState + 1) % 2;
  isAnimating = true;

  $('#app-icon--end').css('cursor', 'default');

  $('#app-dolphin')
      .velocity(
        {
          rotateZ: dolphinState ? 125 : -125
        },
        {
          duration: 2000,
          easing: 'ease-in-out'
        }
      )
      .velocity(
        {
          scaleX: dolphinState ? -1 : 1
        },
        {
          duration: 0,
          complete: function() {
            isAnimating = false;
            $('#app-icon--end').css('cursor', 'pointer');
          }
        }
      );
}

module.exports = Dolphin;
