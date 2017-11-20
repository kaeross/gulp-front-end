"use strict";

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//concatenates, minifies and copies to dist/scripts folder
gulp.task("scripts", function() {
    console.log('run scripts task');
    return gulp.src([
        'js/*.js',
        'js/circle/*.js'])
        //concatenate
        .pipe(concat('all.min.js'))
        .pipe(uglify('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task("styles", function() {
    console.log('run styles task');
});

gulp.task("images", function() {
    console.log('run images task');
});

gulp.task("clean", function() {
    console.log('run clean task');
});

gulp.task("build", function() {
    
});

gulp.task('default', ['build'], function() {

});