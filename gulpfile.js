var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    proxy: "localhost:2368"
  });

  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/js/*.js", ['scripts']);
  gulp.watch(["*/**/*.hbs", "*.hbs", "src/scss/*.scss"]).on('change', browserSync.reload);
});

/**
 * Compile sass into CSS & auto-inject into browsers
 */
gulp.task('sass', function() {
  return gulp.src("src/scss/app.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

/**
 * Compile sass into minified CSS
 */
gulp.task('sass-prod', function() {
  return gulp.src("src/scss/app.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest("assets/css"))
});

/**
 * Concat JS files
 */
gulp.task('scripts', function() {
  return gulp.src(['src/js/jquery.fitvids.js', 'src/js/modernizr-custom.js', 'src/js/index.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('assets/js/'))
});

/**
 * Concat and uglify JS files
 */
gulp.task('scripts-prod', function() {
  return gulp.src(['src/js/jquery.fitvids.js', 'src/js/modernizr-custom.js', 'src/js/index.js'])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
});

/**
 * Watch task
 */
gulp.task('watch', ['browser-sync'], function() {

});

/**
 * Build task for deployment
 */
gulp.task('build', function(){
  gulp.start('scripts-prod', 'sass-prod')
})