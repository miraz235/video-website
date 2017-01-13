(function($, videojs, window) {
    'use strict';
    var dashCallback = function(player, mediaPlayer) {
        mediaPlayer.getDebug().setLogToBrowserConsole(false);
    };
    videojs.Html5DashJS.hook('beforeInitialize', dashCallback);
    window.videojs = videojs;

    var embedMedia = function(mediaType) {
        var _startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            _startEvent = 'touchend';
        }
        var _isDemo = JSON.parse("false"),
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
        var _notifyHeightToParent = function(height) {
            var message = 'em|height|' + height;
            window.parent.postMessage(message, "*");
        };
        /*if (_currentMedia.type == 'audio')
            _notifyHeightToParent(165);*/

        var _getDefaultSetup = function() {
            var defaultOpt = {
                controls: true,
                autoplay: false,
                loop: false,
                preload: "none",
                inactivityTimeout: 1000,
                controlBar: {
                    remainingTimeDisplay: false
                        //customControlsSpacer: {}
                }
            };

            switch (_currentMedia.type) {
                case 'audio':
                    defaultOpt.height = 50;
                    defaultOpt.controlBar.fullscreenToggle = false;
                    break;
            };
            return defaultOpt;
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

        var _getPluginDefaultOptions = function() {
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
                    id: _idSelector.replace('#', ''),
                    adTagUrl: 'null'
                },
                contextmenuUI: {
                    content: [{
                        label: 'Copy embed script code',
                        listener: function() {
                            //$('#shareBtn').trigger('click');
                            _copyToClipboard($('#inputEmbedScript').val());
                        }
                    }, {
                        label: 'Copy embed iframe code',
                        listener: function() {
                            _copyToClipboard($('#inputEmbedIframe').val());
                        }
                    }]
                }
            };
            var selectedPlugins = {},
                plg = {
                    video: ["watermark", "ima", "contextmenuUI"],
                    audio: []
                };
            for (var idx in plg[_currentMedia.type]) {
                var plugin = plg[_currentMedia.type][idx];
                selectedPlugins[plugin] = vjPlgOpt[plugin];
            }

            return selectedPlugins;
        };

        var _playsAPICall = function(blogId, mediaId, mediaType) {
            if (_isDemo) return 0;
            /*$.getJSON("http://blogsoft.local/index.bd?fa=public.updateMediaInfo&callback=?", {
                blogId: blogId,
                mediaId: mediaId,
                mediaType: mediaType
            }).done(function(msg) {
                console.log(msg);
            });*/
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
                /*if (_currentMedia.type == 'audio') {
                    $player[0].pause();
                    source.remove();
                }*/
            }
            /*if (_currentMedia.type == 'audio')
                $player[0].load();*/
            return src;
        };
        var createPlayer = function(element, setup, callback) {
            var defaultSetup = _getDefaultSetup();
            _idSelector = element || _idSelector;
            var settings = $.extend({}, defaultSetup, setup);

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
        var _boxCloseControl = function(boxClass, title) {
            var closebtn = $('<a>', {
                title: title,
                href: "#",
                class: "media-icon",
                click: function(event) {
                    event.stopPropagation();
                    $(boxClass + '.drawer').removeClass("open");
                    _currentMedia.player.play();
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
            _boxCloseControl(".media-share", "Close share box");
            $('#inputEmbedScript, #inputEmbedIframe').on('focus', function() {
                var $this = $(this);
                window.setTimeout(function() {
                    $this.select();
                });
            });
        };

        var _setFalseBack = function() {
            if (_currentMedia.type == 'video') {
                var $flaseBackDom = $('<div class="media-false-back"></div>').css("background-image", "url(" + _currentMedia.player.poster() + ")");
                $(_idSelector).before($flaseBackDom);
            }
        };
        var _setHeader = function() {
            if (_currentMedia.type == 'video') {
                var $emHeader = $(_idSelector).next('.media-header');
                $emHeader.appendTo(_idSelector);
            }
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
            _setMediaId();

            createPlayer(domId, setup, callback);
            _currentMedia.playsCounter = 0;
            _setFalseBack();
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
            _boxCloseControl(".media-playlist", "Close playlist box");
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