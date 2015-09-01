'use strict';

/**
 * SimpleScrollScene represents a scene that is triggered anytime
 * the user scrolls.
 *
 * @param {object} options - Options for triggering the scene.
 * @param {function} options.onScroll - Function to call when the user scrolls.
 */
var SimpleScrollScene = function(options) {
  this.onScroll = options.onScroll || function() {};
};

/**
 * Called by ScrollDispatcher to indicate that a scroll happened.
 *
 * @param {object} scrollInfo An object with the following attributes:
 *                 - windowHeight
 *                 - scrollHeight
 *                 - direction
 *                 - scrollTop
 */
SimpleScrollScene.prototype.trigger = function(scrollInfo) {
  this.onScroll(scrollInfo);
};

/**
 * Adds this scene to the given dispatcher. These two are equivalent:
 *
 *   scene.addTo(ScrollDispatcher);
 *   ScrollDispatcher.addScene(scene);
 *
 * @param {ScrollDispatcher} dispatcher The dispatcher to add this scene to.
 */
SimpleScrollScene.prototype.addTo = function(dispatcher) {
  dispatcher.addScene(this);
};

module.exports = SimpleScrollScene;
