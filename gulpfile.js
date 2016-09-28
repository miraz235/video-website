var gulp = require("gulp");
var del = require("del");
var path = require("path");
var browserSync = require("browser-sync");
var runSequence = require("run-sequence");
var swPrecache = require("sw-precache");
var gulpLoadPlugins = require("gulp-load-plugins");
var merge = require('merge-stream');
var assemble = require('assemble');

var $ = gulpLoadPlugins();
var $config = require("./config.json");
var $reload = browserSync.reload;
var $distName = $config.dist.root + "/";
var $app = assemble();



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
        .pipe(gulp.dest($distName + $config.dist.images));
});

gulp.task("html", function() {
    return gulp.src($config.src.htmls)
        // Minify any HTML
        .pipe($.if("*.html", $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        })))
        // Output files
        .pipe($.if('*.html', $.size({
            title: 'html',
            showFiles: true
        })))
        .pipe(gulp.dest($distName + $config.dist.htmls));

});

gulp.task("scripts", function(callback) {
    return gulp.src($config.src.scripts)
        .pipe($.newer($config.tmp.scripts))
        .pipe($.if($config.sourcemap, $.sourcemaps.init()))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe($.rename({
            extname: ".min.js"
        }))
        .pipe($.uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest($config.tmp.scripts))

    .pipe($.if($config.sourcemap, $.sourcemaps.write('.')))
        .pipe($.size({
            title: 'scripts',
            showFiles: true
        }))
        .pipe(gulp.dest($distName + $config.dist.scripts));
});

gulp.task("styles", ["lint:styles"], function() {
    var processors = [
        require('postcss-csssimple'), // fix common browser bugs
        require('autoprefixer')({ browsers: $config.browsers }), // add vendor prefixes
        require('cssnano')(), // minify the result
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
        .pipe(gulp.dest($distName + $config.dist.styles));
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
    gulp.watch($config.src.styles, ["styles", $reload]);
    gulp.watch($config.src.scripts, ["scripts", $reload]);
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
            .pipe(gulp.dest($distName + $config.dist.fonts + '/' + key))
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
            .pipe(gulp.dest($distName + $config.dist.vendors + '/' + key))
        );
    }

    // Merge and return streams
    return merge(jsBundleStreams);

});

// Copy all files at the root level (src)
gulp.task("copy", function() {
    gulp.src($config.copy, { dot: true })
        .pipe($.size({ title: "copy" }))
        .pipe(gulp.dest($config.dist.root));
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task("copy:sw-scripts", function() {
    return gulp.src([$config.sw, $config.src.sw])
        .pipe(gulp.dest($config.tmp.sw))
        .pipe(gulp.dest($distName + $config.dist.sw));
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
            `${$distName + $config.dist.images}/**/*`,
            `${$distName + $config.dist.scripts}/**/*.js`,
            `${$distName + $config.dist.styles}/**/*.css`,
            `${$config.dist.root}/*.{html,json}`
        ],
        stripPrefix: $distName
    })
});

// Build production files, the default task
gulp.task("default", ["clean"], function(callback) {
    runSequence("styles", ["copy", "html", "scripts", "styles", "images", "copy:vendors", "copy:fonts"],
        "generate-service-worker",
        callback);
});