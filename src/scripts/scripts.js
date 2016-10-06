videojs.options.flash.swf = "../vendors/video.js/video-js.swf";
(function($) {
    'use strict';

    $(document).ready(function() {
        var $tracksDom = $('.media-playlist__tracks li .media-playlist__video');
        var queries = {};
        var getUrlQueries = function(queryStr) {
            var out = {};
            $.each(queryStr.split('&'), function(key, value) {
                var i = value.split('=');
                out[i[0].toString()] = i[1].toString();
            });
            return out;
        };
        queries = getUrlQueries(document.location.search.substr(1));
        var vplayerId = queries.watch;
        var videoList = [];
        var currentIndex = -1;

        $tracksDom.each(function(index) {
            var urldata = getUrlQueries(this.href.split('?')[1]);
            if (urldata) {
                var trackId = urldata.watch;
                if (trackId === vplayerId) {
                    $(this).parent().addClass("currently-playing");
                    currentIndex = index;
                }
                videoList[index] = trackId;
            }
        });

        var if_autoplay = true;
        var vplayer = videojs("videoMediaPlayer", { controls: true, autoplay: if_autoplay, preload: "none" }, function() {
            if (vplayerId) {
                this.src([{ type: "video/mp4", src: "videos/" + vplayerId + ".mp4" }]);
                this.poster('videos/posters/' + vplayerId + '.jpg');
            }
        });
        vplayer.on('ended', function() {
            console.log('awww...over so soon?');
            if (videoList[currentIndex + 1]) {
                setTimeout(function() {
                    window.location.href = "video-playlist.html?watch=" + videoList[currentIndex + 1];
                }, 1500)

            }
        });

    });

})(jQuery);