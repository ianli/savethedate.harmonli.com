'use strict';

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');

var HangingIcons = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('.app-string')
    .css({

    });
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

  _.delay(function() {
    $('#app-string--heart')
        .velocity(props, options);
  }, 100);

  _.delay(function() {
    $('#app-string--happy')
        .velocity(props, options);
  }, 200);
}

function hide() {
  var props = {
    top: -$(window).height() / 2
  };

  var options = {
    duration: 200
  };

  $('#app-string--happy')
      .velocity(props, options);

  _.delay(function() {
    $('#app-string--heart')
        .velocity(props, options);
  }, 100);

  _.delay(function() {
    $('#app-string--sf')
        .velocity(props, options);
  }, 200);
}

module.exports = HangingIcons;
