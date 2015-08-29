'use strict';

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');
_.throttle = require('lodash.throttle');

/**
 * ScrollDispatcher has a collection of scenes that are triggered
 * when the user scrolls.
 */
var ScrollDispatcher = function() {
  var self = this;

  self.scenes = [];

  var lastScrollTop = 0;

  $(document).ready(function() {
    $(window).scroll(_.throttle(function() {
      var currScrollTop = $(document.body).scrollTop();

      var scrollInfo = {
        windowHeight: $(window).height(),
        scrollHeight: $(document.body).prop('scrollHeight'),
        scrollTop: currScrollTop
      };

      if (currScrollTop > lastScrollTop) {
        scrollInfo.direction = 'down';
      } else {
        scrollInfo.direction = 'up';
      }

      lastScrollTop = currScrollTop;

      for (var i = 0, n = self.scenes.length; i < n; i++) {
        var scene = self.scenes[i];
        scene.trigger(scrollInfo);
      }
    }));
  });
};

/**
 * Adds the scene to the list of scenes.
 *
 * @param {ScrollScene} scene The ScrollScene object to add
 */
ScrollDispatcher.prototype.addScene = function(scene) {
  this.scenes.push(scene);
};

module.exports = new ScrollDispatcher();
