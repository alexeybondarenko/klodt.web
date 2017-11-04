var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');
var rimraf = require('rimraf');
var ghPages = require('gulp-gh-pages');
var config = require('../config');
var sequence = require('gulp-sequence');

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


gulp.task('deploy', function () {
  return gulp.src([
      'build/**/*',
      'CNAME'
  ])
      .pipe(ghPages());
});