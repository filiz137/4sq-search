'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./assets/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src("./sass/*.scss")
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(autoprefixer({
			browsers: ['> 1%', 'iOS 8', 'ie 9'],
			cascade: false
		}))
    .pipe(gulp.dest("./assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src("./assets/js/*.js")
  .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest("./assets/js/es"));
});


gulp.task('default', ['serve']);

