videojs.options.flash.swf = "../vendors/video.js/video-js.swf";

/* Custom */
(function($) {
    'use strict';
    $(document).ready(function() {
        function videoPlay(iframe, video) {
            if (iframe !== 'undefined') {
                // youtube or vimeo
                if (iframe.attr('src') !== '') {
                    var iframeLink = iframe.attr('src');
                    var linkAutoplay = iframeLink + (iframeLink.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
                    iframe.attr('src', linkAutoplay);
                } else {
                    iframe.attr('src', iframe.attr('data-mediasrc'));
                }
            } else if (video !== 'undefined') {
                // video
                video.get(0).play();
                video.trigger('resize');
            }
        }

        function videoStop(iframe, video) {
            if (iframe !== 'undefined') {
                iframe.attr('data-mediasrc', iframe.attr('src')).attr('src', '');
            } else if (video !== 'undefined') {
                video.get(0).stop();
                video.get(0).currentTime = 0;
            }
        }
        $("#mediaPlaylist").carousel({ interval: false });

        //Handles the carousel thumbnails
        var lastItemPlayingId = -1;
        $('[id^=carousel-selector-]').click(function(event) {
            event.preventDefault();
            var $this = $(this);
            var id = $this.attr('data-id');

            $('.media-playlist-item').removeClass('media-playlist-playing');
            $this.addClass('media-playlist-playing');
            $('.item').removeClass('active');

            var $thisItem = $('.slide-' + id);
            var $lastItem = lastItemPlayingId !== -1 ? $('.slide-' + lastItemPlayingId) : false;
            $thisItem.addClass('active');
            $thisItem.trigger('resize');
            if ($lastItem) {
                var $lastItemIframe = $lastItem.find('iframe').length > 0 ? $lastItem.find('iframe') : 'undefined';
                var $lastItemVideo = $lastItem.find('video').length > 0 ? $lastItem.find('video') : 'undefined';
                videoStop($lastItemIframe, $lastItemVideo);
            }
            var $itemIframe = $thisItem.find('iframe').length > 0 ? $thisItem.find('iframe') : 'undefined';
            var $itemVideo = $thisItem.find('video').length > 0 ? $thisItem.find('video') : 'undefined';
            videoPlay($itemIframe, $itemVideo);
            lastItemPlayingId = id;

        });
    });
})(jQuery);