/**
 * blogg-media
 * @version 1.2.6
 * @copyright 2017 blogg.no
 * @license (MIT OR Apache-2.0)
 */
(function($, videojs, window) {
    'use strict';

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

    var bloggMedia = function(mediaType, mediaOptions) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _emLang = {
            ADVERTISEMENT: { en: "Advertisement", no: "Annonse" }
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
        var _isDemo = JSON.parse("false"),
            _isDebuge = _isDemo,
            _mediaPlayListUrls = [],
            _mediaPlayerList = [],

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
            _culture = 'no',
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
                    defaultOpt.height = 100;
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

        var _getPluginDefaultOptions = function(vId) {
            var vjPlgOpt = {
                    ima: {
                        id: vId,
                        showControlsForJSAds: false,
                        adLabel: _emLang.ADVERTISEMENT[_culture],
                        adTagUrl: '',
                        prerollTimeout: 5000,
                        debug: _isDebuge
                    },
                    replayButton: {}
                },
                selectedPlugins = {},
                plg = {
                    video: ["ima", "replayButton"],
                    audio: ["replayButton"]
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
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

        var _setMediaUrlId = function() {
            _mediaPlayListUrls = [window.location.href];
            _currentMedia.index = 0;
            var queries = _getUrlQueries(document.location.search.substr(1));
            _currentMedia.id = _currentMedia.type == 'video' ? queries.v : queries.id;
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
                                    setTimeout((function() {
                                        _loadAds(player);
                                    }).bind(this), 100);
                                };
                                player.one('adsready', function() {
                                    _trackAPICall(_tracks.ADS_READY);
                                    player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, function() {
                                        _trackEvents('AdStarted', 'Google');
                                    });

                                    player.ima.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function() {
                                        _trackEvents('AdCompleted', 'Google');
                                    });
                                });
                                player.one('contentended', function() {
                                    _trackEvents('ContentEnded');
                                    //_removeAds(player);
                                });
                            } catch (err) {
                                if (!window.google) {
                                    _trackAPICall(_tracks.AD_BLOCKED);
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

            var srcPl = _getSrc($(_idSelector));
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

            for (var i = 0; i < _mediaPlayerList.length; i++) {
                if (_mediaPlayerList[i].id() != event.target.id) {
                    if (!_mediaPlayerList[i].paused()) {
                        _mediaPlayerList[i].pause();
                        _mediaPlayerList[i].currentTime(0);
                        _currentMedia.playsCounter = 0;
                    }
                }
            }
            _currentMedia.playsCounter++;
            if (_currentMedia.playsCounter === 1
                /*&&
                               !(_currentMedia.plugins.ima &&
                                   (_currentMedia.plugins.ima.adTagUrl &&
                                       !_currentMedia.plugins.ima.error))*/
            ) {
                var $targetDom = $('#' + event.target.id);
                var mediaUrlId = $targetDom.attr("data-" + _currentMedia.type + "-id");
                if (mediaUrlId) {
                    _currentMedia.id = mediaUrlId;
                    $targetDom.attr("data-" + _currentMedia.type + "-id", '');
                }
                var mediaApiId = $targetDom.attr("data-" + _currentMedia.type + "-api-id");
                if (mediaApiId) {
                    mediaOptions.mediaId = mediaApiId;
                }
                if (_currentMedia.id) {
                    _playsAPICall();
                }
            }
        };
        var onMediaPauseEvent = function(event) {
            //_trackAPICall(_tracks.PAUSED);
            _trackEvents(_tracks.PAUSED, 'The element has been paused. Fired after the pause() method has returned.');
        };
        var onMediaEndEvent = function() {
            _trackAPICall(_tracks.ENDED, 'Playback has stopped because the end of the media resource was reached.');
            _stopTimer();
            var waitTime = 3000,
                nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia && ((_currentMedia.type == 'video' && _getAutoChangeValue()) || _currentMedia.type == 'audio')) {
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
            //this.pause();
            _trackAPICall(_tracks.AD_STARTED, 'The player has entered linear ad playback mode. This event only indicates that an ad break has begun; the start and end of individual ads must be signalled through some other mechanism.');
        };
        var onMediaAdEndEvent = function(event) {
            _trackAPICall(_tracks.AD_ENDED, 'The player has returned from linear ad playback mode. Note that multiple ads may have played back between adstart and adend.');
        };
        var onMediaAdCancelEvent = function(event) {
            _trackAPICall(_tracks.AD_SKIP, 'The player is skipping a linear ad opportunity and content-playback should resume immediately.');
        };
        var onMediaAdErrorEvent = function(event) {
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

        var addMediaPlayer = function($elem, setup, callback) {
            if (!($elem && $($elem).length)) {
                console.log('No Player');
                return this;
            }

            var player = createPlayer($elem, setup, callback);
            _mediaPlayerList.push(player);
            return this;
        };

        var setMediaPlayer = function(domId, setup, callback) {
            if (typeof domId != 'undefined' && !(domId && $(domId).length)) {
                console.log('Not found');
                return this;
            } else if (_mediaPlayerList.length) {
                console.log('Already Initialize');
                return this;
            }
            _setMediaUrlId();

            addMediaPlayer(domId, setup, callback);
            _currentMedia.player = _mediaPlayerList[0];
            _currentMedia.playsCounter = 0;

            return this;
        };

        var setPlugins = function(plugins) {
            if (!_currentMedia.player || !plugins) {
                return this;
            }
            var videoJsPluginOptions = _getPluginDefaultOptions(_currentMedia.player.id());
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

        var totalPlayers = function() {
            return _mediaPlayerList.length;
        };

        var _remove = function(player) {
            player.dispose();
        };

        var removePlayer = function(id) {
            if (!id && _currentMedia.player) {
                id = _currentMedia.player.id();
            }
            for (var i = 0; i < _totalPlayers(); i++) {
                if (id == 'all' || id == _mediaPlayerList[i].id()) {
                    _remove(_mediaPlayerList[i]);
                }
            }
        };

        var getList = function($tracksDom) {
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

        var _setAutoChangeValue = function(isAutoplay) {
            if (typeof(localStorage) !== undefined) {
                localStorage.setItem("autoplayPlaylist", isAutoplay);
            } else {
                console.log("Sorry! No Web Storage support..");
            }
        };

        var _getAutoChangeValue = function() {
            if (typeof(localStorage) !== undefined && localStorage.autoplayPlaylist !== undefined) {
                var out = JSON.parse(localStorage.autoplayPlaylist);
                $("#mediaAutoplay").prop("checked", out);
                return out;
            } else {
                console.log("Sorry! No Web Storage support..");
                return $("#mediaAutoplay").is(":checked");
            }
        };

        var _setAutoChange = function() {
            var is_autoplay = _getAutoChangeValue();
            _setAutoChangeValue(is_autoplay);
            $("#mediaAutoplay").change(function(event) {
                _setAutoChangeValue($(this).is(":checked"));
            });
        };

        var setPlayList = function(domList) {
            if (!_currentMedia.player) { return; }

            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                _mediaPlayListUrls = getList($tracksDom);
                _setTrackNumber();
                if (_currentMedia.type == 'video') {
                    _setAutoChange();
                }
            }
            return this;
        };

        return {
            createPlayer: createPlayer,
            setMediaPlayer: setMediaPlayer,
            getMediaPlayer: getMediaPlayer,
            setPlayList: setPlayList,
            setPlugins: setPlugins,
            addMediaPlayer: addMediaPlayer,
            totalPlayers: totalPlayers,
            removePlayer: removePlayer,
            debug: debug
        };
    };
    window.bloggMedia = bloggMedia || {};

})(jQuery, videojs, window);