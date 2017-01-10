(function() {
    var iframe;
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
                }

                el.height = height;
                el.style.height = height + "px";
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
        }
        return false;
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
        list: searchParams(me.src, 'list')
    };
    var wrapper = document.createElement('div');
    wrapper.style.position = "relative";
    wrapper.style.width = '100%';
    createIframe(config);
    wrapper.appendChild(iframe);
    insertAfter(me, wrapper);
    if (config.type != 'audio') {
        setTimeout(function() {
            helpers.setIFrameHeight(iframe, 0, true);
        }, 1500);
    } else {
        if (searchParams(me.src, 'list') == '1')
            helpers.setIFrameHeight(iframe, 165, true);
        else
            helpers.setIFrameHeight(iframe, 165);
    }
    window.addEventListener("resize", helpers.resizeAll);
    //window.addEventListener("message", helpers.onMessage);
    me.className = "em-injected";
})();