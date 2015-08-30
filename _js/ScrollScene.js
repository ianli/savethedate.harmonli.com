'use strict';

/**
 * ScrollScene represents a scene that is triggered when the user scrolls.
 */
var ScrollScene = function(options) {
  // Selector whose location will trigger the callback.
  this.triggerElement = options.triggerElement;

  // Trigger can happen when the element:
  // - is in the center of the viewport (onCenter) [default]
  // - enters the viewport (onEnter)
  // - leaves the viewport (onLeave)
  this.triggerHook = options.triggerHook || 'onCenter';

  // Offset (in pixels) from the trigger point.
  this.triggerOffset = options.triggerOffset || 0;

  // Called when we reach the triggerElement while scrolling DOWN.
  this.downCallback = options.downCallback || function() {};

  // Called when we reach the triggerElement while scrolling UP.
  this.upCallback = options.upCallback || function() {};

  // Allow triggering down.
  this.allowDownCallback = true;

  // Allow triggering up.
  this.allowUpCallback = false;
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
ScrollScene.prototype.trigger = function(scrollInfo) {
  // The trigger point depends on the location of the element,
  // the elements location in the viewport (onEnter, onCenter, onLeave),
  // and the trigger offset.
  var triggerPoint;
  switch (this.triggerHook) {
    case 'onEnter':
      triggerPoint = $(this.triggerElement).offset().top -
          scrollInfo.windowHeight +
          this.triggerOffset;
    case 'onLeave':
      triggerPoint = $(this.triggerElement).offset().top -
          this.triggerOffset;
      break;
    case 'onCenter':
    default:
      triggerPoint = $(this.triggerElement).offset().top -
          (scrollInfo.windowHeight / 2) +
          this.triggerOffset;
  }

  if (this.allowDownCallback &&
      scrollInfo.direction == 'down' &&
      scrollInfo.scrollTop >= triggerPoint) {
    this.allowDownCallback = false;
    this.allowUpCallback = true;
    this.downCallback();
  }

  if (this.allowUpCallback &&
      scrollInfo.direction == 'up' &&
      scrollInfo.scrollTop <= triggerPoint) {
    this.allowUpCallback = false;
    this.allowDownCallback = true;
    this.upCallback();
  }
};

/**
 * Adds this scene to the given dispatcher. These two are equivalent:
 *
 *   scene.addTo(ScrollDispatcher);
 *   ScrollDispatcher.addScene(scene);
 *
 * @param {ScrollDispatcher} dispatcher The dispatcher to add this scene to.
 */
ScrollScene.prototype.addTo = function(dispatcher) {
  dispatcher.addScene(this);
};

module.exports = ScrollScene;
