var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

var conf = {
  'scriptPath': 'src/**/*.js',
  'scriptMinfileName': 'namer-min.js'
};


gulp.task('scripts', function() {

  gulp.src(conf.scriptPath)
    .pipe(uglify())
    .pipe(rename(conf.scriptMinfileName))
    .pipe(gulp.dest('dist'));

});


gulp.task('watch', function() {

  gulp.watch(conf.scriptPath, ['scripts']);

});


gulp.task('default', ['watch']);
gulp.task('build', ['scripts']);
