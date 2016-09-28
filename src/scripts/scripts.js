videojs.options.flash.swf = "../vendors/video.js/video-js.swf";

/* Custom */
(function($) {
    'use strict';
    $(document).ready(function() {
        // Video list
        var playList = [{
            sources: [{
                src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/sintel/poster.png',
            title: 'Video 1'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/bunny/poster.png',
            title: 'Video 2'
        }, {
            sources: [{
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://www.videojs.com/img/poster.jpg',
            title: 'Video 3'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/bunny/poster.png',
            title: 'Video 4'
        }, {
            sources: [{
                src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
                type: 'video/mp4'
            }],
            poster: 'http://media.w3.org/2010/05/video/poster.png',
            title: 'Video 5'
        }];
        var player = videojs($('#videoList')[0], {
            inactivityTimeout: 0
        });
        try {
            player.volume(0.5);
        } catch (e) {};
        player.playlist(playList);
        player.playlist.autoadvance(JSON.parse(2));
        var findData = function(obj, keystr) {
            var keys = keystr.split('.');

        };
        var replaceDataInPlaceholder = function(data, str) {
            str = str.replace(/\{\{(.*?)\}\}/g, function(all) {
                //console.log(all);
                all = all.replace(/[\{\}]/g, '');
                var value = eval('data.' + all);
                return value ? value : '';
            });
            //console.log(str);
            return str;
        }
        var playlistItemTpl = $('#playlistItemTpl').html();
        var $playlistTracks = $("#slider-thumbs");

        for (var i = 0; i < playList.length; i++) {
            var $playItem = $(replaceDataInPlaceholder(playList[i], playlistItemTpl));
            if (i == 0)
                $playItem.addClass('media-playlist-playing');
            $playItem.on('click', function(e) {
                $(this).parent().children().removeClass('media-playlist-playing');
                $(this).addClass('media-playlist-playing');
                player.playlist.currentItem(3);
                console.log(i);
            });
            $playlistTracks.append($playItem);
        }

    });




    $('.previous').on('click', function() {
        player.playlist.previous();
    });
    $('.next').on('click', function() {
        player.playlist.next();
    });
    $('[name=autoadvance]').each(function(e) {
        $(this).click(function() {
            var value = $(this).val();
            player.playlist.autoadvance(JSON.parse(value));
        });
    });

})(jQuery);