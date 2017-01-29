(function() {
    var wrapper, iframe, lazyload = false;
    var helpers = {
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
            if (node === null) {
                return null;
            }

            if (node.scrollHeight > node.clientHeight) {
                return node;
            } else {
                return this.hasScrollbar(node.parentNode);
            }
        },
        getTopPosition: function(element, scrollableParent) {
            var yPosition = 0;
            while (element) {
                /*yPosition += element.offsetTop;
                if (yPosition > 0)
                    break;*/
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return yPosition; // - scrollableParent.offsetTop - scrollableParent.scrollTop + scrollableParent.clientTop;
        },
        loadIframe: function() {
            wrapper.appendChild(iframe);
            if (config.type == 'audio') {
                /*setTimeout(function() {
                    helpers.setIFrameHeight(iframe, 0, true);
                }, 1500);
            } else {*/
                wrapper.style.paddingTop = "0";
                if (searchParams(me.src, 'list') == '1')
                    this.setIFrameHeight(iframe, 165, true);
                else
                    this.setIFrameHeight(iframe, 165);
                window.addEventListener("resize", this.resizeAll);
            }
            wrapper.className = "em-loaded";
        },
        lazyload: function() {
            var scrollableParent = this.hasScrollbar(wrapper.parentNode);
            var wrapperTop = this.getTopPosition(wrapper, scrollableParent);
            //console.log(wrapperTop, scrollableParent.clientHeight);
            if (!wrapper.classList.contains('em-loaded') && wrapperTop >= 0 && wrapperTop <= scrollableParent.clientHeight) {
                this.loadIframe();
            }
        },

        onMessage: function(message) {
            message = message.data;
            if (typeof message !== "undefined" && message != null && typeof message == "string" && message.indexOf("em") > -1) {
                message = message.split("|");

                var key = message[1];
                var value = message[2];

                switch (key) {
                    case "height":
                        iframe.height = value;
                        iframe.style.height = value + "px";
                        break;
                }

            }
        }
    };

    function getScriptTags(scriptTags) {
        var tag;
        var tags = [];
        for (var i = 0; i < scriptTags.length; i++) {
            tag = scriptTags[i];
            if (tag.src !== "undefined" && tag.src && tag.src.indexOf("emload.js?url=") > -1) {
                tags.push(tag);
            }
        }
        return tags;
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function createIframe(config) {
        var id = "id-" + Math.round((Math.random(1000) * 1000)).toString();
        iframe = document.createElement("iframe");
        iframe.id = id;
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.maxWidth = "100%";
        iframe.style.height = "100%";
        iframe.style.position = "relative";
        iframe.style.top = "0";
        iframe.scrolling = "no";
        iframe.setAttribute("webkitallowfullscreen", "true");
        iframe.setAttribute("mozallowfullscreen", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.className = "em-iframe em-single-iframe";
        iframe.name = "em-iframe";
        iframe.src = config.src;
        if (config.type == 'audio') {
            iframe.className += " em-iframe-audio";
            if (config.list == '1')
                iframe.className += " em-iframe-audio-list";
        } else {
            iframe.style.position = "absolute";
        }
        return false;
    }

    function createWrapper() {
        wrapper = document.createElement('div');
        wrapper.style.position = "relative";
        wrapper.style.width = '100%';
        wrapper.style.backgroundColor = "#dfdfdf";
        wrapper.style.backgroundImage = "url(\"data:image\/svg+xml,%3Csvg width='120px' height='120px' xmlns='http:\/\/www.w3.org\/2000\/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'%3E%3Crect x='0' y='0' width='100' height='100' fill='none' class='bk'%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(0 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(30 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(60 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(90 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(120 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(150 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(180 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(210 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(240 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(270 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(300 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(330 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3C\/svg%3E\")"
        wrapper.style.backgroundPosition = "center";
        wrapper.style.backgroundRepeat = "no-repeat";
        wrapper.style.backgroundSize = "25%";
        wrapper.style.paddingTop = '56.25%';
    }

    function searchParams(src, paramName) {
        var srcObj = new URL(src);
        var paramValue = '';
        if (srcObj.searchParams)
            paramValue = srcObj.searchParams.get(paramName);
        else {
            paramName = paramName.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(src);
            if (results && results[2])
                paramValue = results[2].replace(/\+/g, " ");
        }
        return window.decodeURIComponent(paramValue);
    }

    var me = null;
    var config = {};
    if (!document.currentScript) {
        var scriptTags = document.getElementsByClassName("em");
        me = getScriptTags(scriptTags)[0];
    } else me = document.currentScript;
    if (!me)
        return;

    config = {
        src: searchParams(me.src, 'url'),
        type: searchParams(me.src, 'type'),
        list: searchParams(me.src, 'list'),
        lazy: searchParams(me.src, 'lazy'),
    };

    createWrapper();
    createIframe(config);
    insertAfter(me, wrapper);
    lazyload = config.lazy == "null" ? lazyload : true;
    if (lazyload) {
        helpers.lazyload();
        //var scrollableParent = helpers.hasScrollbar(wrapper.parentNode);
        window.addEventListener("scroll", helpers.lazyload.bind(helpers), false);
    } else
        helpers.loadIframe();

    //window.addEventListener("message", helpers.onMessage);
    me.className = "em-injected";
})();