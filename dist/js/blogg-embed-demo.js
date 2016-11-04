(function ($, videojs, window) {
    'use strict';
    videojs.options.flash.swf = "../vendors/video.js/video-js.swf";

    var embedMedia = function (mediaType) {
        var isDemo = JSON.parse("true");
        var mediaPlayListUrls = [];
        var currentMedia = {
            type: mediaType,
            id: 0,
            settings: {},
            player: null,
            src: '',
            playsCounter: 0,
            index: -1
        };

        var videoJsPluginOptions = {
            watermark: {
                url: 'http://blogg.no',
                image: 'resources/img/NA_negativ_small.png',
                fadeTime: 1000
            },
            wavesurfer: {
                msDisplayMax: 10,
                debug: isDemo,
                waveColor: 'grey',
                progressColor: '#0092f5',
                cursorColor: 'white',
                hideScrollbar: true
            }
        };
        var playsAPICall = function (blogId, mediaId, mediaType) {
            if (isDemo) return 0;
            $.getJSON("http://blogsoft.local/index.bd?fa=public.updateMediaInfo&callback=?", {
                blogId: blogId,
                mediaId: mediaId,
                mediaType: mediaType
            }).done(function (msg) {
                console.log(msg);
            });
        };
        var getUrlQueries = function (queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function (key, value) {
                var i = value.split('=');
                if (i.length == 2)
                    out[i[0].toString()] = i[1].toString();
            });
            return out;
        };
        var getEmbedId = function() {
            if(!isDemo){
                var parts = location.pathname.split('/');
                return parts[parts.length - 1];
            } else {
                var queries = getUrlQueries(document.location.search.substr(1));
                return currentMedia.type == 'video' ? queries.v : queries.id;
            }
        };

        var setMediaId = function () {
            mediaPlayListUrls = [];
            mediaPlayListUrls.push(window.location.href);
            currentMedia.index = 0;
            currentMedia.id = getEmbedId();
        };

        var getDefaultSetup = function () {
            var defaultOpt = {
                controls: true,
                autoplay: false,
                loop: false,
                preload: "none",
                controlBar: {
                    fullscreenToggle: true
                }
            };

            switch (currentMedia.type) {
                case 'audio':
                    defaultOpt.height = 100;
                    defaultOpt.controlBar.fullscreenToggle = false;
                    break;
            };
            return defaultOpt;
        };

        var createPlayer = function ($element, setup, callback) {
            var player = videojs($element, setup, callback);

            player.on('play', $.proxy(onMediaPlayEvent, this));
            player.on('ended', $.proxy(onMediaEndEvent, this));

            return player;
        };
        
        var getSrc = function($player){
            $player[0].pause();
            var src = null;
            var source = $player.find("source");

            if (source.length) {
                src = source.attr("src");
                source.remove();
            }
            $player[0].load();
            return src;
        };

        var setMediaPlayer = function (domId, setup) {
            if (!(domId && $("#" + domId).length)) {
                console.log('Not found');
                return this;
            }
            setMediaId();
            var defaultSetup = getDefaultSetup();
            var srcPl = getSrc($("#" + domId));

            currentMedia.settings = $.extend({}, defaultSetup, setup);
            
            var callback = function () {
                switch (currentMedia.type) {
                    case 'video':
                        if (isDemo && currentMedia.id) {
                            this.src([{ type: "video/mp4", src: "resources/videos/" + currentMedia.id + ".mp4" }]);
                            this.poster('resources/videos/posters/' + currentMedia.id + '.jpg');
                        }
                        else if(srcPl){
                            this.src([{ type: "video/mp4", src: srcPl }]);
                        }
                        this.watermark(videoJsPluginOptions.watermark);
                        break;
                    case 'audio':
                        if (isDemo && currentMedia.id) {
                            videoJsPluginOptions.wavesurfer.src = "resources/audios/" + currentMedia.id + ".mp3";
                            this.wavesurfer(videoJsPluginOptions.wavesurfer);
                        }
                        else if(srcPl){
                            videoJsPluginOptions.wavesurfer.src = srcPl;
                            this.wavesurfer(videoJsPluginOptions.wavesurfer);
                        }
                        
                };
            }

            currentMedia.player = createPlayer(domId, currentMedia.settings, callback);
            currentMedia.playsCounter = 0;

            return this;
        };

        var onMediaPlayEvent = function (event) {
            currentMedia.playsCounter++;
            if (currentMedia.playsCounter === 1) {
                playsAPICall("", currentMedia.id, currentMedia.type);
            }
        };
        var onMediaEndEvent = function () {
            var waitTime = 1500;
            var nextMedia = mediaPlayListUrls[currentMedia.index + 1];
            if (nextMedia) {
                setTimeout(function () {
                    window.location.href = nextMedia;
                }, waitTime);
            }
        };
        var getList = function ($tracksDom) {
            var mediaLinkList = [];
            $tracksDom.each(function (index) {
                var queries = getUrlQueries(this.href.split('?')[1]);
                var $li = $(this).parent();
                if (queries) {
                    mediaLinkList[index] = this.href;
                    if (window.location.href.indexOf(this.href) > -1) {
                        $li.addClass("currently-playing");
                        currentMedia.index = index;
                        if (index > 0)
                            currentMedia.player.autoplay(true);
                        $li.parent().animate({
                            scrollTop: index * $li.outerHeight() + 1
                        }, 500);
                    }
                }
            });
            return mediaLinkList;
        };

        var setTrackNumber = function () {
            var $trackNum = $(".media-playlist__header__info span");
            $trackNum.text((currentMedia.index + 1) + '/' + mediaPlayListUrls.length);
        };

        var setPlaylistDrawer = function () {
            var togglebtn = $('<a>', {
                title: "Open",
                href: "#",
                class: "media-playlist__icon",
                click: function (event) {
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

            $('.media-playlist').on('click', function (event) {
                event.stopPropagation();
            })

            togglebtn.on('click', function () {
                $('body').on('click', function () {
                    $('.drawer').toggleClass("open");
                    $(this).off('click');
                });
            });
            closebtn.on('click', function () {
                $('body').off('click');
            });
        };

        var setPlayList = function (domList) {
            if (!currentMedia.player) return;
            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                mediaPlayListUrls = getList($tracksDom);
                if (currentMedia.type == 'video') {
                    setPlaylistDrawer();
                }
                setTrackNumber();
            }
        };

        return {
            createPlayer: createPlayer,
            setMediaPlayer: setMediaPlayer,
            setPlayList: setPlayList
        };
    };
    window.embedMedia = embedMedia || {};

})(jQuery, videojs, window);
