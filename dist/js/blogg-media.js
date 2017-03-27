/**
 * blogg-media
 * @version 1.1.1
 * @copyright 2017 blogg.no
 */
(function($, videojs, window) {
    'use strict';

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

    var bloggMedia = function(mediaType, mediaId, blogId) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _emLang = {
            ADVERTISEMENT: { en: "Advertisement", no: "Annonse" }
        };
        var _isDemo = JSON.parse("false"),

            _mediaPlayListUrls = [],
            _mediaPlayerList = [],

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
            _culture = 'no',
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
                watermark: {
                    position: 'bottom-right',
                    url: '',
                    image: '',
                    fadeTime: null
                },
                ima: {
                    id: vId,
                    showControlsForJSAds: false,
                    adLabel: _emLang.ADVERTISEMENT[_culture],
                    adTagUrl: '',
                    prerollTimeout: 5000
                },
                replayButton: {}
            };
            var selectedPlugins = {},
                plg = {
                    video: ["watermark", "ima", "replayButton"],
                    audio: ["replayButton"]
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
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

        var _setMediaUrlId = function() {
            _mediaPlayListUrls = [window.location.href];
            _currentMedia.index = 0;
            var queries = _getUrlQueries(document.location.search.substr(1));
            _currentMedia.id = _currentMedia.type == 'video' ? queries.v : queries.id;
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
                                _trackAPICall('adsReady');
                                //player.pause();
                            });
                            player.one('contentended', function() {
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
                        if (plgOpts.wavesurfer)
                            break;
                        if (_isDemo && _currentMedia.id) {
                            if (plgOpts.wavesurfer)
                                plgOpts.wavesurfer.src = "resources/audios/" + _currentMedia.id + ".mp3";
                            else
                                this.src([{ type: "audio/mp3", src: "resources/audios/" + _currentMedia.id + ".mp3" }]);
                        } else if (srcPl) {
                            if (plgOpts.wavesurfer)
                                plgOpts.wavesurfer.src = srcPl;
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
            _stopTimer();
            _lastEventName = 'Plays';
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
                if (_currentMedia.id)
                    _playsAPICall();
            }
        };
        var onMediaPauseEvent = function(event) {
            _trackAPICall('paused');
        };
        var onMediaEndEvent = function() {
            _trackAPICall('ended');
            var waitTime = 3000,
                nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia && ((_currentMedia.type == 'video' && _getAutoChangeValue()) || _currentMedia.type != 'video')) {
                _stopTimer();
                _addCirculerTimer();
                _timeupWaitingID = window.setTimeout((function() {
                    window.location.href = nextMedia;
                }).bind(this), waitTime);
            } else _currentMedia.playsCounter = 0;
        };
        var onMediaAdStartEvent = function(event) {
            //this.pause();
            _trackAPICall('adStarted');
        };
        var onMediaAdEndEvent = function(event) {
            _trackAPICall('adEnded');
        };
        var onMediaAdCancelEvent = function(event) {
            _trackAPICall('adCanceled');
        };
        var onMediaAdErrorEvent = function(event) {
            _currentMedia.plugins.ima.error = true;
            _trackAPICall('adsError');
            //_removeAds(_currentMedia.player);
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
            if (!_currentMedia.player || !plugins)
                return this;
            var videoJsPluginOptions = _getPluginDefaultOptions(_currentMedia.player.id());
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
                if (id == 'all' || id == _mediaPlayerList[i].id())
                    _remove(_mediaPlayerList[i]);
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
            if (!_currentMedia.player) return;

            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                _mediaPlayListUrls = getList($tracksDom);
                _setTrackNumber();
                if (_currentMedia.type == 'video')
                    _setAutoChange();
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
            removePlayer: removePlayer
        };
    };
    window.bloggMedia = bloggMedia || {};

})(jQuery, videojs, window);