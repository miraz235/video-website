(function($) {
    'use strict';

    $(document).ready(function() {
        var videoSingle = bloggMedia('video').setMediaPlayer("#videoSingle", {
            html5: {
                hlsjsConfig: {
                    autoStartLoad: true,
                    debug: true
                }
            }
        });
        videoSingle.setPlugins({
            watermark: { image: '' }
        });
        var videoMediaPlayer = bloggMedia('video').setMediaPlayer("#videoMediaPlayer", {
            html5: {
                hlsjsConfig: {
                    autoStartLoad: true,
                    debug: true
                }
            }
        }).setPlayList('.media-playlist__tracks li .media-playlist__video');
        var audioSingle = bloggMedia('audio').setMediaPlayer("#audioSingle");

        var audiosInPage = bloggMedia('audio');
        var $audios = $("audio.js-media-audio");
        $audios.each(function(index) {
            audiosInPage.addMediaPlayer(this);
        });
    });

})(jQuery);