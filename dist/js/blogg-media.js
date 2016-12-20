(function($, videojs, window) {
    'use strict';
    videojs.options.flash.swf = "http://static.blogg.no/video/vendors/video.js/video-js.swf";

    var bloggMedia = function(mediaType) {
        var isDemo = JSON.parse("false"),

            mediaPlayListUrls = [],
            mediaPlayerList = [],

            currentMedia = {
                type: mediaType,
                id: 0,
                settings: null,
                player: null,
                src: '',
                playsCounter: 0,
                index: -1
            },

            videoJsPluginOptions = {
                watermark: {
                    url: 'http://blogg.no',
                    image: 'http://static.blogg.no/blogs/image/NA_negativ_small.png',
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

        var playsAPICall = function(blogId, mediaId, mediaType) {
            if (isDemo) return 0;
            $.getJSON("http://blogsoft.local/index.bd?fa=public.updateMediaInfo&callback=?", {
                blogId: blogId,
                mediaId: mediaId,
                mediaType: mediaType
            }).done(function(msg) {
                console.log(msg);
            });
        };

        var getUrlQueries = function(queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function(key, value) {
                var i = value.split('=');
                if (i.length == 2)
                    out[i[0].toString()] = i[1].toString();
            });
            return out;
        };

        var setMediaId = function() {
            mediaPlayListUrls = [];
            mediaPlayListUrls.push(window.location.href);
            currentMedia.index = 0;
            /*if (isDemo) {*/
            var queries = getUrlQueries(document.location.search.substr(1));
            currentMedia.id = currentMedia.type == 'video' ? queries.v : queries.id;
            /*} else {
                currentMedia.id = getEmbedVideoId();
            }*/
        };

        var getDefaultSetup = function() {
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

        var onMediaPlayEvent = function(event) {
            for (var i = 0; i < mediaPlayerList.length; i++) {
                if (mediaPlayerList[i].id() != event.target.id) {
                    if (!mediaPlayerList[i].paused()) {
                        mediaPlayerList[i].pause();
                        mediaPlayerList[i].currentTime(0);
                        currentMedia.playsCounter = 0;
                    }
                }
            }
            currentMedia.playsCounter++;
            if (currentMedia.playsCounter === 1) {
                var $targetDom = $('#' + event.target.id);
                var mediaId = $targetDom.attr("data-" + currentMedia.type + "-id");
                if (mediaId) {
                    currentMedia.id = mediaId;
                    $targetDom.attr("data-" + currentMedia.type + "-id", '');
                }
                if (currentMedia.id)
                    playsAPICall("", currentMedia.id, currentMedia.type);
                currentMedia.player = this;
            }
        };

        var onMediaEndEvent = function() {
            var waitTime = 1500,
                nextMedia = mediaPlayListUrls[currentMedia.index + 1];
            if (nextMedia && ((currentMedia.type == 'video' && getAutoChangeValue()) || currentMedia.type != 'video')) {
                setTimeout(function() {
                    window.location.href = nextMedia;
                }, waitTime);
            }
        };

        var createPlayer = function($element, setup, callback) {
            var player = videojs($element, setup, callback);

            player.on('play', onMediaPlayEvent);
            player.on('ended', onMediaEndEvent);

            return player;
        };



        var getSrc = function($player) {
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

        var addMediaPlayer = function($elem, setup, callback) {
            if (!$elem) {
                console.log('No Player');
                return this;
            }
            var srcPl = getSrc($($elem));
            var callbackDefault = function() {
                switch (currentMedia.type) {
                    case 'video':
                        if (isDemo && currentMedia.id) {
                            this.src([{ type: "video/mp4", src: "resources/videos/" + currentMedia.id + ".mp4" }]);
                            this.poster('resources/videos/posters/' + currentMedia.id + '.jpg');
                        } else {
                            this.src([{ type: "video/mp4", src: srcPl }]);
                        }
                        this.watermark(videoJsPluginOptions.watermark);
                        break;
                    case 'audio':
                        if (isDemo && currentMedia.id) {
                            videoJsPluginOptions.wavesurfer.src = "resources/audios/" + currentMedia.id + ".mp3";
                        } else if (srcPl) {
                            videoJsPluginOptions.wavesurfer.src = srcPl;
                        }
                        this.wavesurfer(videoJsPluginOptions.wavesurfer);
                }
            };
            if (!currentMedia.settings) {
                var defaultSetup = getDefaultSetup();
                setup = $.extend({}, defaultSetup, setup);
                currentMedia.settings = setup;
            } else {
                setup = $.extend({}, currentMedia.settings, setup);
            }

            var player = createPlayer($elem, setup, callback || callbackDefault);
            mediaPlayerList.push(player);
            return this;
        };

        var totalPlayers = function() {
            return mediaPlayerList.length;
        };

        var remove = function(player) {
            player.dispose();
        };

        var removePlayer = function(id) {
            if (!id && currentMedia.player) {
                id = currentMedia.player.id();
            }
            for (var i = 0; i < totalPlayers(); i++) {
                if (id == 'all' || id == mediaPlayerList[i].id())
                    remove(mediaPlayerList[i]);
            }
        };

        var setMediaPlayer = function(domId, setup) {
            if (!(domId && $(domId).length)) {
                console.log('Not found');
                return this;
            } else if (mediaPlayerList.length) {
                console.log('Already Initialize');
                return this;
            }
            setMediaId();

            addMediaPlayer(domId);
            currentMedia.player = mediaPlayerList[0];
            currentMedia.playsCounter = 0;

            return this;
        };

        var setPlayList = function(domList) {

            var getList = function($tracksDom) {
                var mediaLinkList = [];
                $tracksDom.each(function(index) {
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

            var setTrackNumber = function() {
                var $trackNum = $(".media-playlist__header__info span");
                $trackNum.text((currentMedia.index + 1) + '/' + mediaPlayListUrls.length);
            };

            var setAutoChangeValue = function(isAutoplay) {
                if (typeof(localStorage) !== undefined) {
                    localStorage.setItem("autoplayPlaylist", isAutoplay);
                } else {
                    console.log("Sorry! No Web Storage support..");
                }
            };

            var getAutoChangeValue = function() {
                if (typeof(localStorage) !== undefined && localStorage.autoplayPlaylist !== undefined) {
                    var out = JSON.parse(localStorage.autoplayPlaylist);
                    $("#mediaAutoplay").prop("checked", out);
                    return out;
                } else {
                    console.log("Sorry! No Web Storage support..");
                    return $("#mediaAutoplay").is(":checked");
                }
            };

            var setAutoChange = function() {
                var is_autoplay = getAutoChangeValue();
                setAutoChangeValue(is_autoplay);
                $("#mediaAutoplay").change(function(event) {
                    setAutoChangeValue($(this).is(":checked"));
                });
            };

            if (!currentMedia.player) return;

            var $tracksDom = $(domList);

            if ($tracksDom.length > 0) {
                mediaPlayListUrls = getList($tracksDom);
                setTrackNumber();
                if (currentMedia.type == 'video')
                    setAutoChange();
            }
        };

        return {
            createPlayer: createPlayer,
            setMediaPlayer: setMediaPlayer,
            setPlayList: setPlayList,
            addMediaPlayer: addMediaPlayer,
            totalPlayers: totalPlayers,
            removePlayer: removePlayer
        };
    };
    window.bloggMedia = bloggMedia || {};

})(jQuery, videojs, window);