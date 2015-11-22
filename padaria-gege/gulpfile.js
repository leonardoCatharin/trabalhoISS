'use strict';
let gulp        = require('gulp'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    babel       = require('babelify'),
    assign      = require('lodash.assign'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    jwt         = require('jsonwebtoken');



gulp.task('js', () => {
  let options = assign({}, watchify.args, {
    entries: './public/app.js',
    debug: true,
  });

  let b = watchify(browserify(options));

  b.on('update', bundl)

  function bundl(){
    b.transform(babel)
      .on('update', x => console.log('Atualizado com suuuucesssoooo'))
      .bundle()
      .on('error', x => console.log(x))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps:true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist/'))
  }

  bundl();
})

gulp.task('frontend:javascript', ['js']);
