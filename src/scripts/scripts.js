(function($) {
    'use strict';

    $(document).ready(function() {
        var videoSingle = bloggMedia('video').setMediaPlayer("#videoSingle");
        var videoMediaPlayer = bloggMedia('video').setMediaPlayer("#videoMediaPlayer").setPlayList('.media-playlist__tracks li .media-playlist__video');
        var audioSingle = bloggMedia('audio').setMediaPlayer("#audioSingle");

        var audiosInPage = bloggMedia('audio');
        var $audios = $("audio.js-media-audio");
        $audios.each(function(index) {
            audiosInPage.addMediaPlayer(this);
        });
    });

})(jQuery);