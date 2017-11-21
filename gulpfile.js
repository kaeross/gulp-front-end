"use strict";

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    maps = './',
    rm = require('gulp-rm'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect');

//concatenates, minifies and copies js to dist/scripts folder
gulp.task("scripts", function () {
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
    return gulp.src([
            'sass/*.scss',
            'sass/circle/*.scss',
            'sass/circle/components/*.scss',
            'sass/circle/core/*.scss',
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest('dist/styles'));
});

//optimises images and copies to dist/content folder
gulp.task("images", function () {
    return gulp.src('images/*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 1
            }),
        ]))
        .pipe(gulp.dest('dist/content'));
});

gulp.task("clean", function () {
    return gulp.src('dist/**/*', {
            read: false
        })
        .pipe(rm({
            async: false
        }));
});

gulp.task("watch", function () {
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['styles']);
});

gulp.task("serve", function() {
    connect.server();
});

gulp.task("build", ['clean'], function () {
    gulp.start(['scripts', 'styles', 'images']);

});

gulp.task('default', ['build'], function() {
    gulp.start(['watch', 'serve']);
}); 