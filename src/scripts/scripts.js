videojs.options.flash.swf = "../vendors/video.js/video-js.swf";
(function($) {
    'use strict';

    $(document).ready(function() {
        naTpl.initialize();

        // Video list
        var playList = [{
            sources: [{
                src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/sintel/poster.png',
            title: 'Video 1',
            duration: '0:52'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/bunny/poster.png',
            title: 'Video 2',
            duration: '0.32'
        }, {
            sources: [{
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://www.videojs.com/img/poster.jpg',
            title: 'Video 3',
            duration: '0.46'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/bunny/poster.png',
            title: 'Video 4',
            duration: '0.32'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/bunny/poster.png',
            title: 'Video 4',
            duration: '0.32'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
                type: 'video/mp4',
            }],
            poster: 'http://media.w3.org/2010/05/video/poster.png',
            title: 'Video 5',
            duration: '5:00'
        }];

        var player = videojs($('#videoList')[0], {
            inactivityTimeout: 0
        });
        try {
            player.volume(0.5);
        } catch (e) {};
        player.playlist(playList);
        player.playlist.autoadvance(JSON.parse(0));

        var $playlistTracks = $("#slider-thumbs");
        var currenItemId = 0;

        player.on('beforeplaylistitem', function() {
            var beforeItemId = player.playlist.currentItem();
            if (currenItemId == beforeItemId) {
                currenItemId++;
            }
            var $item = $playlistTracks.find('[data-id="' + currenItemId + '"]');
            $item.parent().children().removeClass('media-playlist-playing');
            $item.addClass('media-playlist-playing');

            $playlistTracks.animate({
                scrollTop: currenItemId * $item.outerHeight() + 1
            }, 1000);
        });

        for (var i = 0; i < playList.length; i++) {
            playList[i].index = i.toString();
            var $playItem = naTpl.getTemplate(playList[i], "playlistItemTpl");
            if (i == 0)
                $playItem.addClass('media-playlist-playing');
            $playItem.on('click', function(e) {
                currenItemId = $(this).attr('data-id')
                player.playlist.currentItem(JSON.parse(currenItemId));
            });
            $playlistTracks.append($playItem);
        }

    });

})(jQuery);