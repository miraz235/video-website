/**
 * blogg-embed
 * @version 1.2.6
 * @copyright 2017 blogg.no
 * @license (MIT OR Apache-2.0)
 */
(function($, videojs, window) {
    'use strict';
    if (window.embedMedia) { return; }
    var APIlist = {
        vplays: function(mediaId, blogId) {
            return $.getJSON("//hits.blogsoft.org?callback=?", {
                id: blogId,
                vid: mediaId
            });
        },
        vtrack: function(eventName, mediaId, blogId) {
            return $.getJSON("//hits.blogsoft.org/track?callback=?", {
                e: eventName,
                id: blogId,
                vid: mediaId
            });
        },
        aplays: function(mediaId, blogId) {
            return $.getJSON("//hits.blogsoft.org?callback=?", {
                id: blogId,
                aid: mediaId
            });
        }
    };

    function detectmob() {
        if (window.navigator.userAgent.match(/Android/i) ||
            window.navigator.userAgent.match(/webOS/i) ||
            window.navigator.userAgent.match(/iPhone/i) ||
            window.navigator.userAgent.match(/iPad/i) ||
            window.navigator.userAgent.match(/iPod/i) ||
            window.navigator.userAgent.match(/BlackBerry/i) ||
            window.navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }

    var embedMedia = function(mediaType, mediaOptions) {
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
        var _tracks = {
            ADS_READY: 'adReady',
            AD_STARTED: 'adStarted',
            AD_ENDED: 'adEnded',
            ADS_ERROR: 'adError',
            AD_BLOCKED: 'adBlocked',
            AD_SKIP: 'adCanceled',
            ADS_CRITICAL: 'adCriticalError',
            PLAYS: 'play',
            PAUSED: 'paused',
            ENDED: 'ended',
            REPLAYS: 'replay'
        };
        mediaOptions = $.extend({}, {
            blogId: 0,
            mediaId: 0,
            postAd: true
        }, mediaOptions);
        var _isDemo = JSON.parse("true"),
            _isDebuge = _isDemo,
            _mediaPlayListUrls = [],
            _currentMedia = {
                type: mediaType,
                id: 0,
                player: null,
                plugins: null,
                src: '',
                playsCounter: 0,
                index: -1,
                ads: false
            },
            _idSelector = '#embedMedia',
            _timeupWaitingID = 0,
            _culture = 'en',
            _lastEventName = '',
            _isMobile = detectmob();

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
                    ima: {
                        id: _idSelector.replace('#', ''),
                        showControlsForJSAds: false,
                        adLabel: _emLang.ADVERTISEMENT[_culture],
                        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
                        prerollTimeout: 5000,
                        debug: _isDebuge
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
                    video: ["ima", "contextmenuUI", "replayButton"],
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
            if (typeof text != "string") { return; }
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
                videojs.log('Copying text command was ' + msg);
            } catch (err) {
                videojs.log('Oops, unable to copy');
            }
            textArea.remove();
        };

        var _playsAPICall = function() {
            if (_isDebuge) { console.log('API: Plays Count'); }
            if (_isDemo || !mediaOptions.mediaId) { return; }
            switch (_currentMedia.type) {
                case 'video':
                    APIlist.vplays(mediaOptions.mediaId, mediaOptions.blogId).done(function(msg) {
                        //console.log(msg);
                        _currentMedia.playsCounter++;
                    });
                    break;
                case 'audio':
                    APIlist.aplays(mediaOptions.mediaId, mediaOptions.blogId).done(function(msg) {
                        //console.log(msg);
                        _currentMedia.playsCounter++;
                    });
                    break;
            };
        };
        var _trackEvents = function(eventName, msg) {
            if (_isDebuge) { videojs.log('Event', eventName + ':', msg); }
            _lastEventName = eventName;
        };
        var _trackAPICall = function(eventName, msg) {
            if (eventName && _lastEventName != eventName) {
                _trackEvents(eventName, msg);
                if (_isDebuge) { console.log('API: Events Track'); }
                if (!_isDemo && mediaOptions.mediaId) {
                    switch (_currentMedia.type) {
                        case 'video':
                            APIlist.vtrack(eventName, mediaOptions.mediaId, mediaOptions.blogId).done(function(msg) {
                                console.log(eventName, msg);
                            });
                            break;
                        case 'audio':
                            break;
                    };
                }
            } else return;
        };
        var _getUrlQueries = function(queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function(key, value) {
                var i = value.split('=');
                if (i.length == 2) {
                    out[i[0].toString()] = i[1].toString();
                }
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
            _currentMedia.ads = true;
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
        };

        var _removeAds = function(player) {
            if (_currentMedia.ads) {
                _currentMedia.ads = false;
                player.ima.getAdsManager() && player.ima.getAdsManager().discardAdBreak();
                player.ima.adContainerDiv && player.ima.adContainerDiv.remove();
                $('#' + player.id()).removeClass('vjs-ad-loading vjs-ad-playing');
            }
        };

        var _runPlugin = function(player, plugins) {
            for (var plugin in plugins) {
                switch (plugin) {
                    case 'ima':
                        if (plugins.ima.adTagUrl) {
                            try {
                                player.ima(plugins.ima);
                                if (!player.autoplay()) {
                                    player.one(_startEvent, function() {
                                        _loadAds(player);
                                    });
                                } else {
                                    player.autoplay(false);
                                    setTimeout((function() {
                                        _loadAds(player);
                                    }).bind(this), 100);
                                };
                                player.one('adsready', function() {
                                    _notifyToParent({ emmethod: "adsready" });
                                    _trackAPICall(_tracks.ADS_READY, 'Trigger this event after to signal that your integration is ready to play ads.');
                                    player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, function() {
                                        _trackEvents('AdStarted', 'Google');
                                    });

                                    player.ima.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function() {
                                        _trackEvents('AdCompleted', 'Google');
                                        if (mediaOptions.postAd) {
                                            _removeAds(player);
                                        }
                                    });

                                    player.ima.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function() {
                                        _trackEvents('VideoPauseReq', 'Google');
                                        if (!_isMobile && mediaOptions.postAd) {
                                            /* After postroll the player src forcefuully change to blob url */
                                            player.ima.contentSource = player.src();
                                        }
                                    });
                                });
                                //player.trigger('nopostroll');
                                player.one('contentended', function() {
                                    _notifyToParent({ emmethod: "contentended" });
                                    _trackEvents('ContentEnded');
                                    if (!mediaOptions.postAd) {
                                        _removeAds(player);
                                    }
                                });

                            } catch (err) {
                                if (!window.google) {
                                    _trackAPICall(_tracks.AD_BLOCKED, 'Ad Blocked by AdBlocker plugins or Google ima not loaded');
                                    _notifyToParent({ emmethod: "adblocked" });
                                }
                            }
                        }
                        break;
                    default:
                        if (typeof player[plugin] === 'function') {
                            player[plugin](plugins[plugin]);
                        }
                };
            }
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
                if (callback) { callback(); }
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
            player.on('nopostroll', function() { alert('nopost'); });

            player.on('adtimeout', _trackEvents.bind(this, 'AdTimeout', 'A timeout managed by the plugin has expired and regular video content has begun to play. Ad integrations have a fixed amount of time to inform the plugin of their intent during playback. If the ad integration is blocked by network conditions or an error, this event will fire and regular playback resumes rather than stalling the player indefinitely.'));
            player.on('adplaying', _trackEvents.bind(this, 'AdPlaying', 'Trigger this event when an ads starts playing. If your integration triggers playing event when an ad begins, it will automatically be redispatched as adplaying.'));
            player.on('ads-ad-started', _trackEvents.bind(this, 'AdsAdStarted', 'Trigger this when each individual ad begins.'));
            player.on('contentresumed', _trackEvents.bind(this, 'ContentResumed', ' If your integration does not result in a "playing" event when resuming content after an ad, send this event to signal that content can resume. This was added to support stitched ads and is not normally necessary.'));
            player.on('error', _trackEvents.bind(this, 'Error', 'An error occurs while fetching the media data.'));
            player.on('loadeddata', _trackEvents.bind(this, 'LoadedData', 'The user agent can render the media data at the current playback position for the first time.'));
            player.on('loadedmetadata', _trackEvents.bind(this, 'LoadedMetaData', 'The user agent has just determined the duration and dimensions of the media resource and the text tracks are ready.'));
            player.on('canplay', _trackEvents.bind(this, 'CanPlay', 'The user agent can resume playback of the media data, but estimates that if playback were to be started now, the media resource could not be rendered at the current playback rate up to its end without having to stop for further buffering of content.'));
            player.on('canplaythrough', _trackEvents.bind(this, 'CanPlayThrough', '	The user agent estimates that if playback were to be started now, the media resource could be rendered at the current playback rate all the way to its end without having to stop for further buffering.'));
            player.on('playing', _trackEvents.bind(this, 'Playing', 'Playback is ready to start after having been paused or delayed due to lack of media data.'));

            _currentMedia.player = player;

            return player;
        };

        var _stopTimer = function() {
            window.clearTimeout(_timeupWaitingID);
            $('#circulerTimer').remove();
            $('.vjs-big-play-button').removeAttr('style');
        };
        var _addCirculerTimer = function() {
            var circulerTimer = '<div id="circulerTimer" class="radial-timer s-animate">' +
                '<div class="radial-timer-half"></div>' +
                '<div class="radial-timer-half"></div>' +
                '</div>'
            $(circulerTimer).appendTo(_idSelector);
            $('.vjs-big-play-button').css({ 'z-index': 1112, 'background-color': 'transparent' });
        };

        var onMediaPlayEvent = function(event) {
            _stopTimer();
            _notifyToParent({ emmethod: "play" });
            switch (_lastEventName) {
                case _tracks.ENDED:
                    _currentMedia.playsCounter = 0;
                    _trackAPICall(_tracks.REPLAYS, 'Clicked on replay button');
                    break;
                case _tracks.ADS_READY:
                case _tracks.AD_STARTED:
                    if (!_isMobile) {
                        _trackAPICall(_tracks.ADS_CRITICAL, 'Something error in desktop version media after AdReady or AdStarted and Ad not playing');
                    }
                    break;
            };
            _trackEvents(_tracks.PLAYS, 'The media plays');

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
            //_trackAPICall(_tracks.PAUSED);
            _trackEvents(_tracks.PAUSED, 'The element has been paused. Fired after the pause() method has returned.');
        };
        var onMediaEndEvent = function() {
            _notifyToParent({ emmethod: "ended" });
            _trackAPICall(_tracks.ENDED, 'Playback has stopped because the end of the media resource was reached.');
            _stopTimer();
            var waitTime = 3000;
            var nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia) {
                if (_currentMedia.type == 'video' && !_isMobile) {
                    _removeAds(_currentMedia.player);
                    _addCirculerTimer();
                }
                if (_currentMedia.type == 'audio' || !_isMobile) {
                    _timeupWaitingID = window.setTimeout((function() {
                        window.location.href = nextMedia;
                    }).bind(this), waitTime);
                }
            }
        };
        var onMediaAdStartEvent = function(event) {
            _notifyToParent({ emmethod: "adstart" });
            //this.addClass('vjs-ad-playing');
            //_trackAPICall(_tracks.AD_STARTED, 'The player has entered linear ad playback mode. This event only indicates that an ad break has begun; the start and end of individual ads must be signalled through some other mechanism.');
        };
        var onMediaAdEndEvent = function(event) {
            _notifyToParent({ emmethod: "adend" });
            _trackAPICall(_tracks.AD_ENDED, 'The player has returned from linear ad playback mode. Note that multiple ads may have played back between adstart and adend.');
            if (_currentMedia.playsCounter === 1) {
                _notifyToParent({ emmethod: "videostart" });
            }
        };
        var onMediaAdCancelEvent = function(event) {
            _trackAPICall(_tracks.AD_SKIP, 'The player is skipping a linear ad opportunity and content-playback should resume immediately.');
        };
        var onMediaAdErrorEvent = function(event) {
            _notifyToParent({ emmethod: "adserror" });
            _currentMedia.plugins.ima.error = true;
            _trackAPICall(_tracks.ADS_ERROR, 'Trigger this event to indicate that an error in the ad integration has ocurred and any ad states should abort so that content can resume.');
            _removeAds(_currentMedia.player);
        };

        var debug = function(isdebug) {
            _isDebuge = isdebug === undefined ? true : !!isdebug;
            if (_currentMedia.plugins && _currentMedia.plugins.ima) {
                _currentMedia.plugins.ima.debug = _isDebuge;
            }
            return this;
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
                switch (this.id) {
                    case 'downloadBtn':
                        _playsAPICall();
                        return true;
                    default:
                        if (this.id && $('.drawer[data-btnid=' + this.id + ']').length > 0) {
                            $('.drawer[data-btnid=' + this.id + ']').addClass('open');
                            _currentMedia.player.pause();
                        }
                };

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
        };
        var _setShare = function() {
            $('.media-share .buttons a').on('click', function(event) {
                event.stopPropagation();
                if ($(this).hasClass('email')) { return true; }
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
            if (!_currentMedia.player || !plugins) { return this; }
            var videoJsPluginOptions = _getPluginDefaultOptions();
            if (!_currentMedia.plugins) {
                _currentMedia.plugins = videoJsPluginOptions;
            }
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
                        if (index > 0) {
                            _currentMedia.player.autoplay(true);
                        }
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
            if (!_currentMedia.player) { return; }
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
            if (_currentMedia.player && typeof message == "string" && message.indexOf("em|") > -1) {
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
            setPlugins: setPlugins,
            debug: debug
        };
    };
    window.embedMedia = embedMedia || {};

})(jQuery, videojs, window);