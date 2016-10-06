videojs.options.flash.swf = "../vendors/video.js/video-js.swf";
(function($) {
    'use strict';
    var getUrlQueries = function(queryStr) {
        var out = {};
        $.each(queryStr.split('&'), function(key, value) {
            var i = value.split('=');
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
            this.setMediaId();
            this.setVideoList();
            this.setVideoPlayer();
        },
        setMediaId: function() {
            var queries = getUrlQueries(document.location.search.substr(1));
            this.mediaId = queries.watch
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
        setVideoPlayer: function() {
            var self = this;
            var if_autoplay = true;
            var vplayer = videojs(self.vPlayerId, { controls: true, autoplay: if_autoplay, preload: "none" }, function() {
                if (self.mediaId) {
                    this.src([{ type: "video/mp4", src: "resources/videos/" + self.mediaId + ".mp4" }]);
                    this.poster('resources/videos/posters/' + self.mediaId + '.jpg');
                }
            });
            vplayer.on('ended', $.proxy(this.setVideoEndEvent, this));
        },
        setVideoEndEvent: function(e) {
            var nextVideo = this.videoList[this.currentIndex + 1];
            if (nextVideo) {
                setTimeout(function() {
                    window.location.href = nextVideo;
                }, 1500)

            }
        }
    };

    var audioPlayers = {
        init: function() {

        }
    };

    $(document).ready(function() {
        videoPlayList.init("videoMediaPlayer");
        audioPlayers.init();
    });

})(jQuery);