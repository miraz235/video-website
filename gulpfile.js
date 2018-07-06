var gulp = require("gulp");
var del = require("del");
var path = require("path");
var browserSync = require("browser-sync");
var runSequence = require("run-sequence");
var swPrecache = require("sw-precache");
var gulpLoadPlugins = require("gulp-load-plugins");
var merge = require('merge-stream');
var assemble = require('assemble');
var merge = require('merge2');
var request = require('request');
var source = require('vinyl-source-stream');

var $ = gulpLoadPlugins();
var $config = require("./config.json");
var $reload = browserSync.reload;
var $app = assemble();
var replaceObj = (function() {
    var r = { demo: {}, dev: {} };

    for (var prop in $config.replace.keys) {
        //if ($config.replace.keys[prop].demo)
        r.demo[prop] = $config.replace.keys[prop].demo;
        //if ($config.replace.keys[prop].dev)
        r.dev[prop] = $config.replace.keys[prop].dev;
    }

    return r;
})();

gulp.task('assemble', function() {
    gulp.src($config.src.templates)
        .pipe($.assemble($config.assemble))
        .pipe(gulp.dest($config.tmp.static));
});

gulp.task("images", function() {
    gulp.src($config.src.images)
        .pipe($.newer($config.tmp.images))
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest($config.tmp.images))
        .pipe($.size({
            title: "images",
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.images));
});

gulp.task("html", function() {
    return gulp.src($config.src.htmls)
        // Minify any HTML
        .pipe($.if($config.compress.html, $.if("*.html", $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        }))))
        // Output files
        .pipe($.if('*.html', $.size({
            title: 'html',
            showFiles: true
        })))
        .pipe(gulp.dest($config.dist.htmls));

});
gulp.task("scripts:tmp", function(callback) {
    return gulp.src($config.src.scripts)
        .pipe(gulp.dest($config.tmp.scripts))
        .pipe($.foreach(function(stream, file) {
            var name = path.basename(file.path);
            var isTheFile = (!!~$config.replace["in-files"].indexOf(name));
            return stream
                .pipe($.if(isTheFile, $.rename({
                    suffix: "-demo"
                })))
                .pipe($.if(isTheFile, $.replaceTask({
                    patterns: [{
                        json: replaceObj.demo
                    }]
                })))
                .pipe(gulp.dest($config.tmp.scripts));
        }))
});

gulp.task("scripts", ["scripts:tmp"], function(callback) {
    return gulp.src($config.tmp["scripts-files"])
        //.pipe($.newer($config.tmp.scripts))
        .pipe($.replaceTask({
            patterns: [{
                json: replaceObj.dev
            }]
        }))
        .pipe(gulp.dest($config.tmp.scripts))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts))
        .pipe($.rename({
            extname: ".min.js"
        }))
        .pipe($.if($config.compress.js, $.uglify({
            preserveComments: 'some'
        })))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts));
});

var jqueryjs = function() {
    console.log('cdn jqueryjs');
    return request($config.concate.scripts.cdn.jquery)
        .pipe(source('jquery-3.2.1.js'))
        // .pipe($.size({
        //     title: 'cdn jqueryjs',
        //     showFiles: true
        // }))
};
var bootstrapjs = function() {
    console.log('cdn bootstrapjs');
    return request($config.concate.scripts.cdn.bootstrap)
        .pipe(source('bootstrap.js'))
        // .pipe($.size({
        //     title: 'cdn bootstrapjs',
        //     showFiles: true
        // }))
};
var videojsjs = function() {
    console.log('cdn videojsjs');
    return request($config.concate.scripts.cdn.videojs)
        .pipe(source('video.min.js'))
        // .pipe($.size({
        //     title: 'cdn videojsjs',
        //     showFiles: true
        // }))
};
var dashjs = function() {
    console.log('cdn dashjs');
    return request($config.concate.scripts.cdn.dash)
        .pipe(source('dash.all.min.js'))
        // .pipe($.size({
        //     title: 'cdn dashjs',
        //     showFiles: true
        // }))
};
var hlsjs = function() {
    console.log('cdn hlsjs');
    return request($config.concate.scripts.cdn.hls)
        .pipe(source('videojs-contrib-hls.min.js'))
        // .pipe($.size({
        //     title: 'cdn hlsjs',
        //     showFiles: true
        // }))
};
var adsjs = function() {
    console.log('cdn adsjs');
    return request($config.concate.scripts.cdn.ads)
        .pipe(source('videojs.ads.min.js'))
        // .pipe($.size({
        //     title: 'cdn adsjs',
        //     showFiles: true
        // }))
};
var imajs = function() {
    console.log('cdn imajs');
    return request($config.concate.scripts.cdn.ima)
        .pipe(source('videojs.ima.js'))
        // .pipe($.size({
        //     title: 'cdn imajs',
        //     showFiles: true
        // }))
};
gulp.task("scripts:emall", function(callback) {
    var src = $config.concate.scripts.local;
    src.push("dist/js/em-utils.js");
    src.push("dist/js/b-media.js");
    src.push("dist/js/b-media-xtend.js");
    var localjs = gulp.src(src);
    //var jq = jqueryjs.pipe($.clone());
    //console.log(jqueryjs);
    return merge(videojsjs(), adsjs(), hlsjs(), imajs(), localjs)
        .pipe($.buffer())
        .pipe($.concat('all-embed.js'))
        .pipe(gulp.dest($config.tmp.root))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts))
        .pipe($.rename({
            extname: ".min.js"
        }))
        .pipe($.if($config.compress.js, $.uglify({
            preserveComments: 'some'
        })))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts));
});

gulp.task("scripts:weball", function(callback) {
    var src = $config.concate.scripts.local;
    src.push("dist/js/em-utils.js");
    src.push("dist/js/b-media.js");
    src.push("dist/js/b-media-xtend.js");
    var localjs = gulp.src(src);

    return merge(jqueryjs(), bootstrapjs(), videojsjs(), hlsjs(), adsjs(), imajs(), localjs)
        .pipe($.buffer())
        .pipe($.concat('all-web.js'))
        .pipe(gulp.dest($config.tmp.root))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts))
        .pipe($.rename({
            extname: ".min.js"
        }))
        .pipe($.if($config.compress.js, $.uglify({
            preserveComments: 'some'
        })))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.scripts));
});


var bootstrapcss = function() {
    console.log('cdn bootstrapcss');
    return request($config.concate.styles.cdn.bootstrap)
        .pipe(source('bootstrap.css'))
};
var videojscss = function() {
    console.log('cdn videojscss');
    return request($config.concate.styles.cdn.videojs)
        .pipe(source('video-js.css'))
};
var adscss = function() {
    console.log('cdn adscss');
    return request($config.concate.styles.cdn.ads)
        .pipe(source('videojs.ads.css'))
};
var imacss = function() {
    console.log('cdn imacss');
    return request($config.concate.styles.cdn.ima)
        .pipe(source('videojs.ima.css'))
};
var fontcss = function() {
    console.log('cdn fontcss');
    return request($config.concate.styles.cdn.font)
        .pipe(source('font.css'))
};

gulp.task("styles:emall", function(callback) {
    var src = $config.concate.styles.local;
    src.push(".tmp/css/styles-embed.css");
    var localcss = gulp.src(src);
    return merge(fontcss(), videojscss(), adscss(), imacss(), localcss)
        .pipe($.buffer())
        .pipe($.concat('all-embed.css'))
        .pipe(gulp.dest($config.tmp.root))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'styles',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.styles))
        .pipe($.rename({
            extname: ".min.css"
        }))
        .pipe($.postcss([
            require('cssnano')({ zindex: false }),
            require('postcss-reporter')
        ]))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'styles',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.styles));
});
gulp.task("styles:weball", function(callback) {
    var src = $config.concate.styles.local;
    src.push(".tmp/css/styles.css");
    var localcss = gulp.src(src);
    return merge(fontcss(), bootstrapcss(), videojscss(), adscss(), imacss(), localcss)
        .pipe($.buffer())
        .pipe($.concat('all-web.css'))
        .pipe(gulp.dest($config.tmp.root))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'styles',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.styles))
        .pipe($.rename({
            extname: ".min.css"
        }))
        .pipe($.postcss([
            require('cssnano')({ zindex: false }),
            require('postcss-reporter')
        ]))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'styles',
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.styles));
});

gulp.task("concate:styles", ["styles"], function(cb) {
    runSequence(["styles:emall", "styles:weball"], cb)
});
gulp.task("concate:scripts", ["scripts"], function(cb) {
    runSequence(["scripts:emall", "scripts:weball"], cb)
});
gulp.task("concate:emall", [], function(cb) {
    runSequence(["styles:emall", "scripts:emall"], cb)
});
gulp.task("concate:weball", [], function(cb) {
    runSequence(["styles:weball", "scripts:weball"], cb)
});
gulp.task("concate", ["styles", "scripts"], function(cb) {
    runSequence(["concate:emall", "concate:weball"], cb)
});

gulp.task("styles", [], function() {
    var processors = [
        require('postcss-csssimple'), // fix common browser bugs
        require('autoprefixer')({ browsers: $config.browsers }), // add vendor prefixes
        require('cssnano')({ zindex: false }), // minify the result
        require('postcss-reporter')
    ];
    return gulp.src($config.src.styles)
        .pipe($.newer($config.tmp.styles))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.sass({
            precision: 10
        }).on("error", $.sass.logError))
        .pipe($.size({
            title: "sassify",
            showFiles: true
        }))
        .pipe(gulp.dest($config.tmp.styles))
        .pipe($.postcss(processors))
        .pipe($.rename({
            extname: ".min.css"
        }))
        .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: "styles",
            showFiles: true
        }))
        .pipe(gulp.dest($config.dist.styles));
});

gulp.task("lint:styles", function() {
    var processors = [
        require('stylelint'),
        require('postcss-reporter')
    ];
    return gulp.src($config.src.styles)
        .pipe($.postcss(
            processors, { syntax: require('postcss-scss') }
        ));
})

// Watch files for changes & reload
gulp.task("serve", ["default"], function() {
    browserSync({
        notify: false,
        server: $config.dist.root,
        port: 3000
    });

    gulp.watch($config.src.htmls, ["html", $reload]);
    gulp.watch($config.src.styles, ["concate:styles", $reload]);
    gulp.watch($config.src.scripts, ["concate:scripts", $reload]);
    gulp.watch($config.src.images, $reload);
});

gulp.task("serve:only", [], function() {
    browserSync({
        notify: false,
        server: $config.dist.root,
        port: 3000
    });

    gulp.watch($config.src.htmls, ["html", $reload]);
    gulp.watch($config.src.styles, ["concate:styles", $reload]);
    gulp.watch($config.src.scripts, ["concate:scripts", $reload]);
    gulp.watch($config.src.images, $reload);
});

gulp.task("clean", function() {
    del($config.clean, { dot: true });
});

gulp.task("copy:fonts", function() {
    var jsBundleStreams = [];

    // Create array of individual bundle streams
    for (var key in $config.src.fonts) {
        if ($config["vendors-active"].indexOf(key) === -1)
            continue;
        jsBundleStreams.push(gulp.src($config.src.fonts[key])
            .pipe(gulp.dest($config.dist.fonts + '/' + key))
        );
    }
    // Merge and return streams
    return merge(jsBundleStreams);
});

gulp.task("copy:vendors", function(callback) {
    var jsBundleStreams = [];

    // Create array of individual bundle streams
    for (var key in $config.src.vendors) {
        if ($config["vendors-active"].indexOf(key) === -1)
            continue;
        jsBundleStreams.push(gulp.src($config.src.vendors[key])
            .pipe(gulp.dest($config.dist.vendors + '/' + key))
        );
    }

    // Merge and return streams
    return merge(jsBundleStreams);

});

// Copy all files at the root level (src)
gulp.task("copy", ["copy:vendors", "copy:fonts"], function() {
    /*if (!$config["service-worker"])
        $config.copy.push("!src/service-worker.js");*/
    gulp.src($config.copy, { dot: true })
        .pipe($.size({ title: "copy" }))
        .pipe(gulp.dest($config.dist.root));
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task("copy:sw-scripts", function() {
    return gulp.src([$config.sw, $config.src.sw])
        .pipe(gulp.dest($config.tmp.sw))
        .pipe(gulp.dest($config.dist.sw));
});

gulp.task("generate-service-worker", ["copy:sw-scripts"], function() {

    var filepath = path.join($config.dist.root, "service-worker.js");

    return swPrecache.write(filepath, {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: "basic-frontend-3",
        // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
        importScripts: [
            `${$config.dist.sw}/sw-toolbox.js`,
            `${$config.dist.sw}/runtime-caching.js`
        ],
        staticFileGlobs: [
            `${$config.dist.images}/**/*`,
            `${$config.dist.scripts}/**/*.js`,
            `${$config.dist.styles}/**/*.css`,
            `${$config.dist.root}/*.{html,json}`
        ],
        stripPrefix: `${$config.dist.root}/`
    })
});

// Build production files, the default task
gulp.task("default", ["clean"], function(callback) {
    var tasks = ["copy", "html", "concate", "images"];
    if ($config["service-worker"])
        tasks.push("generate-service-worker");
    runSequence("styles", tasks, callback);
});