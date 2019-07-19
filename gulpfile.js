const {src, dest, series, parallel, watch} = require('gulp')
const gulpSass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const cssnano = require('cssnano')

var postcssPlugins = [
    autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
];

function clean(){
    return del('dist')
}

function scss(){
    return src('./src/scss/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css'))
}

function watcher(){
    watch(['./src/scss/**/*.scss','./src/js/**/*.js'],series(clean,parallel(scss,javascript)))
}

function javascript(){
    return src('./src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/js'))
}

function minifyJs(){
    return src('./src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(dest('./dist/js'))
}

function minifyCss(){
    return src('./src/scss/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([...postcssPlugins,cssnano()]))
        .pipe(dest('./dist/css'))
}



module.exports = {
    clean,
    default: series(clean,parallel(scss,javascript)),
    watch: watcher,
    build: series(clean,parallel(minifyCss,minifyJs))
}