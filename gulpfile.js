"use strict";

let gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    maps = './';

//concatenates, minifies and copies js to dist/scripts folder
gulp.task("scripts", function () {
    console.log('run scripts task');
    return gulp.src([
            'js/*.js',
            'js/circle/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify('all.min.js'))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest('dist/scripts'));
});

//concatenates, minifies and copies scss to dist/styles folder
gulp.task("styles", function () {
    console.log('run styles task');
    return gulp.src([
            'sass/*.scss',
            'sass/circle/*.scss',
            'sass/circle/components/*.scss',
            'sass/circle/core/*.scss',
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("images", function () {
    console.log('run images task');
});

gulp.task("clean", function () {
    console.log('run clean task');
});

gulp.task("build", ['clean', 'scripts', 'styles', 'images']);

gulp.task('default', ['build'], function () {
    gulp.watch('sass/**/*.scss/', ['styles']);
});