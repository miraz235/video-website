/**
 * blogg-embed
 * @version 1.2.5
 * @copyright 2017 blogg.no
 */
(function($, videojs, window) {
    'use strict';
    if (window.embedMedia)
        return;
    var APIlist = {
        plays: function(mediaId, blogId) {
            return $.getJSON("http://hits.blogsoft.org?callback=?", {
                id: blogId,
                vid: mediaId
            });
        },
        track: function(eventName, mediaId, blogId) {
            return $.getJSON("http://hits.blogsoft.org/track?callback=?", {
                e: eventName,
                id: blogId,
                vid: mediaId
            });
        }
    };

    var embedMedia = function(mediaType, mediaId, blogId) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _emLang = {
            CLOSE_SHARE: { en: "Close share box", no: "kk del boks" },
            CLOSE_PLAYLIST: { en: "Close playlist box", no: "Lukk spilleliste boksen" },
            ADVERTISEMENT: { en: "Advertisement", no: "Annonse" },
            COPY_SCRIPT: { en: "Copy embed script code", no: "Kopier skriptkode" },
            COPY_EMBED: { en: "Copy embed iframe code", no: "Kopier embed iframe-koden" }
        };
        var _isDemo = JSON.parse("true"),
            _mediaPlayListUrls = [],
            _currentMedia = {
                type: mediaType,
                id: 0,
                bid: blogId || 0,
                vid: mediaId || 0,
                player: null,
                plugins: null,
                src: '',
                playsCounter: 0,
                index: -1
            },
            _idSelector = '#embedMedia',
            _timeupWaitingID = 0,
            _culture = 'en',
            _lastEventName = '';

        var _getDefaultSetup = function() {
            var defaultOpt = {
                controls: true,
                autoplay: false,
                loop: false,
                preload: "none",
                html5: {
                    hlsjsConfig: {}
                },
                inactivityTimeout: 500,
                controlBar: {
                    fullscreenToggle: true
                }
            };

            switch (_currentMedia.type) {
                case 'audio':
                    defaultOpt.height = 50;
                    defaultOpt.controlBar.fullscreenToggle = false;
                    break;
                default:
                    defaultOpt.controlBar.volumeMenuButton = {
                        inline: false,
                        vertical: true
                    };
            };
            return defaultOpt;
        };

        var _getPluginDefaultOptions = function() {
            var vjPlgOpt = {
                    watermark: {
                        position: 'bottom-right',
                        url: '',
                        image: '',
                        fadeTime: null
                    },
                    ima: {
                        id: _idSelector.replace('#', ''),
                        showControlsForJSAds: false,
                        adLabel: _emLang.ADVERTISEMENT[_culture],
                        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
                        prerollTimeout: 5000
                    },
                    contextmenuUI: {
                        content: [{
                            label: _emLang.COPY_SCRIPT[_culture],
                            listener: function() {
                                //$('#shareBtn').trigger('click');
                                _copyToClipboard($('#inputEmbedScript').val());
                            }
                        }, {
                            label: _emLang.COPY_EMBED[_culture],
                            listener: function() {
                                _copyToClipboard($('#inputEmbedIframe').val());
                            }
                        }]
                    },
                    replayButton: {}
                },
                selectedPlugins = {},
                plg = {
                    video: ["watermark", "ima", "contextmenuUI", "replayButton"],
                    audio: ["replayButton"]
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
        };

        var _notifyToParent = function(msg) {
            var message = $.extend({ frameid: (window.name ? window.name.replace("em-iframe-", "") : '') }, msg);
            window.parent.postMessage('em|' + JSON.stringify(message), "*");
        };


        var _copyToClipboard = function(text) {
            if (typeof text != "string")
                return;
            var textArea = $('<textarea></textarea>').css({
                'position': 'absolute',
                'left': '-9999px',
                'top': '0'
            }).val(text);
            $('body').append(textArea);
            textArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            textArea.remove();

        };

        var _playsAPICall = function() {
            if (_isDemo || _currentMedia.type == 'audio' || !_currentMedia.vid) return 0;
            APIlist.plays(_currentMedia.vid, _currentMedia.bid).done(function(msg) {
                //console.log(msg);
                _currentMedia.playsCounter++;
            });
        };
        var _trackAPICall = function(eventName) {
            if (eventName && _lastEventName != eventName) {
                console.log('Track:', eventName);
                _lastEventName = eventName;
            } else return 0;
            if (_isDemo || !_currentMedia.vid) return 0;

            APIlist.track(eventName, _currentMedia.vid, _currentMedia.bid).done(function(msg) {
                console.log(eventName, msg);
            });
        };
        var _getUrlQueries = function(queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function(key, value) {
                var i = value.split('=');
                if (i.length == 2)
                    out[i[0].toString()] = i[1].toString();
            });
            return out;
        };
        var _getEmbedId = function() {
            if (!_isDemo) {
                var parts = location.pathname.split('/');
                return parts[parts.length - 1];
            } else {
                var queries = _getUrlQueries(document.location.search.substr(1));
                return _currentMedia.type == 'video' ? queries.v : queries.id;
            }
        };

        var _setMediaUrlId = function() {
            _mediaPlayListUrls = [];
            _mediaPlayListUrls.push(window.location.href);
            _currentMedia.index = 0;
            _currentMedia.id = _getEmbedId();
        };

        var _loadAds = function(player) {
            //console.log('ads load', 'autoplay: ' + player.autoplay());
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
        };

        var _removeAds = function(player) {
            player.ima.getAdsManager() && player.ima.getAdsManager().discardAdBreak();
            player.ima.adContainerDiv && player.ima.adContainerDiv.remove();
            $('#' + player.id()).removeClass('vjs-ad-loading vjs-ad-playing');
        };

        var _runPlugin = function(player, plugins) {
            for (var plugin in plugins) {
                switch (plugin) {
                    case 'ima':
                        if (plugins.ima.adTagUrl) {
                            player.ima(plugins.ima);

                            if (!player.autoplay()) {
                                player.one(_startEvent, function() {
                                    _loadAds(player);
                                });
                            } else {
                                setTimeout((function() {
                                    _loadAds(player);
                                }).bind(this), 100);
                            };
                            player.one('adsready', function() {
                                //console.log('ads ready');
                                _notifyToParent({ emmethod: "adsready" });
                                _trackAPICall('adsReady');
                                player.pause();
                            });
                            player.one('contentended', function() {
                                _notifyToParent({ emmethod: "contentended" });
                                _removeAds(player);
                            });
                        }
                        break;
                    default:
                        if (typeof player[plugin] === 'function')
                            player[plugin](plugins[plugin]);
                }
            }
        };
        var _getSrc = function($player) {
            var src = null;
            var source = $player.find("source");

            if (source.length) {
                src = source.attr("src");
                /*if (_currentMedia.type == 'audio') {
                    $player[0].pause();
                    source.remove();
                }*/
            }
            /*if (_currentMedia.type == 'audio')
                $player[0].load();*/
            return src;
        };

        var _setAttrsForMobile = function() {
            var contentPlayer = $(_idSelector)[0];
            if ((navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/Android/i)) &&
                contentPlayer.hasAttribute('controls')) {
                contentPlayer.removeAttribute('controls');
            }
        };

        var createPlayer = function(element, setup, callback) {
            var defaultSetup = _getDefaultSetup();
            _idSelector = element || _idSelector;
            var settings = $.extend({}, defaultSetup, setup);
            //var srcPl = _getSrc($(_idSelector));
            _setAttrsForMobile();
            var playerCallback = function() {
                switch (_currentMedia.type) {
                    case 'video':
                        if (_isDemo && _currentMedia.id) {
                            this.src([{ type: "video/mp4", src: "resources/videos/" + _currentMedia.id + ".mp4" }]);
                            this.poster('resources/videos/posters/' + _currentMedia.id + '.jpg');
                        }
                        break;
                    case 'audio':
                        if (_isDemo && _currentMedia.id) {
                            this.src([{ type: "audio/mp3", src: "resources/audios/" + _currentMedia.id + ".mp3" }]);
                        }
                };
                if (callback) callback();
                _runPlugin(this, $.extend({}, plgOpts, _currentMedia.plugins));
            }

            var player = videojs(_idSelector, settings, playerCallback);
            var plgOpts = _getPluginDefaultOptions(player.id());
            player.on('play', onMediaPlayEvent.bind(this));
            player.on('pause', onMediaPauseEvent.bind(this));
            player.on('ended', onMediaEndEvent.bind(this));
            player.on('adstart', onMediaAdStartEvent.bind(this));
            player.on('adend', onMediaAdEndEvent.bind(this));
            player.on('adskip', onMediaAdCancelEvent.bind(this));
            player.on('adserror', onMediaAdErrorEvent.bind(this));

            _currentMedia.player = player;

            return player;
        };

        var _stopTimer = function() {
            window.clearTimeout(_timeupWaitingID);
            $('#circulerTimer').remove();
        };
        var _addCirculerTimer = function() {
            var circulerTimer = '<div id="circulerTimer" class="radial-timer s-animate">' +
                '<div class="radial-timer-half"></div>' +
                '<div class="radial-timer-half"></div>' +
                '</div>'
            $(circulerTimer).appendTo(_idSelector);
        };

        var onMediaPlayEvent = function(event) {
            _notifyToParent({ emmethod: "play" });
            _lastEventName = 'Plays';
            _stopTimer();
            _currentMedia.playsCounter++;
            if (_currentMedia.playsCounter === 1
                /*&&
                               !(_currentMedia.plugins.ima &&
                                   (_currentMedia.plugins.ima.adTagUrl &&
                                       !_currentMedia.plugins.ima.error))*/
            ) {
                _playsAPICall();
            }
        };
        var onMediaPauseEvent = function(event) {
            _notifyToParent({ emmethod: "paused" });
            _trackAPICall('paused');
        };
        var onMediaEndEvent = function() {
            _notifyToParent({ emmethod: "ended" });
            _trackAPICall('ended');
            var waitTime = 3000;
            var nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia) {
                _stopTimer();
                _addCirculerTimer();
                _timeupWaitingID = window.setTimeout((function() {
                    window.location.href = nextMedia;
                }).bind(this), waitTime);
            } else _currentMedia.playsCounter = 0;
        };
        var onMediaAdStartEvent = function(event) {
            _notifyToParent({ emmethod: "adstart" });
            _trackAPICall('adStarted');
        };
        var onMediaAdEndEvent = function(event) {
            _notifyToParent({ emmethod: "adend" });
            _trackAPICall('adEnded');
            if (_currentMedia.playsCounter === 1) {
                _notifyToParent({ emmethod: "videostart" });
            }
        };
        var onMediaAdCancelEvent = function(event) {
            _trackAPICall('adCanceled');
        };
        var onMediaAdErrorEvent = function(event) {
            _notifyToParent({ emmethod: "adserror" });
            _currentMedia.plugins.ima.error = true;
            _trackAPICall('adsError');
            //_removeAds(_currentMedia.player);
        };

        var _boxCloseControl = function(boxClass, title) {
            var closebtn = $('<a>', {
                title: title,
                href: "#",
                class: "media-icon",
                click: function(event) {
                    event.stopPropagation();
                    $(boxClass + '.drawer').removeClass("open");
                    //_currentMedia.player.play();
                    return false;
                }
            });

            closebtn.html('&times;')
                .wrap('<div class="media-close text-muted"></div>')
                .parent()
                .prependTo(boxClass);

            $(boxClass).on('click', function(event) {
                event.stopPropagation();
            });
        };
        var _setShareDrawer = function() {
            $('#shareBtn').show();
            _boxCloseControl(".media-share", _emLang.CLOSE_SHARE[_culture]);
            $('#inputEmbedScript, #inputEmbedIframe').on('focus', function() {
                var $this = $(this);
                $this.prev().hide();
                window.setTimeout(function() {
                    $this.select();
                });
            }).on('blur', function() {
                $(this).prev().removeAttr("style");
            });
        };
        var _setTitle = function() {
            $('.media-title a, .media-playlist__header__title a').on('click', function(event) {
                event.stopPropagation();
                _currentMedia.player.pause();
            });
        };
        var _setHeader = function() {
            if (_currentMedia.type == 'video') {
                var $emHeader = $(_idSelector).next('.media-header');
                $emHeader.appendTo(_idSelector);
            }
            _setTitle();
        };
        var _setButtons = function() {
            var btnGroups = $('[data-embutton]');
            btnGroups.on('click', function(event) {
                event.stopPropagation();
                if (this.id && $('.drawer[data-btnid=' + this.id + ']').length > 0) {
                    $('.drawer[data-btnid=' + this.id + ']').addClass('open');
                    _currentMedia.player.pause();
                }
                return false;
            });
        };
        var _openWindow = function(url, title, opt) {
            var width = opt.width,
                height = opt.height,
                scrollbars = opt.scrollbars || 'yes',
                resizable = opt.resizable || 'yes',
                toolbar = opt.toolbar || 'no',
                winPosY = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - height / 2,
                winPosX = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - width / 2;
            if (window.chrome && window.navigator.userAgent.toLowerCase().indexOf("mac os x") !== -1)
                height += 27;
            if (window.safari)
                height += 47;
            var winOpt = "width=" + width +
                ",height=" + height +
                ",left=" + winPosX +
                ",top=" + winPosY +
                ",scrollbars=" + scrollbars +
                ",resizable=" + resizable +
                ",toolbar=" + toolbar;
            return window.open(url, title, winOpt);
        };
        var _setShare = function() {
            $('.media-share .buttons a').on('click', function(event) {
                event.stopPropagation();
                if ($(this).hasClass('email'))
                    return true;
                _openWindow(this.href,
                    this.class, {
                        width: 500,
                            height: 400
                    });
                return false;
            });
            _setShareDrawer();
        };

        var setMediaPlayer = function(domId, setup, callback) {
            if (typeof domId != 'undefined' && !(domId && $(domId).length)) {
                console.log('Not found');
                return this;
            }
            _setMediaUrlId();

            createPlayer(domId, setup, callback);
            _currentMedia.playsCounter = 0;
            _setHeader();
            _setButtons();
            _setShare();

            return this;
        };

        var setPlugins = function(plugins) {
            if (!_currentMedia.player || !plugins)
                return this;
            var videoJsPluginOptions = _getPluginDefaultOptions();
            if (!_currentMedia.plugins)
                _currentMedia.plugins = videoJsPluginOptions;
            for (var plugin in plugins) {
                if (plugin in _currentMedia.player) {
                    _currentMedia.plugins[plugin] = $.extend({}, videoJsPluginOptions[plugin], plugins[plugin]);
                }
            }
            return this;
        };

        var getMediaPlayer = function() {
            return _currentMedia.player;
        };

        var _getList = function($tracksDom) {
            var mediaLinkList = [];
            $tracksDom.each(function(index) {
                var queries = _getUrlQueries(this.href.split('?')[1]);
                var $li = $(this).parent();
                if (queries) {
                    mediaLinkList[index] = this.href;
                    if (window.location.href.indexOf(this.href) > -1) {
                        $li.addClass("currently-playing");
                        _currentMedia.index = index;
                        if (index > 0)
                            _currentMedia.player.autoplay(true);
                        $li.parent().animate({
                            scrollTop: index * $li.outerHeight() + 1
                        }, 500);
                    }
                }
            });
            return mediaLinkList;
        };

        var _setTrackNumber = function() {
            var $trackNum = $(".media-playlist__header__info span");
            $trackNum.text((_currentMedia.index + 1) + '/' + _mediaPlayListUrls.length);
        };

        var _setPlaylistDrawer = function() {
            $('#playListBtn').show();
            _boxCloseControl(".media-playlist", _emLang.CLOSE_PLAYLIST[_culture]);
        };

        var setPlayList = function(domList) {
            if (!_currentMedia.player) return;
            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                _mediaPlayListUrls = _getList($tracksDom);
                if (_currentMedia.type == 'video') {
                    _setPlaylistDrawer();
                }
                _setTrackNumber();
            }
            return this;
        };

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
            messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        window[eventMethod](messageEvent, function(e) {
            var message = e.data;
            if (typeof message == "string" && message.indexOf("em|") > -1) {
                message = JSON.parse(message.split("|")[1]);
                switch (message.emmethod) {
                    case "pause":
                        _currentMedia.player.pause();
                        break;
                    case "play":
                        _currentMedia.player.play();
                        break;
                }
            }
        }, false);

        return {
            createPlayer: createPlayer,
            setMediaPlayer: setMediaPlayer,
            getMediaPlayer: getMediaPlayer,
            setPlayList: setPlayList,
            setPlugins: setPlugins
        };
    };
    window.embedMedia = embedMedia || {};

})(jQuery, videojs, window);