'use strict';

var EndIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('#app-icon--end')
      .css({
        opacity: 0
      });
}

function show() {
  $('#app-icon--end')
      .velocity(
        {
          opacity: 1
        },
        {
          duration: 500
        }
      );
}

function hide() {
  $('#app-icon-end')
      .velocity(
        {
          opacity: 0
        },
        {
          duration: 500
        }
      );
}

module.exports = EndIcon;