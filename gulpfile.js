// SASS
var gulp = require('gulp')
var sass = require('gulp-sass')
gulp.task('sass', function () {
  gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})

// TypeScript
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var tsProject = ts.createProject('src/tsconfig.json')
gulp.task('typescript', function () {
  var tsResult = gulp.src('./src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src'))
})
gulp.task('typescript:watch', ['typescript'], function () {
  gulp.watch('./src/**/*.ts', ['typescript'])
})