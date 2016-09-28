var assemble = require('assemble');
var extname = require('gulp-extname');
//var app = assemble();

//app.option('layout', 'base');

assemble.partials('src/templates/partials/*.hbs');
assemble.layouts('src/templates/layouts/*.hbs');
assemble.data(['src/templates/data/*.{json,yml}']);

assemble.task('default', function() {
    assemble.src('src/templates/pages/**/*.hbs')
        .pipe(assemble.dest('.tmp/static/'));
});