"use strict";

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    maps = './',
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    sequence = require('run-sequence'),
    connect = require('gulp-connect');

var options = {
    src: 'src',
    dist: 'dist'
};
var paths = {
    styles: {
        src: [
            options.src + '/sass/*.scss',
            options.src + '/sass/circle/*.scss',
            options.src + '/sass/circle/components/*.scss',
            options.src + '/sass/circle/core/*.scss',
        ],
        dest: options.dist + '/styles'
    },
    scripts: {
        src: [
            options.src + '/js/*.js',
            options.src + '/js/circle/*.js'
        ],
        dest: options.dist + '/scripts'
    },
    icons: {
        src: options.src + '/icons/*',
        dest: options.dist + '/content/icons'
    },
    images: {
        src: options.src + '/images/**/*',
        dest: options.dist + '/content/images'
    }

};

//concatenates, minifies and copies js to dist/scripts folder
gulp.task("scripts", function () {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify('all.min.js'))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest(paths.scripts.dest));
});

//concatenates, minifies and copies scss to dist/styles folder
gulp.task("styles", function () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('moveIcons', function () {
    gulp.src(paths.icons.src)
        .pipe(gulp.dest(paths.icons.dest));
});
//optimises images and copies to dist/content folder
gulp.task("images", ['moveIcons'], function () {
    return gulp.src(paths.images.src)
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
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task("clean", function () {
    del('dist/*');
});

gulp.task("watch", function () {
    gulp.watch([options.src + '/sass/**/*.sass', options.src + '/sass/**/*.scss'], ['styles'])
    .pipe(connect.reload());
});

gulp.task("build", function () {
    sequence('clean', ['scripts', 'styles', 'images'], function() {
        return gulp.src(options.src + '/index.html')
        .pipe(gulp.dest(options.dist + '/'));
    });
    
});

gulp.task('default', function () {
    sequence('build', 'watch', function () {
        connect.server({
            port: 8080,
            root: 'dist',
            livereload: true
        });
    });
});