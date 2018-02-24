'use strict';

var path = require('path'),
    gulp = require('gulp'),
    config = require('./build.conf.js'),
    plugins = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return gulp
        .src(config.buildFolder, { read: false })
        .pipe(plugins.clean());
});

gulp.task('scripts', function () {
    return gulp.src(config.srcJs)

        // package
        .pipe(plugins.concat(config.buildJsFilename))
        .pipe(plugins.header(config.closureStart))
        .pipe(plugins.footer(config.closureEnd))
        .pipe(plugins.header(config.banner))
        .pipe(gulp.dest(config.buildFolder))
        .pipe(plugins.filesize())

        // minify
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ extname: '.min.js' }))
        .pipe(gulp.dest(config.buildFolder))
        .pipe(plugins.filesize())
        .on('error', plugins.util.log);
});

gulp.task('default', ['scripts']);