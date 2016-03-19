var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var runSequence = require('run-sequence');

// linting task runner
gulp.task('lint', function() {
	return gulp.src(['test/**/*.js', 'server.js', 'gulpfile.js', 'modules/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// testing task runner
gulp.task('test', function() {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({ reporter: 'spec' }))
		.on('error', util.log);
});

// build task runner, sequentially
gulp.task('build', function(callback) {
	runSequence('lint', 'test', callback);
});

// default task
gulp.task('default', ['build']);