'use strict';

// Import Lodash.js functions individually.
var _ = {};
_.assign = require('lodash.assign');

var HangingIcons = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('.app-string')
    .css({
      top: -$(window).height() / 2
    })
    .show();
}

function show() {
  var props = {
    top: 0
  };

  var options = {
    duration: 500,
    easing: [120, 15]
  };

  $('#app-string--sf')
      .velocity(props, options);

  $('#app-string--heart')
      .velocity(props, _.assign(options, { delay: 100 }));

  $('#app-string--happy')
      .velocity(props, _.assign(options, { delay: 200 }));
}

function hide() {
  var props = {
    top: -$(window).height() / 2
  };

  var options = {
    duration: 200,
    easing: [120, 15]
  };

  $('#app-string--happy')
      .velocity(props, options);

  $('#app-string--heart')
      .velocity(props, _.assign(options, { delay: 100 }));

  $('#app-string--sf')
      .velocity(props, _.assign(options, { delay: 200 }));
}

module.exports = HangingIcons;
