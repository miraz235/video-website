(function($, videojs) {
    'use strict';
    videojs.options.flash.swf = "../vendors/video.js/video-js.swf";

    var isDemo = JSON.parse("true");

    var playsAPICall = function(blogId, mediaId) {
        if (isDemo) return 0;
        $.ajax({
            method: "GET",
            url: "http://blogsoft.local/index.bd?fa=public.updateMediaInfo",
            data: {
                blogId: blogId,
                mediaId: mediaId,
                mediaType: "video"
            }
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

    var videoJsPluginOptions = {
        watermark: {
            url: 'http://blogg.no',
            image: 'resources/img/NA_negativ_small.png',
            fadeTime: 1000
        }
    };

    var getEmbedVideoId = function() {
        var parts = location.pathname.split('/');
        return parts[parts.length - 1];
    };

    var videoSingle = {
        init: function(vPlayerId) {
            if (!(vPlayerId && $("#" + vPlayerId).length))
                return;
            this.vPlayerId = vPlayerId;
            this.setMediaId();
            this.setVideoPlayer();
        },
        setMediaId: function() {
            this.mediaId = getEmbedVideoId();
        },
        setVideoPlayer: function() {
            var self = this;
            var setup = {
                controls: true,
                preload: "auto"
            };
            self.playsCounter = 0;
            var vplayer = videojs(self.vPlayerId, setup);
            vplayer.watermark(videoJsPluginOptions.watermark);
            vplayer.on('play', $.proxy(self.setVideoPlayEvent, self));
        },
        setVideoPlayEvent: function(e) {
            this.playsCounter++;
            console.log('Plays ' + this.playsCounter);
            playsAPICall("", this.mediaId);
        }
    };

    var videoPlayList = {
        init: function(vPlayerId) {
            if (!(vPlayerId && $("#" + vPlayerId).length))
                return;
            this.vPlayerId = vPlayerId;
            this.currentIndex = -1;
            this.videoList = [];
            this.setVideoList();
            this.setMediaId();
            this.setVideoNumber();
            this.setVideoPlayer();
        },
        setMediaId: function() {
            if (isDemo) {
                var queries = getUrlQueries(document.location.search.substr(1));
                this.mediaId = queries.v;
                if (!this.mediaId && this.videoList[0])
                    window.location.replace(this.videoList[0]);
            } else {
                this.mediaId = getEmbedVideoId();
            }
        },

        setPlaylistDrawer: function() {
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
                .wrap('<div class="playlist-drawyer text-nowrap"></div>').parent()
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
                    $('.media-playlist').toggleClass("open");
                    $(this).off('click');
                });
            })

        },
        setVideoList: function() {
            var self = this;
            var $tracksDom = $('.media-playlist__tracks li .media-playlist__video');
            $tracksDom.each(function(index) {
                var urldata = getUrlQueries(this.href.split('?')[1]);
                var $li = $(this).parent();
                if (urldata) {
                    var trackId = urldata.v;
                    self.videoList[index] = this.href;
                    if (window.location.href.indexOf(this.href) > -1) {
                        $li.addClass("currently-playing");
                        self.currentIndex = index;
                        $li.parent().animate({
                            scrollTop: index * $li.outerHeight() + 1
                        }, 500);
                    }
                }
            });
            self.setPlaylistDrawer();
        },
        setVideoNumber: function() {
            var $videoNum = $(".media-playlist__header__info span");
            $videoNum.text((this.currentIndex + 1) + '/' + this.videoList.length);
        },

        setVideoPlayer: function() {
            var self = this;
            var isAutoPlay = false;
            if (self.currentIndex > 0)
                isAutoPlay = true;
            var vplayer = videojs(self.vPlayerId, { controls: true, autoplay: isAutoPlay, preload: "none" }, function() {
                if (isDemo && self.mediaId) {
                    this.src([{ type: "video/mp4", src: "resources/videos/" + self.mediaId + ".mp4" }]);
                    this.poster('resources/videos/posters/' + self.mediaId + '.jpg');
                }
            });
            vplayer.watermark(videoJsPluginOptions.watermark);
            self.playsCounter = 0;
            vplayer.on('ended', $.proxy(self.setVideoEndEvent, self));
            vplayer.on('play', $.proxy(self.setVideoPlayEvent, self));
        },

        setVideoPlayEvent: function(e) {
            this.playsCounter++;
            console.log('Plays ' + this.playsCounter);
            playsAPICall("", this.mediaId);
        },

        setVideoEndEvent: function(e) {
            var nextVideo = this.videoList[this.currentIndex + 1];
            if (nextVideo) {
                setTimeout(function() {
                    window.location.href = nextVideo;
                }, 1500);
            }
        }
    };

    $(function() {
        videoSingle.init("videoSingle");
        videoPlayList.init("videoMediaPlayer");
    });

})(jQuery, videojs);