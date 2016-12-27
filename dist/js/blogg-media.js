(function($, videojs, window) {
    'use strict';

    var dashCallback = function(player, mediaPlayer) {
        mediaPlayer.getDebug().setLogToBrowserConsole(false);
    };
    videojs.Html5DashJS.hook('beforeInitialize', dashCallback);
    window.videojs = videojs;

    var bloggMedia = function(mediaType) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _isDemo = JSON.parse("false"),

            _mediaPlayListUrls = [],
            _mediaPlayerList = [],

            _currentMedia = {
                type: mediaType,
                id: 0,
                player: null,
                plugins: null,
                src: '',
                playsCounter: 0,
                index: -1
            },
            _idSelector = '#embedMedia';

        var _getDefaultSetup = function() {
            var defaultOpt = {
                controls: true,
                autoplay: false,
                loop: false,
                preload: "none",
                controlBar: {
                    fullscreenToggle: true
                }
            };

            switch (_currentMedia.type) {
                case 'audio':
                    defaultOpt.height = 100;
                    defaultOpt.controlBar.fullscreenToggle = false;
                    break;
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
                wavesurfer: {
                    msDisplayMax: 10,
                    debug: _isDemo,
                    waveColor: 'grey',
                    progressColor: '#ffffff',
                    cursorColor: 'white',
                    hideScrollbar: true
                },
                ima: {
                    id: vId,
                    adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F5374%2FTV2video%2Fnettavisen%2FSide3&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&description_url=http%3A%2F%2Fwww.nettavisen.no%2F&correlator=843573442472758&hl=no&dfpduration=3&sdkv=h.3.153.3&sdki=d&scor=2299575987365357&adk=3757432570&osd=2&frm=0&sdr=1&afvsz=200x200%2C250x250%2C300x250%2C336x280%2C450x50%2C468x60%2C480x70%2C728x90&url=http%3A%2F%2Fwww.nettavisen.no%2Fvideo%2F19-aring-fikk-sjokk-da-han-gikk-pa-skolens-toalett%2F3423294927.html&ged=ve4_td4_tt1_pd4_la4000_er514.-518.666.-218_vi396.0.1346.1903_vp0_eb16491'
                }
            };
            var selectedPlugins = {},
                plg = {
                    video: ["watermark", "ima"],
                    audio: ["wavesurfer"]
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
        };

        var _playsAPICall = function(blogId, mediaId, mediaType) {
            if (_isDemo) return 0;
            $.getJSON("http://blogsoft.local/index.bd?fa=public.updateMediaInfo&callback=?", {
                blogId: blogId,
                mediaId: mediaId,
                mediaType: mediaType
            }).done(function(msg) {
                console.log(msg);
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

        var _setMediaId = function() {
            _mediaPlayListUrls = [window.location.href];
            _currentMedia.index = 0;
            var queries = _getUrlQueries(document.location.search.substr(1));
            _currentMedia.id = _currentMedia.type == 'video' ? queries.v : queries.id;
        };

        var _runPlugin = function(player, plugins) {
            for (var plugin in plugins) {
                player[plugin](plugins[plugin]);
                switch (plugin) {
                    case 'ima':
                        player.one(_startEvent, function() {
                            player.ima.initializeAdDisplayContainer();
                            player.ima.requestAds();
                            player.play();
                        });
                        break;
                }
            }
        };

        var _getSrc = function($player) {
            var src = null;
            var source = $player.find("source");

            if (source.length) {
                src = source.attr("src");
                if (_currentMedia.type == 'audio') {
                    $player[0].pause();
                    source.remove();
                }
            }
            if (_currentMedia.type == 'audio')
                $player[0].load();
            return src;
        };

        var createPlayer = function(element, setup, callback) {
            var defaultSetup = _getDefaultSetup();
            element = element || _idSelector;
            var settings = $.extend({}, defaultSetup, setup);

            var srcPl = _getSrc($(element));
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
                            plgOpts.wavesurfer.src = "resources/audios/" + _currentMedia.id + ".mp3";
                        } else if (srcPl) {
                            plgOpts.wavesurfer.src = srcPl;
                        }

                };
                if (callback) callback();
                _runPlugin(this, $.extend({}, plgOpts, _currentMedia.plugins));
            }

            var player = videojs(element, settings, playerCallback);
            var plgOpts = _getPluginDefaultOptions(player.id());
            player.on('play', $.proxy(onMediaPlayEvent, this));
            player.on('ended', $.proxy(onMediaEndEvent, this));

            return player;
        };

        var onMediaPlayEvent = function(event) {
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
            if (_currentMedia.playsCounter === 1) {
                var $targetDom = $('#' + event.target.id);
                var mediaId = $targetDom.attr("data-" + _currentMedia.type + "-id");
                if (mediaId) {
                    _currentMedia.id = mediaId;
                    $targetDom.attr("data-" + _currentMedia.type + "-id", '');
                }
                if (_currentMedia.id)
                    _playsAPICall("", _currentMedia.id, _currentMedia.type);
                _currentMedia.player = this;
            }
        };

        var onMediaEndEvent = function() {
            var waitTime = 1500,
                nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia && ((_currentMedia.type == 'video' && _getAutoChangeValue()) || _currentMedia.type != 'video')) {
                setTimeout(function() {
                    window.location.href = nextMedia;
                }, waitTime);
            }
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
            _setMediaId();

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