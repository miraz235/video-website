/**
 * b-media-xtend
 * @version 0.0.1
 * @copyright 2017 blogg.no
 * @license (MIT OR Apache-2.0)
 */
(function(videojs, utils, window) {
    'use strict';
    var mediaLang = utils.mediaLang;
    var helpers = utils.helpers;

    var bMediaXtend = function(media, isEmbed) {
        if (!media.option.player) { return; }

        var _playlist = {
                nexMediaUrl: '',
                listLength: 0,
                currentMediaIndex: 0
            },
            _timeupWaitingID = 0;

        var boxCloseControl = function(boxClass, title) {
            var closebtn = helpers.createElement('a', {
                title: title,
                href: "javascript:void(0)",
                class: "media-icon"
            });

            closebtn.addEventListener('click', function(event) {
                event.stopPropagation();
                helpers.$(document).find(boxClass + '.drawer').removeClass("open");
            });
            closebtn.innerHTML = '&times;';

            var wrapper = helpers.createElement('div', {
                class: "media-close text-muted"
            });
            wrapper.appendChild(closebtn);

            helpers.$(document).find(boxClass).prepend(wrapper).on('click', function(event) {
                event.stopPropagation();
            });
        };

        var setShareDrawer = function() {
            var btn = document.querySelector('#shareBtn');
            if (!btn) return;
            btn.style.display = 'inline-block';
            boxCloseControl(".media-share", mediaLang('CLOSE_SHARE'));
            helpers.$(document).find('#inputEmbedScript, #inputEmbedIframe').on('focus', function() {
                var $this = this;
                $this.previousElementSibling.style.display = 'none';
                window.setTimeout(function() {
                    $this.setSelectionRange(0, $this.value.length)
                });
            }).on('blur', function() {
                this.previousElementSibling.removeAttribute("style");
            });
        };

        var setVideoTitle = function(emHeader) {
            helpers.$(emHeader).find('.media-title a, .media-playlist__header__title a').on('click', function(event) {
                event.stopPropagation();
                media.option.player.pause();
            });
        };

        var setVideoHeader = function() {
            var emHeader = media.option.element.nextElementSibling;
            if (emHeader) {
                media.option.element.appendChild(emHeader);
                setVideoTitle(emHeader);
            }
        };

        var setButtons = function() {
            var area = helpers.$(document);
            area.find('[data-embutton]').on('click', function(event) {
                event.stopPropagation();
                switch (this.id) {
                    case 'downloadBtn':
                        media.playsAPICall();
                        return true;
                    default:
                        var drawers = area.find('.drawer[data-btnid=' + this.id + ']');
                        if (this.id && drawers.elements.length > 0) {
                            drawers.addClass('open');
                            media.option.player.pause();
                        }
                };

                return false;
            });
        };

        var setShare = function() {
            if (!media.option.element.parentElement) return;
            helpers.$(media.option.element.parentElement).find('.media-share .buttons a').on('click', function(event) {
                event.stopPropagation();
                if (this.classList.contains('email')) { return true; }
                helpers.openWindow(this.href,
                    this.class, {
                        width: 500,
                            height: 400
                    });
                return false;
            });
            setShareDrawer();
        };

        var setPlayListInteraction = function(tracksDom) {
            for (var i = 0; i < tracksDom.length; i++) {
                if (window.location.href.indexOf(tracksDom[i].href) > -1) {
                    var $parent = tracksDom[i].parentElement;
                    $parent.classList.add('currently-playing');
                    _playlist.currentMediaIndex = i + 1;
                    $parent.parentElement.scrollTop = $parent.offsetTop - $parent.scrollHeight / 2;
                    if (i > 0 && !helpers.detectmob()) {
                        media.initAds();
                        media.option.player.autoplay(true);
                    }
                    break;
                }
            }
            _playlist.listLength = tracksDom.length;
            if (!_playlist.currentMediaIndex && tracksDom.length) {
                _playlist.currentMediaIndex = 1;
                tracksDom[0].parentElement.classList.add('currently-playing');
            }
            if (_playlist.currentMediaIndex < _playlist.listLength) {
                _playlist.nexMediaUrl = tracksDom[_playlist.currentMediaIndex].href;
            }
        };

        var setTrackNumber = function() {
            var $trackNum = document.querySelector(".media-playlist__header__info span");
            $trackNum.innerHTML = _playlist.currentMediaIndex + '/' + _playlist.listLength;
        };

        var setPlaylistDrawer = function() {
            var btn = document.querySelector('#playListBtn');
            if (!btn) return;
            btn.style.display = 'inline-block';
            boxCloseControl(".media-playlist", mediaLang('CLOSE_PLAYLIST'));
        };

        var getAutoChangeValue = function() {
            if (typeof(localStorage) !== undefined && localStorage.autoplayPlaylist !== undefined) {
                var out = JSON.parse(localStorage.autoplayPlaylist);
                document.querySelector('#mediaAutoplay').checked = out;
                return out;
            } else {
                return document.querySelector('#mediaAutoplay').checked;
            }
        };

        var setAutoChange = function() {
            var autoplayCheckbox = document.querySelector('#mediaAutoplay');
            if (!autoplayCheckbox) return;
            if (typeof(localStorage) !== undefined) {
                var is_autoplay = getAutoChangeValue();
                localStorage.setItem("autoplayPlaylist", is_autoplay);
                autoplayCheckbox.addEventListener('change', function() {
                    localStorage.setItem("autoplayPlaylist", autoplayCheckbox.checked);
                })
            } else {
                console.log("Sorry! No Web Storage support..");
            }
        };

        var setPlayList = function() {
            var $tracksDom = helpers.$(document).find('.media-playlist__tracks li .media-playlist__' + media.option.type).elements;
            if ($tracksDom.length > 0) {
                setPlayListInteraction($tracksDom);
                if (media.option.type == 'video') {
                    if (isEmbed) {
                        setPlaylistDrawer();
                    } else {
                        setAutoChange();
                    }
                }
                setTrackNumber();
            }
        };

        var copyToClipboard = function(text) {
            if (typeof text != "string") { return; }
            var textArea = helpers.createElement('textarea', {
                style: {
                    'position': 'absolute',
                    'left': '-9999px',
                    'top': '0'
                }
            });

            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.setSelectionRange(0, textArea.value.length);

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            textArea.parentNode.removeChild(textArea);
        };

        var stopTimer = function() {
            window.clearTimeout(_timeupWaitingID);
            var ctimer = document.querySelector('#circulerTimer');
            if (ctimer) {
                ctimer.parentNode.removeChild(ctimer);
                document.querySelector('.vjs-big-play-button').removeAttribute('style');
            }
        };

        var addCirculerTimer = function() {
            var circulerTimer = '<div id="circulerTimer" class="radial-timer s-animate">' +
                '<div class="radial-timer-half"></div>' +
                '<div class="radial-timer-half"></div>' +
                '</div>';
            var ctDom = document.createElement("div");
            ctDom.innerHTML = circulerTimer;
            media.option.element.appendChild(ctDom.children.circulerTimer);
            var bigBtn = document.querySelector('.vjs-big-play-button');
            bigBtn.style.zIndex = 1112;
            bigBtn.style.backgroundColor = 'transparent';
        };

        var onMediaPlayEvent = function() {
            stopTimer();
        };

        var onMediaEndEvent = function() {
            stopTimer();
            var waitTime = 3000;
            if (_playlist.nexMediaUrl) {
                if (helpers.detectmob() || (media.option.type == 'video' && !isEmbed && !getAutoChangeValue())) {
                    return;
                }
                if (media.option.type == 'video') {
                    media.removeAds();
                    addCirculerTimer();
                }
                _timeupWaitingID = window.setTimeout((function() {
                    window.location.href = _playlist.nexMediaUrl;
                }).bind(this), waitTime);
            }
        };
        if (media.option.type == 'video') {
            isEmbed && setVideoHeader();
            media.option.player.contextmenuUI({
                content: [{
                    label: mediaLang('COPY_SCRIPT'),
                    listener: function() {
                        copyToClipboard(document.querySelector('#inputEmbedScript').value);
                    }
                }, {
                    label: mediaLang('COPY_EMBED'),
                    listener: function() {
                        copyToClipboard(document.querySelector('#inputEmbedIframe').value);
                    }
                }]
            });

        }
        media.option.player.on('play', onMediaPlayEvent);
        media.option.player.on('ended', onMediaEndEvent);

        isEmbed && setButtons();
        isEmbed && setShare();
        setPlayList();
    };

    window.bMediaXtend = bMediaXtend || {};
})(videojs, emUtils, window);