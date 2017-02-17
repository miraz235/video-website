(function() {
    var wrapper, iframe, lazyload = false;
    var helpers = {
        isEMLoadScript: function(tag) {
            return tag.src !== "undefined" && tag.src && tag.src.indexOf("emload.js?url=") > -1;
        },
        insertAfter: function(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        searchParams: function(src, paramName) {
            var srcObj = new URL(src),
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
            if (!node) return null;
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
            wrapper.appendChild(iframe);
            wrapper.className += " em-loaded";
            if (config.type == 'audio') {
                wrapper.style.paddingTop = "0";
                if (this.searchParams(me.src, 'list') !== null)
                    this.setIFrameHeight(iframe, 165, true);
                else
                    this.setIFrameHeight(iframe, 165);
                window.addEventListener("resize", this.resizeAll);
            }
        },
        lazyload: function() {
            var scrollableParent = this.hasScrollbar(wrapper.parentNode);
            var wrapperTop = this.getTopPosition(wrapper, scrollableParent);
            if (!wrapper.classList.contains('em-loaded') && wrapperTop >= 0 && wrapperTop <= scrollableParent.clientHeight) {
                this.loadIframe();
            }
        }
    };

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
        iframe.style.left = "0";
        iframe.scrolling = "no";
        iframe.setAttribute("webkitallowfullscreen", "true");
        iframe.setAttribute("mozallowfullscreen", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.className = "em-iframe em-single-iframe";
        iframe.name = "em-iframe";
        iframe.src = config.src;
        if (config.type == 'audio') {
            iframe.className += " em-iframe-audio";
            if (config.list !== null) iframe.className += " em-iframe-audio-list";
        } else iframe.style.position = "absolute";
    }

    function createWrapper(config) {
        wrapper = document.createElement('div');
        wrapper.style.position = "relative";
        wrapper.style.width = '100%';
        wrapper.style.boxShadow = 'inset 0 0 2px #aaa';
        wrapper.style.backgroundColor = 'rgba(0,0,0,.15)';
        wrapper.style.backgroundImage = "url(\"data:image\/svg+xml,%3Csvg width='120px' height='120px' xmlns='http:\/\/www.w3.org\/2000\/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'%3E%3Crect x='0' y='0' width='100' height='100' fill='none' class='bk'%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(0 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(30 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(60 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(90 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(120 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(150 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(180 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(210 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(240 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(270 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(300 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3Crect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='%2300b2ff' transform='rotate(330 50 50) translate(0 -30)'%3E %3Canimate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'\/%3E%3C\/rect%3E%3C\/svg%3E\")"
        wrapper.style.backgroundPosition = "center";
        wrapper.style.backgroundRepeat = "no-repeat";
        wrapper.style.backgroundSize = "22%";
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

    createWrapper(config);
    createIframe(config);
    helpers.insertAfter(me, wrapper);

    lazyload = config.lazy === null ? lazyload : true;
    if (lazyload) {
        helpers.lazyload();
        //var scrollableParent = helpers.hasScrollbar(wrapper.parentNode);
        window.addEventListener("scroll", helpers.lazyload.bind(helpers), false);
    } else helpers.loadIframe();

    me.className = "em-injected";
})();