/**
 * em-utils
 * @version 0.0.1
 * @copyright 2017 blogg.no
 * @license (MIT OR Apache-2.0)
 */
(function(window) {
    'use strict';
    var mediaLang = {
        CLOSE_SHARE: { en: "Close share box", no: "kk del boks" },
        CLOSE_PLAYLIST: { en: "Close playlist box", no: "Lukk spilleliste boksen" },
        ADVERTISEMENT: { en: "Advertisement", no: "Annonse" },
        COPY_SCRIPT: { en: "Copy embed script code", no: "Kopier skriptkode" },
        COPY_EMBED: { en: "Copy embed iframe code", no: "Kopier embed iframe-koden" }
    };

    var _culture = 'en';

    var helpers = {
        ajaxGet: function(url, successCallback, errorCallback) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = request.responseText;
                    try {
                        if (typeof data == "string") {
                            data = JSON.parse(data);
                        }
                    } catch (e) {}

                    successCallback && successCallback(data);
                } else {
                    // We reached our target server, but it returned an error
                    errorCallback && errorCallback();
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                console.log('Connection error');
            };

            request.send();
        },
        detectmob: function() {
            return !!(window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i));
        },
        detectIPmob: function() {
            return !!(window.navigator.userAgent.match(/iPhone|iPad|iPod/i));
        },
        extend: function(obj) {
            var arg;
            var index;
            var key;
            for (index = 1; index < arguments.length; index++) {
                arg = arguments[index];
                for (key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        obj[key] = arg[key];
                    }
                }
            }
            return obj;
        },
        serializeUrl: function(params) {
            var array = [];
            for (var key in params) {
                array.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
            }
            return array.join('&');
        },
        getLocation: function(url) {
            try {
                return new URL(url);
            } catch (e) {
                var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
                return match && {
                    href: url,
                    protocol: match[1],
                    host: match[2],
                    hostname: match[3],
                    port: match[4],
                    pathname: match[5],
                    search: match[6],
                    hash: match[7]
                } || {};
            }
        },
        searchParams: function(src, paramName) {
            var srcObj = this.getLocation(src),
                paramValue = '',
                hasParam = false;

            if (srcObj.searchParams) {
                paramValue = srcObj.searchParams.get(paramName);
                hasParam = srcObj.searchParams.has(paramName);
            } else {
                paramName = paramName.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(src);
                if (results) {
                    hasParam = true;
                    if (results[2]) paramValue = results[2].replace(/\+/g, " ");
                }
            }
            if (paramValue === null) paramValue = '';

            return !hasParam ? null : window.decodeURIComponent(paramValue);
        },
        $: function(ctxElement) {
            var foundElements = [ctxElement];
            var selectElm = function(selectors) {
                foundElements = ctxElement.querySelectorAll(selectors);
                this.elements = foundElements;
                return this;
            };
            var addEvent = function(events, callback) {
                var n = foundElements.length;
                for (var i = 0; i < n; i++) {
                    foundElements[i].addEventListener(events, callback.bind(foundElements[i]));
                }
                this.elements = foundElements;
                return this;
            };
            var addClass = function(classes) {
                var n = foundElements.length;
                for (var i = 0; i < n; i++) {
                    foundElements[i].classList.add(classes);
                }
                this.elements = foundElements;
                return this;
            };
            var removeClass = function(classes) {
                var n = foundElements.length;
                for (var i = 0; i < n; i++) {
                    foundElements[i].classList.remove(classes);
                }
                this.elements = foundElements;
                return this;
            }
            var prepend = function(childElement) {
                var n = foundElements.length;
                for (var i = 0; i < n; i++) {
                    foundElements[i].insertBefore(childElement, foundElements[i].firstElementChild);
                }
                this.elements = foundElements;
                return this;
            }
            return {
                find: selectElm,
                on: addEvent,
                elements: foundElements,
                addClass: addClass,
                removeClass: removeClass,
                prepend: prepend
            };
        },
        createElement: function(tag, attrs) {
            if (!tag) throw new SyntaxError("element tag name not defined");
            var ele = document.createElement(tag),
                attrName, styleName;
            if (attrs)
                for (attrName in attrs) {
                    if (attrName === "style")
                        for (styleName in attrs.style) { ele.style[styleName] = attrs.style[styleName]; }
                    else
                        ele.setAttribute(attrName, attrs[attrName]);
                }
            return ele;
        },
        insertAfter: function(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        prependChild: function(parentNode, childNode) {
            parentNode.insertBefore(childNode, parentNode.firstElementChild);
        },
        openWindow: function(url, title, opt) {
            var width = opt.width,
                height = opt.height,
                scrollbars = opt.scrollbars || 'yes',
                resizable = opt.resizable || 'yes',
                toolbar = opt.toolbar || 'no',
                winPosY = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - height / 2,
                winPosX = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - width / 2;
            if (window.chrome && window.navigator.userAgent.toLowerCase().indexOf("mac os x") !== -1) {
                height += 27;
            }
            if (window.safari) {
                height += 47;
            }
            var winOpt = "width=" + width +
                ",height=" + height +
                ",left=" + winPosX +
                ",top=" + winPosY +
                ",scrollbars=" + scrollbars +
                ",resizable=" + resizable +
                ",toolbar=" + toolbar;
            return window.open(url, title, winOpt);
        }
    };
    var getMediaLang = function(key) {
        return mediaLang[key][_culture];
    };
    var setCulture = function(culture) {
        _culture = culture;
    };


    var utils = {
        mediaLang: getMediaLang,
        helpers: helpers,
        setCulture: setCulture
    }

    window.emUtils = utils || {};

})(window);