'use strict';

// Import Lodash.js functions individually.
var _ = {};
_.throttle = require('lodash.throttle');

/**
 * ScrollDispatcher has a collection of scenes that are triggered
 * when the user scrolls.
 */
var ScrollDispatcher = function() {
  var self = this;

  self.scenes = [];

  var lastScrollTop = -1;

  // How to make faster scroll effects?
  // https://gist.github.com/Warry/4254579
  var scroll = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      null;

  if (scroll) {
    // requestAnimationFrame exists, so call it for the first time.
    scroll(loop);
  } else {
    // requestAnimationFrame doesn't exist,
    // so fallback to scroll events.
    $(document).ready(function() {
      $(window).scroll(_.throttle(dispatch, 100));
    });
  }

  //////////////////////////////
  // FUNCTIONS
  //

  /**
   * Loop using requestAnimationFrame.
   * Calls dispatch when the window has been scrolled.
   */
  function loop() {
    // ScrollTop has changed, so dispatch().
    if (window.pageYOffset != lastScrollTop) {
      dispatch();
      lastScrollTop = window.pageYOffset;
    }

    // Recall the loop.
    scroll(loop);
  }

  /**
   * Calls trigger() on all the scenes associated with this dispatcher.
   */
  function dispatch() {
    var currScrollTop = window.pageYOffset;

    var scrollInfo = {
          windowHeight: $(window).height(),
          scrollHeight: $(document.body).prop('scrollHeight'),
          scrollTop: currScrollTop,
          direction: (currScrollTop > lastScrollTop) ? 'down' : 'up'
        };

    for (var i = 0, n = self.scenes.length; i < n; i++) {
      var scene = self.scenes[i];
      scene.trigger(scrollInfo);
    }
  }
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
