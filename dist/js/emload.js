(function() {
    var iframe;
    var helpers = {
        resize: function(el) {
            var wrapper = el.parentNode;
            var width = Math.max(wrapper.scrollWidth, wrapper.offsetWidth, wrapper.clientWidth);
            var height = Math.round(width * 9 / 16); // 16:9 ratio;
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
        iframe.scrolling = "no";
        iframe.setAttribute("webkitallowfullscreen", "true");
        iframe.setAttribute("mozallowfullscreen", "true");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.style.height = "100%";
        iframe.style.position = "relative";
        iframe.className = "em-iframe em-single-iframe";
        iframe.name = "em-iframe";
        iframe.src = config.src;
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
        src: searchParams(me.src, 'url')
    };
    var wrapper = document.createElement('div');
    wrapper.style.position = "relative";
    wrapper.style.width = '100%';
    createIframe(config);
    wrapper.appendChild(iframe);
    insertAfter(me, wrapper);
    window.addEventListener("resize", helpers.resizeAll);
    window.addEventListener("message", helpers.onMessage);
    setTimeout(function() {
        helpers.resize(iframe);
    }, 1500);

    me.className = "em-injected";
})();