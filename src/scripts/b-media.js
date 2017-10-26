/**
 * b-media
 * @version 0.0.1
 * @copyright 2017 blogg.no
 * @license (MIT OR Apache-2.0)
 */
(function(videojs, utils, window) {
    'use strict';
    var helpers = utils.helpers;
    var mediaLang = utils.mediaLang;

    var APIlist = {
        vplays: function(mediaId, blogId, callback) {
            helpers.ajaxGet("//hits.blogsoft.org?id=" + blogId + "&vid=" + mediaId + "&callback=?", callback);
        },
        vtrack: function(eventName, mediaId, blogId, callback) {
            helpers.ajaxGet("//hits.blogsoft.org/track?e=" + eventName + "&id=" + blogId + "&vid=" + mediaId + "&callback=?", callback);
        },
        aplays: function(mediaId, blogId, callback) {
            helpers.ajaxGet("//hits.blogsoft.org?id=" + blogId + "&aid=" + mediaId + "&callback=?", callback);
        }
    };

    var mediaTracks = {
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

    var bMedia = function(mediaSelector, mediaOptions) {
        var mediaElement = mediaSelector;
        if (typeof mediaElement == "string") {
            mediaElement = document.querySelector(mediaSelector);
        }
        if (!mediaElement) {
            console.log(mediaSelector + ' element not found');
            return false;
        }

        var _isMobile = helpers.detectmob(),
            _isIPmob = helpers.detectIPmob(),
            _media = {
                element: mediaElement,
                type: mediaElement.tagName.toLowerCase(),
                player: null,
                plugins: null,
                playsCounter: 0
            };

        mediaOptions = helpers.extend({}, {
            blogId: 0,
            mediaId: 0,
            postAd: true,
            debug: false,
            setup: {},
            plugins: {}
        }, mediaOptions || {});

        if (!mediaOptions.debug) {
            utils.setCulture('no');
        }

        var getDefaultOptions = function() {
            var options = {
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
            switch (_media.type) {
                case 'audio':
                    options.height = 50;
                    options.controlBar.fullscreenToggle = false;
                    break;
                default:
                    options.controlBar.volumeMenuButton = {
                        inline: false,
                        vertical: true
                    };
                    if (_isIPmob) {
                        //options.controls = false;
                        options.nativeControlsForTouch = false;
                    }
            };
            return options;
        };

        var getPluginDefaultOptions = function() {
            var options = {
                ima: {
                    id: _media.player.id(),
                    showControlsForJSAds: false,
                    adLabel: mediaLang('ADVERTISEMENT'),
                    adTagUrl: '',
                    prerollTimeout: 5000,
                    debug: mediaOptions.debug
                },
                replayButton: {}
            };

            var selectedPlugins = {},
                plg = {
                    video: ["ima", "replayButton"],
                    audio: ["replayButton"]
                };

            for (var idx in plg[_media.type]) {
                var plugin = plg[_media.type][idx];
                selectedPlugins[plugin] = options[plugin];
            }

            return selectedPlugins;
        };

        var notifyToParent = function(msg) {
            var message = helpers.extend({ frameid: (window.name ? window.name.replace("em-iframe-", "") : '') }, msg);
            window.parent.postMessage('em|' + JSON.stringify(message) + '|media', "*");
            if (mediaOptions.debug) { console.log('Post Message: ', 'em|' + JSON.stringify(message) + '|media'); }
        };

        var _lastEventName = '';
        var trackEvents = function(eventName, msg) {
            if (mediaOptions.debug) { videojs.log('Event', eventName + ':', msg); }
            _lastEventName = eventName;
        };

        var trackAPICall = function(eventName, msg) {
            if (eventName && _lastEventName != eventName) {
                trackEvents(eventName, msg);
                if (mediaOptions.debug) { console.log('API: Events Track'); }
                if (_media.type == 'video' && mediaOptions.mediaId) {
                    APIlist.vtrack(eventName, mediaOptions.mediaId, mediaOptions.blogId);
                }
            } else return;
        };

        var playsAPICall = function() {
            if (_adsLoaded) {
                _media.player.off(_startEvent, playAds);
            }
            if (mediaOptions.debug) { console.log('API: Plays Count'); }
            if (!mediaOptions.mediaId) { return; }
            switch (_media.type) {
                case 'video':
                    APIlist.vplays(mediaOptions.mediaId, mediaOptions.blogId, function(msg) {
                        _media.playsCounter++;
                    });
                    break;
                case 'audio':
                    APIlist.aplays(mediaOptions.mediaId, mediaOptions.blogId, function(msg) {
                        _media.playsCounter++;
                    });
                    break;
            };
        };

        var _startEvent = _isMobile ? 'touchend' : 'click';
        var _adsLoaded = false;
        var initAds = function() {
            if (!_adsLoaded) {
                _media.player.ima.initializeAdDisplayContainer();
                _media.player.ima.requestAds();
            }
            _adsLoaded = true;
        };
        var playAds = function() {
            _media.player.play();
        };

        var removeAds = function() {
            if (_adsLoaded) {
                _adsLoaded = false;
                _media.player.ima.getAdsManager() && _media.player.ima.getAdsManager().discardAdBreak();
                _media.player.ima.adContainerDiv && _media.player.ima.adContainerDiv.remove();
                mediaElement.classList.remove('vjs-ad-loading', 'vjs-ad-playing');
            }
        };

        var mediaAds = function(plgOptions) {
            if (!plgOptions.adTagUrl) return;
            try {
                if (!(window.google && window.google.ima)) {
                    throw new Error(mediaTracks.AD_BLOCKED);
                }
                _media.player.ima(plgOptions);
                initAds();
                if (!_media.player.autoplay()) {
                    _media.player.on(_startEvent, playAds);
                };
                var _adState = 'preroll';
                _media.player.one('adsready', function() {
                    notifyToParent({ emmethod: "adsready" });
                    trackAPICall(mediaTracks.ADS_READY, 'Trigger this event after to signal that your integration is ready to play ads.');
                    _media.player.ima.addEventListener(google.ima.AdEvent.Type.STARTED, function() {
                        trackEvents('AdStarted', 'Google');
                        _adState = 'postroll';
                    });

                    _media.player.ima.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function() {
                        trackEvents('AdCompleted', 'Google');
                        if (mediaOptions.postAd) {
                            removeAds();
                        }
                    });

                    _media.player.ima.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function() {
                        trackEvents('VideoPauseReq', 'Google');
                        if (!_isMobile && mediaOptions.postAd) {
                            /* After postroll the player src forcefully change to blob url */
                            _media.player.ima.contentSource = _media.player.src();
                        }
                    });

                    _media.player.ima.addEventListener(google.ima.AdEvent.Type.LOG, function(a) {
                        a = a.getAdData();
                        if (a.adError) {
                            trackEvents('InvalidAd', "Non-fatal error occurred: " + a.adError.getMessage());
                            switch (_adState) {
                                case 'preroll':
                                    _media.player.trigger('nopreroll');
                                    _adState = 'postroll';
                                    break;
                                case 'postroll':
                                    _media.player.trigger('nopostroll');
                                    _adState = 'nopostroll';
                                    break;
                            }
                        }
                    });

                    _media.player.one('contentended', function() {
                        notifyToParent({ emmethod: "contentended" });
                        trackEvents('ContentEnded');
                        if (!mediaOptions.postAd) {
                            removeAds();
                        }
                    });
                });
            } catch (err) {
                if (err.message == mediaTracks.AD_BLOCKED) {
                    _media.player.trigger('nopreroll');
                    _media.player.trigger('nopostroll');
                    trackAPICall(mediaTracks.AD_BLOCKED, 'Ad Blocked by AdBlocker plugins or Google ima not loaded');
                    notifyToParent({ emmethod: "adblocked" });
                } else {
                    console.log(err.name + ': ' + err.message);
                }
            }
        };

        var setPlugins = function(plugins) {
            if (!_media.player) { return this; }

            if (!_media.plugins) {
                _media.plugins = {};
            }

            var pluginDefaultOptions = getPluginDefaultOptions();
            for (var plugin in pluginDefaultOptions) {
                if (plugin in _media.player) {
                    _media.plugins[plugin] = helpers.extend({}, pluginDefaultOptions[plugin], plugins[plugin]);
                    if (plugin == "ima") {
                        mediaAds(_media.plugins[plugin]);
                        continue;
                    }
                    if (typeof _media.player[plugin] === 'function') {
                        _media.player[plugin](_media.plugins[plugin]);
                    }
                }
            }
            return this;
        };

        var onMediaPlayEvent = function(event) {
            notifyToParent({ emmethod: "play", playerid: _media.player.id() });
            switch (_lastEventName) {
                case mediaTracks.ENDED:
                    _media.playsCounter = 0;
                    trackAPICall(mediaTracks.REPLAYS, 'Clicked on replay button');
                    break;
                case mediaTracks.ADS_READY:
                case mediaTracks.AD_STARTED:
                    if (!_isMobile) {
                        trackAPICall(mediaTracks.ADS_CRITICAL, 'Something error in desktop version media after AdReady or AdStarted and Ad not playing');
                    }
                    break;
            };
            trackEvents(mediaTracks.PLAYS, 'The media plays');

            _media.playsCounter++;
            if (_media.playsCounter === 1) {
                playsAPICall();
            }
        };
        var onMediaPauseEvent = function(event) {
            notifyToParent({ emmethod: "paused" });
            trackEvents(mediaTracks.PAUSED, 'The element has been paused. Fired after the pause() method has returned.');
        };
        var onMediaEndEvent = function(event) {
            notifyToParent({ emmethod: "ended" });
            trackAPICall(mediaTracks.ENDED, 'Playback has stopped because the end of the media resource was reached.');
        };
        var onMediaAdStartEvent = function(event) {
            notifyToParent({ emmethod: "adstart" });
        };
        var onMediaAdEndEvent = function(event) {
            notifyToParent({ emmethod: "adend" });
            trackAPICall(mediaTracks.AD_ENDED, 'The player has returned from linear ad playback mode. Note that multiple ads may have played back between adstart and adend.');
            if (_media.playsCounter === 1) {
                notifyToParent({ emmethod: "videostart" });
            }
        };
        var onMediaAdCancelEvent = function(event) {
            trackAPICall(mediaTracks.AD_SKIP, 'The player is skipping a linear ad opportunity and content-playback should resume immediately.');
        };
        var onMediaAdErrorEvent = function(event) {
            notifyToParent({ emmethod: "adserror" });
            trackAPICall(mediaTracks.ADS_ERROR, 'Trigger this event to indicate that an error in the ad integration has ocurred and any ad states should abort so that content can resume.');
            removeAds(_media.player);
        };

        var setEvents = function() {
            _media.player.on('play', onMediaPlayEvent);
            _media.player.on('pause', onMediaPauseEvent);
            _media.player.on('ended', onMediaEndEvent);
            _media.player.on('adstart', onMediaAdStartEvent);
            _media.player.on('adend', onMediaAdEndEvent);
            _media.player.on('adskip', onMediaAdCancelEvent);
            _media.player.on('adserror', onMediaAdErrorEvent);

            _media.player.on('adplaying', trackEvents.bind(this, 'AdPlaying', 'Trigger this event when an ads starts playing. If your integration triggers playing event when an ad begins, it will automatically be redispatched as adplaying.'));
            _media.player.on('ads-ad-started', trackEvents.bind(this, 'AdsAdStarted', 'Trigger this when each individual ad begins.'));
            _media.player.on('contentresumed', trackEvents.bind(this, 'ContentResumed', ' If your integration does not result in a "playing" event when resuming content after an ad, send this event to signal that content can resume. This was added to support stitched ads and is not normally necessary.'));
            _media.player.on('error', trackEvents.bind(this, 'Error', 'An error occurs while fetching the media data.'));
            _media.player.on('loadeddata', trackEvents.bind(this, 'LoadedData', 'The user agent can render the media data at the current playback position for the first time.'));
            _media.player.on('loadedmetadata', trackEvents.bind(this, 'LoadedMetaData', 'The user agent has just determined the duration and dimensions of the media resource and the text tracks are ready.'));
            _media.player.on('canplay', trackEvents.bind(this, 'CanPlay', 'The user agent can resume playback of the media data, but estimates that if playback were to be started now, the media resource could not be rendered at the current playback rate up to its end without having to stop for further buffering of content.'));
            _media.player.on('canplaythrough', trackEvents.bind(this, 'CanPlayThrough', '	The user agent estimates that if playback were to be started now, the media resource could be rendered at the current playback rate all the way to its end without having to stop for further buffering.'));
            _media.player.on('playing', trackEvents.bind(this, 'Playing', 'Playback is ready to start after having been paused or delayed due to lack of media data.'));
        };

        var createPlayer = function(setup, playerCallback) {
            var defaultOptions = getDefaultOptions();
            var settings = helpers.extend({}, defaultOptions, setup);
            if (_isMobile) {
                settings.autoplay = false;
            }

            _media.playsCounter = 0;
            _media.plugins = null;
            _media.player = videojs(mediaElement, settings, playerCallback);
            _media.element = mediaElement.parentElement || document.querySelector('#' + _media.player.id());

            setPlugins(mediaOptions.plugins);
            setEvents();
        };

        window.addEventListener("message", function(e) {
            var message = e.data;
            if (!message || typeof message != "string" || message == "undefined" || message.indexOf('ima://') > -1) {
                return;
            }
            var msgParts = message.split("|");
            if (msgParts[0] == "em") {
                if (mediaOptions.debug) { console.log('Post Message: ', message); }
                message = JSON.parse(msgParts[1]);
                switch (message.emmethod) {
                    case "pause":
                        if (msgParts[2] == "script") {
                            _media.player.pause();
                        }
                        break;
                    case "play":
                        if (msgParts[2] == "media") {
                            if (message.playerid != _media.player.id()) {
                                _media.player.pause();
                                _media.player.currentTime(0);
                                _media.playsCounter = 0;
                            }
                        } else {
                            _media.player.play();
                        }
                        break;
                }
            }
        }, false);

        createPlayer(mediaOptions.setup);

        return {
            createPlayer: createPlayer,
            option: _media,
            playsAPICall: playsAPICall,
            removeAds: removeAds
        };
    };

    window.bMedia = bMedia || {};
})(videojs, emUtils, window);