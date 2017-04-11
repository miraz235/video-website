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
    return request($config.concate.scripts.cdn.jquery)
        .pipe(source('jquery-3.1.1.js'))
};
var bootstrapjs = function() {
    return request($config.concate.scripts.cdn.bootstrap)
        .pipe(source('bootstrap.js'))
};
var videojsjs = function() {
    return request($config.concate.scripts.cdn.videojs)
        .pipe(source('video.min.js'))
};
var dashjs = function() {
    return request($config.concate.scripts.cdn.dash)
        .pipe(source('dash.all.min.js'))
};
var hlsjs = function() {
    return request($config.concate.scripts.cdn.hls)
        .pipe(source('videojs-contrib-hls.min.js'))
};
var adsjs = function() {
    return request($config.concate.scripts.cdn.ads)
        .pipe(source('videojs.ads.min.js'))
};
var imajs = function() {
    return request($config.concate.scripts.cdn.ima)
        .pipe(source('videojs.ima.js'))
};
gulp.task("scripts:emall", function(callback) {
    var src = $config.concate.scripts.local;
    src.push("dist/js/blogg-embed.js");
    var localjs = gulp.src(src);
    //var jq = jqueryjs.pipe($.clone());
    //console.log(jqueryjs);
    return merge(jqueryjs(), videojsjs(), hlsjs(), adsjs(), imajs(), localjs)
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
    src.push("dist/js/blogg-media.js");
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
    return request($config.concate.styles.cdn.bootstrap)
        .pipe(source('bootstrap.css'))
};
var videojscss = function() {
    return request($config.concate.styles.cdn.videojs)
        .pipe(source('video-js.css'))
};
var adscss = function() {
    return request($config.concate.styles.cdn.ads)
        .pipe(source('videojs.ads.css'))
};
var imacss = function() {
    return request($config.concate.styles.cdn.ima)
        .pipe(source('videojs.ima.css'))
};

gulp.task("styles:emall", function(callback) {
    var src = $config.concate.styles.local;
    src.push("dist/css/styles-embed.min.css");
    var localcss = gulp.src(src);
    return merge(videojscss(), adscss(), imacss(), localcss)
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
    src.push("dist/css/styles.min.css");
    var localcss = gulp.src(src);
    return merge(bootstrapcss(), videojscss(), adscss(), imacss(), localcss)
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

gulp.task("concate", ["styles", "scripts"], function(cb) {
    runSequence(["scripts:emall", "scripts:weball"], ["styles:emall", "styles:weball"], cb)
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
    gulp.watch($config.src.styles, ["concate", $reload]);
    gulp.watch($config.src.scripts, ["concate", $reload]);
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