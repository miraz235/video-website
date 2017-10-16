(function() {
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
            value: function(predicate) {
                if (this === null) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;
                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            }
        });
    }
    var wrapper, iframe, lazyload = false;
    var helpers = {
        scrollTimer: 0,
        detectOperaMini: function() {
            return !!(navigator.userAgent.match(/Opera Mini/i) || Object.prototype.toString.call(window.operamini) === "[object OperaMini]");
        },
        isEMLoadScript: function(tag) {
            return tag.src !== "undefined" && tag.src && tag.src.indexOf("emload.js?url=") > -1;
        },
        insertAfter: function(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        searchParams: function(src, paramName) {
            var paramValue = '',
                hasParam = false;

            paramName = paramName.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(src);
            if (results) {
                hasParam = true;
                if (results[2]) paramValue = results[2].replace(/\+/g, " ");
            }

            if (paramValue === null) paramValue = '';

            return !hasParam ? null : window.decodeURIComponent(paramValue);
        },
        addParam: function(src, paramName, paramValue) {
            var regex = new RegExp("[?&]"),
                results = regex.exec(src),
                paramConnector = results ? "&" : "?",
                hasParam = !!this.searchParams(src, paramName);

            return !hasParam ? src + paramConnector + paramName + "=" + window.encodeURIComponent(paramValue) : src;
        },
        setIFrameHeight: function(el, height, withRatio) {
            if (withRatio) {
                var wrapper = el.parentNode;
                var width = Math.max(wrapper.scrollWidth, wrapper.offsetWidth, wrapper.clientWidth);
                height += Math.round(width * 9 / 16); // 16:9 ratio;
            }
            el.height = height;
            el.style.height = height + "px";
        },
        resizeAll: function() {
            var iframes = document.querySelectorAll(".em-iframe");
            for (var i = 0; i < iframes.length; i++) {
                var el = iframes[i];
                var wrapper = el.parentNode;
                var width = Math.max(wrapper.scrollWidth, wrapper.offsetWidth, wrapper.clientWidth);
                var height = Math.round(width * 9 / 16); // 16:9 ratio;
                if (el.classList.contains('em-iframe-audio')) {
                    var audioHeight = 165;
                    if (el.classList.contains('em-iframe-audio-list'))
                        height += audioHeight;
                    else
                        height = audioHeight;
                    el.height = height;
                    el.style.height = height + "px";
                }
            }
        },
        hasScrollbar: function(node) {
            if (!node) return document.documentElement;
            return node.scrollHeight > node.clientHeight ? node : this.hasScrollbar(node.parentNode);
        },
        getTopPosition: function(element, scrollableParent) {
            var yPosition = 0;
            while (element) {
                yPosition += element.offsetTop - (element.tagName === 'BODY' ? (window.pageYOffset || document.documentElement.scrollTop) : element.scrollTop) + element.clientTop;
                element = element.offsetParent;
            }
            return yPosition;
        },
        loadIframe: function() {
            setTimeout((function() {
                this.wrapper.appendChild(this.iframe);
                this.wrapper.classList.add("em-loaded");
                if (this.wrapper.style.removeProperty)
                    this.wrapper.style.removeProperty('background');

                if (config.type == 'audio') {
                    this.wrapper.style.paddingTop = "0";
                    if (this.searchParams(this.script.src, 'list') !== null)
                        this.setIFrameHeight(this.iframe, 165, true);
                    else
                        this.setIFrameHeight(this.iframe, 165);
                    window.addEventListener("resize", this.resizeAll);
                }
            }).bind(this), 200);
        },
        postMessage: function(postMsg, origin) {
            if (this.iframe.contentWindow)
                this.iframe.contentWindow.postMessage(postMsg, origin);
        },
        playVideo: function() {
            if (this.wrapper.classList.contains("em-visible") || !this.wrapper.classList.contains('em-paused') || this.wrapper.classList.contains('em-playing'))
                return;
            this.wrapper.classList.add("em-visible");
            var postMsg = 'em|' + JSON.stringify({ emmethod: "play" }) + '|script',
                origin = "*";
            if (this.iframe.src.indexOf("vimeo.com") > 0) {
                this.wrapper.classList.remove("em-paused");
                this.wrapper.classList.add("em-playing");
                postMsg = JSON.stringify({ method: 'play' });
                origin = 'https://player.vimeo.com';
            }
            this.postMessage(postMsg, origin);
        },
        pauseVideo: function() {
            if (!this.wrapper.classList.contains('em-playing') || this.wrapper.classList.contains('em-paused'))
                return;
            this.wrapper.classList.remove("em-playing");
            this.wrapper.classList.add("em-paused");
            var postMsg = 'em|' + JSON.stringify({ emmethod: "pause" }) + '|script',
                origin = "*";
            if (this.iframe.src.indexOf("vimeo.com") > 0) {
                postMsg = JSON.stringify({ method: 'pause' });
                origin = 'https://player.vimeo.com';
            }
            this.postMessage(postMsg, origin);
        },
        scrollCalc: function() {
            if (!this.scrollableParent)
                this.scrollableParent = this.hasScrollbar(this.wrapper.parentNode);
            var wrapperTop = this.getTopPosition(this.wrapper, this.scrollableParent);
            if (wrapperTop + this.wrapper.clientHeight >= 0 && wrapperTop <= this.scrollableParent.clientHeight) {
                if (!this.wrapper.classList.contains('em-loaded'))
                    this.loadIframe();
                else this.playVideo();
            } else {
                this.wrapper.classList.remove("em-visible");
                if (this.wrapper.classList.contains('em-loaded'))
                    this.pauseVideo();
            }
        },
        lazyload: function(event) {
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout((function() {
                this.scrollCalc();
            }).bind(this), 300);
        },
        onMessage: function(event) {
            var message = event.data;
            if (!message || typeof message != "string" || message == "undefined" || message.indexOf('ima://') > -1) {
                return;
            }
            var msgParts = message.split("|");
            if (msgParts[0] == "em" && msgParts[2] == "media") {
                var targetFrame = false;

                message = JSON.parse(msgParts[1]);
                if (message.frameid)
                    targetFrame = this.iframe.id == "id-" + message.frameid;
                switch (message.emmethod) {
                    case "play":
                        if (targetFrame) {
                            this.wrapper.classList.add("em-playing");
                            this.wrapper.classList.remove("em-paused");
                            //console.log('Player status: ' + message.emmethod);
                        } else this.pauseVideo();
                        break;
                    case "paused":
                    case "ended":
                    case "adstart":
                    case "adend":
                    case "adserror":
                    default:
                        break;
                        console.log('Player status: ' + message.emmethod);
                };
            }
        }
    };

    function createIframe(config) {
        var id = Math.round((Math.random(1000) * 1000)).toString();
        iframe = document.createElement("iframe");
        iframe.id = "id-" + id;
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.maxWidth = "100%";
        iframe.style.height = "100%";
        iframe.style.position = "relative";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.scrolling = "no";
        iframe.setAttribute("webkitallowfullscreen", "true");
        iframe.setAttribute("mozallowfullscreen", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.classList.add("em-iframe", "em-single-iframe");
        iframe.name = "em-iframe-" + id;
        iframe.src = config.src;
        if (config.type == 'audio') {
            iframe.classList.add("em-iframe-audio");
            if (config.list !== null) iframe.classList.add("em-iframe-audio-list");
        } else iframe.style.position = "absolute";
    }

    function createWrapper(config) {
        var background = {
            color: 'rgba(0,0,0,.15)',
            image: "url(\"data:image\/svg+xml,%3Csvg width='120px' height='120px' xmlns='http:\/\/www.w3.org\/2000\/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'%3E%3Crect x='0' y='0' width='100' height='100' fill='none' class='bk'%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(0 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(30 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(60 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(90 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(120 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(150 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(180 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(210 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(240 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(270 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(300 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(330 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3C\/svg%3E\")",
            position: "center",
            repeat: "no-repeat",
            size: "22%"
        };
        wrapper = document.createElement('div');
        wrapper.style.position = "relative";
        wrapper.style.width = '100%';
        wrapper.style.boxShadow = 'inset 0 0 2px #aaa';
        wrapper.style.background = background.color + ' ' + background.image + ' ' + background.position + '/' + background.size + ' ' + background.repeat;
        wrapper.style.paddingTop = '56.25%';
        wrapper.className = config.wrapClass || 'em-wrapper';
    }

    var me = document.currentScript && document.currentScript.className == "em" ?
        document.currentScript : [].slice.call(document.getElementsByClassName("em")).find(helpers.isEMLoadScript);
    if (!me) return;

    var config = {
        src: helpers.searchParams(me.src, 'url'),
        type: helpers.searchParams(me.src, 'type'),
        list: helpers.searchParams(me.src, 'list'),
        lazy: helpers.searchParams(me.src, 'lazy'),
        wrapClass: helpers.searchParams(me.src, 'class')
    };

    var isAutoplay = helpers.searchParams(config.src, 'autoplay');
    if (isAutoplay && (isAutoplay === '1' || isAutoplay === 'true' || isAutoplay === 1 || isAutoplay === true)) {
        config.lazy = null;
    }

    createWrapper(config);
    createIframe(config);

    helpers.insertAfter(me, wrapper);
    helpers.wrapper = wrapper;
    helpers.iframe = iframe;
    helpers.script = me;

    lazyload = config.lazy === null ? lazyload : true;
    if (helpers.detectOperaMini()) {
        lazyload = false;
    }

    if (lazyload) {
        helpers.lazyload();
        //var scrollableParent = helpers.hasScrollbar(wrapper.parentNode);
        window.addEventListener("scroll", helpers.lazyload.bind(helpers), false);
    } else helpers.loadIframe();

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
        messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    window[eventMethod](messageEvent, helpers.onMessage.bind(helpers), false);

    me.className = "em-injected";
    return false;
})();