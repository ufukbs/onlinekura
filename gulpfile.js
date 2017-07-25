var gulp    = require('gulp'),
  concat    = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  uglify    = require('gulp-uglify');

var vendorLocation = 'bower_components/', jsLocation = 'assets/src/js/', dist = 'assets/dist';

gulp.task('minify-css', function() {
  return gulp.src([
    vendorLocation + 'bootstrap/dist/css/bootstrap.min.css',
    vendorLocation + 'jquery-floating-social-share/dist/jquery.floating-social-share.min.css',
    vendorLocation + 'font-awesome/css/font-awesome.min.css',
    'assets/src/css/style.css'
  ]).pipe(concat('style.min.css')).pipe(minifyCss({compatibility: 'ie8'})).pipe(gulp.dest(dist));
});

gulp.task('scripts', function() {
  return gulp.src([
    vendorLocation + 'jquery/dist/jquery.min.js',
    vendorLocation + 'jquery-floating-social-share/dist/jquery.floating-social-share.min.js',
    vendorLocation + 'webfontloader/webfontloader.js',
    vendorLocation + 'bootstrap/dist/js/bootstrap.min.js',
    jsLocation     + 'game.js',
    jsLocation     + 'script.js',
    jsLocation     + 'modules.js'
  ]).pipe(concat('script.min.js')).pipe(uglify({mangle: false})).pipe(gulp.dest(dist));
});

gulp.task('default', function() {
  gulp.run('scripts', 'minify-css');
});
