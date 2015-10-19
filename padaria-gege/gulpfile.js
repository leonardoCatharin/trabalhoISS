'use strict';
let gulp        = require('gulp'),
    browserify  = require('browserify'),
    babel       = require('babelify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify');



gulp.task('js', () => {
  let b = browserify({
    entries: './public/app.js',
    debug: true
  }).transform(babel);

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/dist/'))
})
