var gulp  = require('gulp');
var argv = require('yargs').argv;
var config = require('../config');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var s18n = require('s18n');
var gulpIf = require('gulp-if');
var debug = require('gulp-debug');

var jade = require('gulp-jade');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var prefix = require('gulp-prefix');

reload = browserSync.reload;

gulp.task('html', function () {

    gulp.src(config.src.jade+'pages/*.jade')
      .pipe(debug())
      .pipe(jade()).on('error', function(){notify("Jade compile error");})
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(config.dest.html))
      .pipe(reload({stream: true}));
});

gulp.task('html:watch', function() {
    gulp.watch([
    	config.src.jade+'**/*',
    ], ['html']);
});
