function parseBlogName(blogurl) {
    try {
        var urlParts = emUtils.helpers.getLocation(blogurl);
        var domain = urlParts.hostname;
        return domain.substring(0, domain.indexOf("."));

    } catch (e) {}

    return "";
}

function isTrue(value) {
    return value == 'true' || value == true || value == 1 || value == '1';
}

function displayPlayerStats(bl_id, vi_id, placeholderClass) {
    emUtils.helpers.ajaxGet("//hits.blogsoft.org/stats?id=" + bl_id + "&vid=" + vi_id, function(data) {
        if (data.success & data.video_hits_total > 0) {
            document.querySelector("." + placeholderClass).innerHTML = '<b>' + data.video_hits_total + '</b> Avspillinger';
        }
    });
}

function displayAudioPlayerStats(bl_id, au_id, placeholderClass) {
    emUtils.helpers.ajaxGet("//hits.blogsoft.org/stats?id=" + bl_id + "&aid=" + au_id, function(data) {
        if (data.success & data.audio_hits_total > 0) {
            document.querySelector("." + placeholderClass).innerHTML = '<b>' + data.audio_hits_total + '</b> Avspillinger';
        }
    });
}

function updateAudioPlayerStats(bl_id, au_id) {
    emUtils.helpers.ajaxGet("//hits.blogsoft.org?id=" + bl_id + "&aid=" + au_id + "&callback=?");
}

function resetAdUrlBasedOnDuration(video) {
    if (!video) return null;

    var adhost = 'https://pubads.g.doubleclick.net/gampad/ads';
    var adparams = {
        sz: '640x480',
        iu: '/5374/TV2video/nettavisen/bloggno',
        gdfp_req: 1,
        env: 'vp',
        output: 'vast',
        unviewed_position_start: 1,
        description_url: (document.referrer == '' ? document.location.href : document.referrer),
        correlator: new Date().getUTCMilliseconds(),
        hl: 'no',
        sdkv: 'h.3.153.3',
        sdki: 'd',
        scor: '2299575987365357',
        adk: '3757432570',
        osd: 2,
        frm: 0,
        sdr: 1,
        afvsz: '200x200,250x250,300x250,336x280,450x50,468x60,480x70,728x90',
        url: (document.referrer == '' ? document.location.href : document.referrer),
        cust_params: ''
    };

    switch (video.userInfo.video_ad_type) {
        case 'partner':
            adparams.iu = '/5374/tv2video/nettavisen/bloggno/samarbeidsbloggere/' + parseBlogName(video.blog_url);
            break;
        case 'na':
            adparams.iu = '/5374/tv2video/nettavisen/Nettavisen';
            break;
        case 'side3video':
            adparams.iu = '/5374/tv2video/nettavisen/side3';
            break;
        case 'nasportvideo':
            adparams.iu = '/5374/tv2video/nettavisen/sport';
            break;
        case 'side2video':
            adparams.iu = '/5374/tv2video/nettavisen/Side2/';
            break;
        default:
            adparams.iu = '/5374/tv2video/nettavisen/bloggno/communitybloggere/' + video.userInfo.bl_id + '/' + video.vi_id;
    }

    var videoDuration = parseInt(video.duration);
    if (!videoDuration || isNaN(Number(videoDuration))) {
        videoDuration = 1000;
    }
    videoDuration = videoDuration / 1000;
    var durations = [0, 15, 45, 90, 180, 360, 900];
    for (var dfpDuration = 0; dfpDuration < durations.length; dfpDuration++) {
        if (videoDuration <= durations[dfpDuration]) {
            break;
        }
    }

    var custom_params = {
        dfpduration: dfpDuration
    };

    if (!window.google) {
        custom_params.vp_abl = 1;
    }

    adparams.cust_params = emUtils.helpers.serializeUrl(custom_params);
    return adhost + '?' + emUtils.helpers.serializeUrl(adparams);
}

function ooyalaLocalConfig(video) {
    var ooyalaConfigUrl = '';
    if (video && video.userInfo) {
        switch (video.userInfo.video_ad_type) {
            case 'na':
                ooyalaConfigUrl = 'https://static.blogg.no/blogs/media/js/ooyala/clientConfig_nettavisen.no.json';
                break;
            case 'side2video':
                ooyalaConfigUrl = 'https://static.blogg.no/blogs/media/js/ooyala/clientConfig_side2.no.json';
                break;
            default:
                ooyalaConfigUrl = 'https://static.blogg.no/blogs/media/js/ooyala/clientConfig_blogg.no.json';
        }
    }
    return ooyalaConfigUrl;
}

function getVideoPlayerPlugin(video) {
    if (!video) return {};
    var watermarkImage = isTrue(video.has_ads) ? '//static.blogg.no/blogs/media/resources/img/imgpsh_fullsize.png' : '';

    /*if (navigator.userAgent.match(/Android/i)) {
        video.userInfo.hasAds = false;
    }*/

    var adTagUrl = isTrue(video.userInfo.hasAds) ? resetAdUrlBasedOnDuration(video) : null;
    return {
        ima: {
            prerollTimeout: 15000,
            timeout: 15000,
            adTagUrl: adTagUrl
        }
    }
}