const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

const njkInput = [
    './src/_includes/**/*.njk',
    './src/content/**/*.njk'
];
const jsInput = [
    // vendor files here
    './src/_scripts/javascript/**/*.js'
];
const scssInput = './src/_scripts/scss/**/*.scss';

const jsOutput = './js/';
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
    gulp.watch(
        [
            jsInput,
            scssInput,
            njkInput
        ], gulp.series('all'));
});