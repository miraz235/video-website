videojs.options.flash.swf = "../vendors/video.js/video-js.swf";
(function($) {
    'use strict';
    var getUrlQueries = function(queryStr) {
        var out = {};
        $.each(queryStr.split('&'), function(key, value) {
            var i = value.split('=');
            if (i.length == 2)
                out[i[0].toString()] = i[1].toString();
        });
        return out;
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

            this.setAutoChange();
            this.setVideoPlayer();
        },
        setMediaId: function() {
            var queries = getUrlQueries(document.location.search.substr(1));
            this.mediaId = queries.watch;
            if (!this.mediaId && this.videoList[0])
                window.location.replace(this.videoList[0]);
        },
        setVideoList: function() {
            var self = this;
            var $tracksDom = $('.media-playlist__tracks li .media-playlist__video');
            $tracksDom.each(function(index) {
                var urldata = getUrlQueries(this.href.split('?')[1]);
                var $li = $(this).parent();
                if (urldata) {
                    var trackId = urldata.watch;
                    self.videoList[index] = this.href;
                    if (window.location.href.indexOf(this.href) > -1) {
                        $li.addClass("currently-playing");
                        self.currentIndex = index;
                        $li.parent().animate({
                            scrollTop: index * $li.outerHeight() + 1
                        }, 500);
                    } else if (self.currentIndex > -1)
                        return false;
                }
            });
        },
        setAutoChangePlayList: function(isAutoplay) {
            if (typeof(localStorage) !== undefined) {
                localStorage.setItem("autoplayPlaylist", isAutoplay);
            } else {
                console.log("Sorry! No Web Storage support..");
            }
        },
        getAutoChangePlayList: function() {
            if (typeof(localStorage) !== undefined && localStorage.autoplayPlaylist !== undefined) {
                var out = JSON.parse(localStorage.autoplayPlaylist);
                $("#mediaAutoplay").prop("checked", out);
                return out;
            } else {
                console.log("Sorry! No Web Storage support..");
                return $("#mediaAutoplay").is(":checked");
            }
        },
        setAutoChange: function() {
            var self = this;
            var is_autoplay = self.getAutoChangePlayList();
            self.setAutoChangePlayList(is_autoplay);
            $("#mediaAutoplay").change(function(event) {
                self.setAutoChangePlayList($(this).is(":checked"));
            });
        },
        setVideoPlayer: function() {
            var self = this;
            var vplayer = videojs(self.vPlayerId, { controls: true, autoplay: true, preload: "none" }, function() {
                if (self.mediaId) {
                    this.src([{ type: "video/mp4", src: "resources/videos/" + self.mediaId + ".mp4" }]);
                    this.poster('resources/videos/posters/' + self.mediaId + '.jpg');
                }
            });
            vplayer.on('ended', $.proxy(this.setVideoEndEvent, this));
        },
        setVideoEndEvent: function(e) {

            var nextVideo = this.videoList[this.currentIndex + 1];
            if (nextVideo && this.getAutoChangePlayList()) {
                setTimeout(function() {
                    window.location.href = nextVideo + "#content";
                }, 1500)

            }
        }
    };
    undefined
    var audioPlayers = {
        init: function() {
            var $audios = $("audio.js-media-audio");
            var self = this;
            var audioOption = {
                controls: true,
                autoplay: false,
                loop: false,
                height: 100,
                plugins: {
                    wavesurfer: {
                        src: null,
                        msDisplayMax: 10,
                        debug: true,
                        waveColor: 'grey',
                        progressColor: '#0092f5',
                        cursorColor: 'white',
                        hideScrollbar: false
                    }
                }
            };
            self.audios = [];
            $audios.each(function(index) {
                this.pause();
                var src = null;
                var source = $(this).find("source");
                if (source.length) {
                    src = source.attr("src");
                    source.remove();
                }
                this.load();
                audioOption.plugins.wavesurfer.src = src;
                self.audios[index] = videojs(this, audioOption);
                self.audios[index].on('play', function(event) {
                    for (var i = 0; i < self.audios.length; i++) {
                        console.log(i, self.audios[i].currentTime());
                        if (self.audios[i].id() != event.target.id) {
                            self.audios[i].pause();
                            self.audios[i].currentTime(0);
                        }
                    }
                })
            });

        }
    };

    $(document).ready(function() {
        videoPlayList.init("videoMediaPlayer");
        audioPlayers.init();
    });

})(jQuery);