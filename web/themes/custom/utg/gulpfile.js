var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  cp = require('child_process'),
  sassGlob = require('gulp-sass-glob');

/**
 * Launch the Server
 */
gulp.task('browser-sync', ['sass', 'layouts-sass', 'scripts'], function() {
  browserSync.init({
    open: false,
    injectChanges: true,
    // Change as required, also remember to set in theme settings
    proxy: 'utg.lndo.site'
  });
});

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function() {
  return gulp
    .src('scss/styles.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('layouts-sass', function() {
  return gulp
    .src('scss/utg-layouts.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * @task scripts
 * Compile files from js
 */
gulp.task('scripts', function() {
  return (
    gulp
      // .src(['js/*.js', 'js/utg.js'])
      .src(['js/common/*.js'])
      .pipe(
        babel({
          presets: ['@babel/env']
        })
      )
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({ stream: true }))
  );
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function(done) {
  return cp.spawn('drush', ['cache-rebuild'], { stdio: 'inherit' }).on('close', done);
});

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['clearcache'], function() {
  browserSync.reload();
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function() {
  gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass', 'layouts-sass']);
  gulp.watch(['js/*.js'], ['scripts']);
  gulp.watch(['templates/*.html.twig', '**/*.yml'], ['reload']);
});

/**
 * Default task, running just `gulp` will
 * compile Sass files, launch BrowserSync, watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
