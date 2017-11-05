var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');
var rimraf = require('rimraf');
var ghPages = require('gulp-gh-pages');
var debug = require('gulp-debug');
var config = require('../config');
var sequence = require('gulp-sequence');
var prefix = require('gulp-prefix');
var gulpIf = require('gulp-if');
var packageJson = require('../../package.json')

gulp.task('watch', [
    'images:watch',
    'sass:watch',
    'copy:watch',
    'html:watch',
    'js:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['build', 'server', 'watch']);
gulp.task('build', sequence('delete',['html','images','copy','js','sass']));


gulp.task('deploy', ['build'], function () {
  return gulp.src([
      'build/**/*',
      'CNAME'
  ]).pipe(gulpIf('**/*.html', prefix(`/${packageJson.name}`)))
  .pipe(gulpIf('**/*.html', debug()))
      .pipe(ghPages());
});
