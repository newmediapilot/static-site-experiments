const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

const jsInput = [
    // node modules here
    './src/javascript/**/*.js'
];
const jsOutput = './js/';
const scssInput = './src/scss/**/*.scss';
const cssOutput = './css/';

gulp.task('js-concat', function () {
    return gulp
        .src(jsInput)
        .pipe(concat('all.js'))
        .on('error', sass.logError)
        .pipe(gulp.dest(jsOutput));
});

gulp.task('sass', function () {
    return gulp
        .src(scssInput)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(cssOutput));
});

gulp.task('css-clean', function () {
    return gulp
        .src(cssOutput + "/**/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('style', gulp.series('sass', 'css-clean'));
gulp.task('script', gulp.series('js-concat'));
gulp.task('all', gulp.series('style', 'script'));

gulp.task('watch', function () {
    gulp.series('all');
    gulp.watch([scssInput, jsInput], gulp.series('all'));
});