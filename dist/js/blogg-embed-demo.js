(function($, videojs, window) {
    'use strict';
    var dashCallback = function(player, mediaPlayer) {
        mediaPlayer.getDebug().setLogToBrowserConsole(false);
    };
    videojs.Html5DashJS.hook('beforeInitialize', dashCallback);

    var embedMedia = function(mediaType) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _isDemo = JSON.parse("true"),
            _mediaPlayListUrls = [],
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

        var _getPluginDefaultOptions = function() {
            var vjPlgOpt = {
                watermark: {
                    position: 'bottom-right',
                    url: 'http://blogg.no',
                    image: '',
                    fadeTime: null
                },
                wavesurfer: {
                    msDisplayMax: 10,
                    debug: _isDemo,
                    waveColor: 'grey',
                    progressColor: '#e22190',
                    cursorColor: 'white',
                    hideScrollbar: true
                },
                ima: {
                    id: _idSelector.replace('#', ''),
                    adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
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
        var _getEmbedId = function() {
            if (!_isDemo) {
                var parts = location.pathname.split('/');
                return parts[parts.length - 1];
            } else {
                var queries = _getUrlQueries(document.location.search.substr(1));
                return _currentMedia.type == 'video' ? queries.v : queries.id;
            }
        };

        var _setMediaId = function() {
            _mediaPlayListUrls = [];
            _mediaPlayListUrls.push(window.location.href);
            _currentMedia.index = 0;
            _currentMedia.id = _getEmbedId();
        };

        var _runPlugin = function() {
            for (var plugin in _currentMedia.plugins) {
                _currentMedia.player[plugin](_currentMedia.plugins[plugin]);
                switch (plugin) {
                    case 'ima':
                        _currentMedia.player.one(_startEvent, function() {
                            _currentMedia.player.ima.initializeAdDisplayContainer();
                            _currentMedia.player.ima.requestAds();
                            _currentMedia.player.play();
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
            _idSelector = element || _idSelector;
            var settings = $.extend({}, defaultSetup, setup);
            if (!_currentMedia.plugins)
                _currentMedia.plugins = _getPluginDefaultOptions();

            var srcPl = _getSrc($(_idSelector));
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
                            _currentMedia.plugins.wavesurfer.src = "resources/audios/" + _currentMedia.id + ".mp3";
                        } else if (srcPl) {
                            _currentMedia.plugins.wavesurfer.src = srcPl;
                        }

                };
                if (callback) callback();
                _runPlugin();
            }

            var player = videojs(_idSelector, settings, playerCallback);
            player.on('play', $.proxy(onMediaPlayEvent, this));
            player.on('ended', $.proxy(onMediaEndEvent, this));

            _currentMedia.player = player;

            return player;
        };
        var onMediaPlayEvent = function(event) {
            _currentMedia.playsCounter++;
            if (_currentMedia.playsCounter === 1) {
                _playsAPICall("", _currentMedia.id, _currentMedia.type);
            }
        };
        var onMediaEndEvent = function() {
            var waitTime = 1500;
            var nextMedia = _mediaPlayListUrls[_currentMedia.index + 1];
            if (nextMedia) {
                setTimeout(function() {
                    window.location.href = nextMedia;
                }, waitTime);
            }
        };

        var setMediaPlayer = function(domId, setup, callback) {
            if (typeof domId != 'undefined' && !(domId && $(domId).length)) {
                console.log('Not found');
                return this;
            }
            _setMediaId();

            createPlayer(domId, setup, callback);
            _currentMedia.playsCounter = 0;

            return this;
        };

        var setPlugins = function(plugins) {
            if (!_currentMedia.player || !plugins)
                return this;
            var videoJsPluginOptions = _getPluginDefaultOptions();
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
            var togglebtn = $('<a>', {
                title: "Open",
                href: "#",
                class: "media-playlist__icon",
                click: function(event) {
                    event.stopPropagation();
                    $('.media-playlist').toggleClass("open");
                    return false;
                }
            });

            var closebtn = togglebtn.clone(true, true);

            togglebtn.html('<span class="vjs-icon-chapters"></span>')
                .wrap('<div class="drawer-handle text-nowrap"></div>').parent()
                .append('<span class="media-playlist__header__info"><span></span> videos</span>')
                .prependTo('.media-playlist');

            closebtn.attr("title", "Close")
                .html('&times;')
                .wrap('<div class="pull-right text-center text-muted"></div>')
                .parent()
                .prependTo('.media-playlist__header');

            $('.media-playlist').on('click', function(event) {
                event.stopPropagation();
            })

            togglebtn.on('click', function() {
                $('body').on('click', function() {
                    $('.drawer').toggleClass("open");
                    $(this).off('click');
                });
            });
            closebtn.on('click', function() {
                $('body').off('click');
            });
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