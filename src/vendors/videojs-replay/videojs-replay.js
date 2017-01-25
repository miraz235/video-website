(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsReplay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// Default options for the plugin.
var defaults = {};

var addReplayClass = function addReplayClass(player) {
  if (player.duration() !== Infinity) {
    player.addClass('vjs-replay').getChild('controlBar').getChild('playToggle').controlText(player.localize('Replay'));
  }
};

var removeReplayClass = function removeReplayClass(player) {
  var controlLabel = undefined;

  if (!player.hasClass('vjs-replay')) {
    return;
  }

  // Reset the control's label
  if (player.paused()) {
    controlLabel = player.localize('Play');
  } else {
    controlLabel = player.localize('Pause');
  }
  player.removeClass('vjs-replay').getChild('controlBar').getChild('playToggle').controlText(controlLabel);
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
var onPlayerReady = function onPlayerReady(player, options) {
  player.on('ended', function () {
    addReplayClass(player);
  });
  player.on(['play', 'seeking'], function () {
    removeReplayClass(player);
  });
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function replayButton
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var replayButton = function replayButton(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _videoJs2['default'].mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
_videoJs2['default'].plugin('replayButton', replayButton);

// Include the version number.
replayButton.VERSION = '1.1.0';

exports['default'] = replayButton;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9taXJhei9Eb3dubG9hZHMvdmlkZW9qcy1yZXBsYXktbWFzdGVyL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7dUJDQW9CLFVBQVU7Ozs7O0FBRzlCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsSUFBTSxjQUFjLEdBQUcsU0FBakIsY0FBYyxDQUFJLE1BQU0sRUFBSztBQUNqQyxNQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsVUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUN0QixRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3RCLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7R0FDM0M7Q0FDRixDQUFDOztBQUVGLElBQU0saUJBQWlCLEdBQUcsU0FBcEIsaUJBQWlCLENBQUksTUFBTSxFQUFLO0FBQ3BDLE1BQUksWUFBWSxZQUFBLENBQUM7O0FBRWpCLE1BQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQ2xDLFdBQU87R0FDUjs7O0FBR0QsTUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7QUFDbkIsZ0JBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ3hDLE1BQU07QUFDTCxnQkFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDekM7QUFDRCxRQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUM3QixRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3RCLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FDdEIsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQzlCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRixJQUFNLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQUksTUFBTSxFQUFFLE9BQU8sRUFBSztBQUN6QyxRQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQ3ZCLGtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0FBQ0gsUUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxZQUFNO0FBQ25DLHFCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzNCLENBQUMsQ0FBQztDQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY0YsSUFBTSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQVksT0FBTyxFQUFFOzs7QUFDckMsTUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFNO0FBQ2YsaUJBQWEsUUFBTyxxQkFBUSxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7R0FDOUQsQ0FBQyxDQUFDO0NBQ0osQ0FBQzs7O0FBR0YscUJBQVEsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQzs7O0FBRzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDOztxQkFFdEIsWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgdmlkZW9qcyBmcm9tICd2aWRlby5qcyc7XG5cbi8vIERlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbmNvbnN0IGRlZmF1bHRzID0ge307XG5cbmNvbnN0IGFkZFJlcGxheUNsYXNzID0gKHBsYXllcikgPT4ge1xuICBpZiAocGxheWVyLmR1cmF0aW9uKCkgIT09IEluZmluaXR5KSB7XG4gICAgcGxheWVyLmFkZENsYXNzKCd2anMtcmVwbGF5JylcbiAgICAgIC5nZXRDaGlsZCgnY29udHJvbEJhcicpXG4gICAgICAuZ2V0Q2hpbGQoJ3BsYXlUb2dnbGUnKVxuICAgICAgLmNvbnRyb2xUZXh0KHBsYXllci5sb2NhbGl6ZSgnUmVwbGF5JykpO1xuICB9XG59O1xuXG5jb25zdCByZW1vdmVSZXBsYXlDbGFzcyA9IChwbGF5ZXIpID0+IHtcbiAgbGV0IGNvbnRyb2xMYWJlbDtcblxuICBpZiAoIXBsYXllci5oYXNDbGFzcygndmpzLXJlcGxheScpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIGNvbnRyb2wncyBsYWJlbFxuICBpZiAocGxheWVyLnBhdXNlZCgpKSB7XG4gICAgY29udHJvbExhYmVsID0gcGxheWVyLmxvY2FsaXplKCdQbGF5Jyk7XG4gIH0gZWxzZSB7XG4gICAgY29udHJvbExhYmVsID0gcGxheWVyLmxvY2FsaXplKCdQYXVzZScpO1xuICB9XG4gIHBsYXllci5yZW1vdmVDbGFzcygndmpzLXJlcGxheScpXG4gICAgLmdldENoaWxkKCdjb250cm9sQmFyJylcbiAgICAuZ2V0Q2hpbGQoJ3BsYXlUb2dnbGUnKVxuICAgIC5jb250cm9sVGV4dChjb250cm9sTGFiZWwpO1xufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgcGxheWVyIGlzIHJlYWR5LlxuICpcbiAqIFRoaXMgaXMgYSBncmVhdCBwbGFjZSBmb3IgeW91ciBwbHVnaW4gdG8gaW5pdGlhbGl6ZSBpdHNlbGYuIFdoZW4gdGhpc1xuICogZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgcGxheWVyIHdpbGwgaGF2ZSBpdHMgRE9NIGFuZCBjaGlsZCBjb21wb25lbnRzXG4gKiBpbiBwbGFjZS5cbiAqXG4gKiBAZnVuY3Rpb24gb25QbGF5ZXJSZWFkeVxuICogQHBhcmFtICAgIHtQbGF5ZXJ9IHBsYXllclxuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICovXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xuICBwbGF5ZXIub24oJ2VuZGVkJywgKCkgPT4ge1xuICAgIGFkZFJlcGxheUNsYXNzKHBsYXllcik7XG4gIH0pO1xuICBwbGF5ZXIub24oWydwbGF5JywgJ3NlZWtpbmcnXSwgKCkgPT4ge1xuICAgIHJlbW92ZVJlcGxheUNsYXNzKHBsYXllcik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBBIHZpZGVvLmpzIHBsdWdpbi5cbiAqXG4gKiBJbiB0aGUgcGx1Z2luIGZ1bmN0aW9uLCB0aGUgdmFsdWUgb2YgYHRoaXNgIGlzIGEgdmlkZW8uanMgYFBsYXllcmBcbiAqIGluc3RhbmNlLiBZb3UgY2Fubm90IHJlbHkgb24gdGhlIHBsYXllciBiZWluZyBpbiBhIFwicmVhZHlcIiBzdGF0ZSBoZXJlLFxuICogZGVwZW5kaW5nIG9uIGhvdyB0aGUgcGx1Z2luIGlzIGludm9rZWQuIFRoaXMgbWF5IG9yIG1heSBub3QgYmUgaW1wb3J0YW50XG4gKiB0byB5b3U7IGlmIG5vdCwgcmVtb3ZlIHRoZSB3YWl0IGZvciBcInJlYWR5XCIhXG4gKlxuICogQGZ1bmN0aW9uIHJlcGxheUJ1dHRvblxuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxuICovXG5jb25zdCByZXBsYXlCdXR0b24gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMucmVhZHkoKCkgPT4ge1xuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcbiAgfSk7XG59O1xuXG4vLyBSZWdpc3RlciB0aGUgcGx1Z2luIHdpdGggdmlkZW8uanMuXG52aWRlb2pzLnBsdWdpbigncmVwbGF5QnV0dG9uJywgcmVwbGF5QnV0dG9uKTtcblxuLy8gSW5jbHVkZSB0aGUgdmVyc2lvbiBudW1iZXIuXG5yZXBsYXlCdXR0b24uVkVSU0lPTiA9ICdfX1ZFUlNJT05fXyc7XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxheUJ1dHRvbjtcbiJdfQ==
