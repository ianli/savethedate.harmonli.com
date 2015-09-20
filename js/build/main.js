(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ArrowIcon.js":[function(require,module,exports){
'use strict';

var ArrowIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  // Arrow icon is outside of the viewport.
  var $appIconArrow = $('#app-icon--arrow');
  $appIconArrow
    .css({
      bottom: -($appIconArrow.height() + 10)
    })
    .show();

  $appIconArrow.on('click', function() {
    var currScrollTop = $(document.body).scrollTop();
    var windowHeight = $(window).height();
    var arrowPositionY = currScrollTop + windowHeight - 100;
    var $section2 = $('#app-section-2');
    var $section3 = $('#app-section-3');

    if (arrowPositionY < $section2.offset().top) {
      $section2
        .velocity('scroll', {
          duration: 1000,
          offset: 0,
          easing: 'ease-in-out'
        });
    } else if (arrowPositionY < $section3.offset().top) {
      $section3
        .velocity('scroll', {
          duration: 1000,
          offset: 0,
          easing: 'ease-in-out'
        });
    }
  });
}

function show() {
  $('#app-icon--arrow')
      // Stop all previous animation.
      .velocity('stop', true)
      // Slide up.
      .velocity(
        {
          bottom: 24
        },
        {
          duration: 500,
          easing: [200, 15]
        }
      )
      // Loop it moving up and down.
      .velocity(
        {
          bottom: -8
        },
        {
          duration: 1000,
          easing: 'ease-out',
          loop: true
        }
      );
}

function hide() {
  $('#app-icon--arrow')
      // Stop all previous animation.
      .velocity('stop', true)
      // Return to its original position when showing.
      .velocity(
        {
          bottom: 24
        },
        {
          duration: 100,
          easing: [200, 15]
        }
      )
      // Slide down.
      .velocity(
        {
          bottom: -100
        },
        {
          duration: 500,
          easing: [200, 15]
        }
      );
}

module.exports = ArrowIcon;
},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/Dolphin.js":[function(require,module,exports){
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

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/EndIcon.js":[function(require,module,exports){
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
},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/HandIcon.js":[function(require,module,exports){
'use strict';

var HandIcon = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  $('#app-icon--hand')
      .css({
        bottom: -500
      });
}

function show() {
  $('#app-icon--hand')
      .velocity('stop', true)
      .velocity(
        {
          bottom: -40
        },
        {
          duration: 1000,
          easing: [150, 15]
        }
      );
}

function hide() {
  $('#app-icon--hand')
      .velocity('stop', true)
      .velocity(
        {
          bottom: -500
        },
        {
          duration: 1000,
          easing: [150, 15]
        }
      );
}

module.exports = HandIcon;
},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/SaveTheDateCard.js":[function(require,module,exports){
'use strict';

var SaveTheDateCard = {
  init: init,
  show: show,
  hide: hide
};

function init() {
  // Save the Date card is outside of the viewport.
  $('#app-card--savethedate').css({
    top: $(window).height() + 10,
    opacity: 0.7
  });
}

function show() {
  var $postcard = $('#app-card--savethedate');

  // Compute the offset so that the card is in the middle of screen.
  var offset = ($(window).height() - $postcard.height()) / 2;

  // Offset is never smaller than the minimum offset.
  if (offset < 20) {
    offset = 20;
  }

  $postcard
      .velocity(
        {
          // Custom spring physics.
          top: [offset, [120, 13]],
          opacity: 1
        },
        {
          duration: 500
        }
      );
}

function hide() {
  // Do not hide.
}

module.exports = SaveTheDateCard;

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ScrollDispatcher.js":[function(require,module,exports){
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

},{"lodash.throttle":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/index.js"}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ScrollScene.js":[function(require,module,exports){
'use strict';

/**
 * ScrollScene represents a scene that is triggered when the user scrolls.
 *
 * @param {object} options - Options for triggering the scene
 * @param {string} options.triggerElement - Selector whose location will
 *                 trigger the callback.
 * @param {string} options.triggerHook - Trigger can happen when element:
 *                 - is in the center of the viewport "onCenter" (default)
 *                 - enters the viewport "onEnter"
 *                 - leaves the viewport "onLeave"
 * @param {function} options.downCallback - Called when we reach the
 *                   triggerElement while scrolling DOWN.
 * @param {function} options.upCallback - Called when we reach the
 *                   triggerElement while scrolling UP.
 */
var ScrollScene = function(options) {
  this.triggerElement = options.triggerElement;
  this.triggerHook = options.triggerHook || 'onCenter';
  this.triggerOffset = options.triggerOffset || 0;
  this.downCallback = options.downCallback || function() {};
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
      break;
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

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/SimpleScrollScene.js":[function(require,module,exports){
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

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/_js/main.js":[function(require,module,exports){
'use strict';

var ArrowIcon = require('./ArrowIcon');
var Dolphin = require('./Dolphin');
var EndIcon = require('./EndIcon');
var HandIcon = require('./HandIcon');
var SaveTheDateCard = require('./SaveTheDateCard');
var ScrollDispatcher = require('./ScrollDispatcher');
var ScrollScene = require('./ScrollScene');
var SimpleScrollScene = require('./SimpleScrollScene');

// Import Lodash.js functions individually.
var _ = {};
_.delay = require('lodash.delay');

var OBFUSCATOR_OPACITY = 0.7;

// Force the location hash to be 'savethedate', so the URL is
// http://www.harmonli.com/#savethedate
// In the case that we move this page, we can check the hash information
// to know if we need to redirect to the new URL of this page.
if (location.hash != 'savethedate') {
  location.hash = 'savethedate';
}

$(document).ready(function() {
  // Make sure that we're scrolled to the top.
  $(document.body).scrollTop(0);

  ArrowIcon.init();
  Dolphin.init();
  EndIcon.init();
  HandIcon.init();
  SaveTheDateCard.init();

  $('#app-icon--end').on('click', function() {
    Dolphin.toggle();
  });

  _.delay(function() {
    $('.app-bg-obfuscator')
        .velocity({
          opacity: OBFUSCATOR_OPACITY
        }, {
          duration: 500
        });

    SaveTheDateCard.show();
  }, 500);

  _.delay(ArrowIcon.show, 1000);

  // Mailbox scene
  new ScrollScene({
        triggerElement: '#app-card--mailbox',
        triggerOffset: -50,
        downCallback: HandIcon.show,
        upCallback: HandIcon.hide
      })
      .addTo(ScrollDispatcher);

  // End icon scene
  new ScrollScene({
        triggerElement: '#app-icon--end',
        triggerHook: 'onEnter',
        downCallback: function() {
          EndIcon.show();
          ArrowIcon.hide();
        },
        upCallback: function() {
          EndIcon.hide();
          ArrowIcon.show();
        }
      })
      .addTo(ScrollDispatcher);

  if ($(document).width() > 768) {
    setupForDesktopScreen();
  }
});

/**
 * Setup for desktop screens.
 */
function setupForDesktopScreen() {
  // Coaster animation
  new SimpleScrollScene({
        onScroll: function(scrollInfo) {
          var windowHeight = scrollInfo.windowHeight;
          var scrollHeight = scrollInfo.scrollHeight;
          var scrollTop = scrollInfo.scrollTop;
          var $section = $('#app-section-3');
          var sectionTop = $section.offset().top;
          var sectionHeight = $section.height();

          var ratio = ((scrollTop + windowHeight) - sectionTop) / sectionHeight;

          if (ratio >= 0) {
            $('#app-card--coaster').css({
              transform: 'scale(' + ratio + ') rotate(' + (ratio * 360) + 'deg)'
            });
          }
        }
      })
      .addTo(ScrollDispatcher);

  // Simple scene that changes the opacity of the obfuscator.
  new SimpleScrollScene({
        onScroll: function(scrollInfo) {
          var windowHeight = scrollInfo.windowHeight;
          var scrollHeight = scrollInfo.scrollHeight;
          var scrollTop = scrollInfo.scrollTop;

          var ratioFromBottom = 1 - (scrollTop / (scrollHeight - windowHeight));

          $('.app-bg-obfuscator').css({
            opacity: OBFUSCATOR_OPACITY * ratioFromBottom
          });
        }
      })
      .addTo(ScrollDispatcher);
}

},{"./ArrowIcon":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ArrowIcon.js","./Dolphin":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/Dolphin.js","./EndIcon":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/EndIcon.js","./HandIcon":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/HandIcon.js","./SaveTheDateCard":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/SaveTheDateCard.js","./ScrollDispatcher":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ScrollDispatcher.js","./ScrollScene":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/ScrollScene.js","./SimpleScrollScene":"/Users/ianli/WorkspacePersonal/harmonli.com/_js/SimpleScrollScene.js","lodash.delay":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/index.js"}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/index.js":[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseDelay = require('lodash._basedelay'),
    restParam = require('lodash.restparam');

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => logs 'later' after one second
 */
var delay = restParam(function(func, wait, args) {
  return baseDelay(func, wait, args);
});

module.exports = delay;

},{"lodash._basedelay":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/node_modules/lodash._basedelay/index.js","lodash.restparam":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/node_modules/lodash.restparam/index.js"}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/node_modules/lodash._basedelay/index.js":[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The arguments provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

module.exports = baseDelay;

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.delay/node_modules/lodash.restparam/index.js":[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/index.js":[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var debounce = require('lodash.debounce');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed invocations. Provide an options object to indicate
 * that `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. Subsequent calls to the throttled function return the
 * result of the last `func` call.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the throttled function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=true] Specify invoking on the leading
 *  edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // avoid excessively updating the position while scrolling
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
 *   'trailing': false
 * }));
 *
 * // cancel a trailing throttled call
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (options === false) {
    leading = false;
  } else if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = throttle;

},{"lodash.debounce":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/node_modules/lodash.debounce/index.js"}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/node_modules/lodash.debounce/index.js":[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeNow = getNative(Date, 'now');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed invocations. Provide an options object to indicate that `func`
 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * Subsequent calls to the debounced function return the result of the last
 * `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = !!options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    lastCalled = 0;
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function complete(isCalled, id) {
    if (id) {
      clearTimeout(id);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (isCalled) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = undefined;
      }
    }
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      complete(trailingCall, maxTimeoutId);
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    complete(trailing, timeoutId);
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = undefined;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = debounce;

},{"lodash._getnative":"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/node_modules/lodash.debounce/node_modules/lodash._getnative/index.js"}],"/Users/ianli/WorkspacePersonal/harmonli.com/node_modules/lodash.throttle/node_modules/lodash.debounce/node_modules/lodash._getnative/index.js":[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}]},{},["/Users/ianli/WorkspacePersonal/harmonli.com/_js/main.js"])


//# sourceMappingURL=main.js.map