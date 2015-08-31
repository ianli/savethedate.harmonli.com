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

}

function show() {
  $('#app-string--sf').addClass('reveal');

  _.delay(function() {
    $('#app-string--heart').addClass('reveal');
  }, 100);

  _.delay(function() {
    $('#app-string--happy').addClass('reveal');
  }, 200);
}

function hide() {
  $('#app-string--happy').removeClass('reveal');

  _.delay(function() {
    $('#app-string--heart').removeClass('reveal');
  }, 100);

  _.delay(function() {
    $('#app-string--sf').removeClass('reveal');
  }, 200);
}

module.exports = HangingIcons;
