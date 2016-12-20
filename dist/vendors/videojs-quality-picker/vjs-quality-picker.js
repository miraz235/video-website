(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var VjsMenuItem = videojs.getComponent('MenuItem');

var QualityMenuItem = function (_VjsMenuItem) {
    _inherits(QualityMenuItem, _VjsMenuItem);

    function QualityMenuItem() {
        _classCallCheck(this, QualityMenuItem);

        return _possibleConstructorReturn(this, (QualityMenuItem.__proto__ || Object.getPrototypeOf(QualityMenuItem)).apply(this, arguments));
    }

    _createClass(QualityMenuItem, [{
        key: 'handleClick',
        value: function handleClick() {
            _get(QualityMenuItem.prototype.__proto__ || Object.getPrototypeOf(QualityMenuItem.prototype), 'handleClick', this).call(this);

            this.options_.qualitySwitchCallback(this.options_.id, this.options_.trackType);
        }
    }]);

    return QualityMenuItem;
}(VjsMenuItem);

exports.default = QualityMenuItem;

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var VjsMenu = videojs.getComponent('Menu');

var QualityMenu = function (_VjsMenu) {
  _inherits(QualityMenu, _VjsMenu);

  function QualityMenu() {
    _classCallCheck(this, QualityMenu);

    return _possibleConstructorReturn(this, (QualityMenu.__proto__ || Object.getPrototypeOf(QualityMenu)).apply(this, arguments));
  }

  _createClass(QualityMenu, [{
    key: 'addItem',
    value: function addItem(component) {
      var _this2 = this;

      _get(QualityMenu.prototype.__proto__ || Object.getPrototypeOf(QualityMenu.prototype), 'addItem', this).call(this, component);

      component.on('click', function () {
        var children = _this2.children();

        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (component !== child) {
            child.selected(false);
          }
        }
      });
    }
  }]);

  return QualityMenu;
}(VjsMenu);

exports.default = QualityMenu;

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _qualityMenu = require('./quality-menu');

var _qualityMenu2 = _interopRequireDefault(_qualityMenu);

var _qualityMenuItem = require('./quality-menu-item');

var _qualityMenuItem2 = _interopRequireDefault(_qualityMenuItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var VjsButton = videojs.getComponent('MenuButton');

var QualityPickerButton = function (_VjsButton) {
  _inherits(QualityPickerButton, _VjsButton);

  function QualityPickerButton() {
    _classCallCheck(this, QualityPickerButton);

    return _possibleConstructorReturn(this, (QualityPickerButton.__proto__ || Object.getPrototypeOf(QualityPickerButton)).apply(this, arguments));
  }

  _createClass(QualityPickerButton, [{
    key: 'createMenu',
    value: function createMenu() {
      var menu = new _qualityMenu2.default(this.player, this.options_);
      var menuItem;
      var options;
      for (var i = 0; i < this.options_.qualityList.length; i++) {
        var quality = this.options_.qualityList[i];
        var _options_ = this.options_,
            qualitySwitchCallback = _options_.qualitySwitchCallback,
            trackType = _options_.trackType;

        options = _extends({ qualitySwitchCallback: qualitySwitchCallback, trackType: trackType }, quality, { selectable: true });

        menuItem = new _qualityMenuItem2.default(this.player, options);
        menu.addItem(menuItem);
      }

      return menu;
    }
  }]);

  return QualityPickerButton;
}(VjsButton);

exports.default = QualityPickerButton;

},{"./quality-menu":2,"./quality-menu-item":1}],4:[function(require,module,exports){
"use strict";

var _qualityPickerButton = require("./quality-picker-button");

var _qualityPickerButton2 = _interopRequireDefault(_qualityPickerButton);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function qualityPickerPlugin(options) {
    var player = this;
    var tech = this.tech_;

    var SUPPORTED_TRACKS = ["video", "audio", "subtitle"];
    var TRACK_CLASS = {
        video: 'vjs-icon-hd',
        audio: 'vjs-icon-cog',
        subtitle: 'vjs-icon-subtitles'
    };

    tech.on('loadedqualitydata', onQualityData);

    function onQualityData(event, _ref) {
        var qualityData = _ref.qualityData,
            qualitySwitchCallback = _ref.qualitySwitchCallback;

        var fullscreenToggle = player.controlBar.getChild('fullscreenToggle');
        player.controlBar.removeChild(fullscreenToggle);

        for (var i = 0; i < SUPPORTED_TRACKS.length; i++) {
            var track = SUPPORTED_TRACKS[i];
            var name = track + "PickerButton";
            var qualityPickerButton = player.controlBar.getChild(name);
            if (qualityPickerButton) {
                qualityPickerButton.dispose();
                player.controlBar.removeChild(qualityPickerButton);
            }

            if (qualityData[track] && qualityData[track].length > 1) {
                qualityPickerButton = new _qualityPickerButton2.default(player, { name: name, qualityList: qualityData[track], qualitySwitchCallback: qualitySwitchCallback, trackType: track });
                qualityPickerButton.addClass(TRACK_CLASS[track]);

                player.controlBar.addChild(qualityPickerButton);
            }
        }

        if (fullscreenToggle) {
            player.controlBar.addChild(fullscreenToggle);
        }
    }
}

videojs.plugin('qualityPickerPlugin', qualityPickerPlugin);

},{"./quality-picker-button":3}]},{},[4]);
