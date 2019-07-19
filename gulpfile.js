const {src, dest, series, parallel, watch} = require('gulp')
const gulpSass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

var postcssPlugins = [
    autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
];

function clean(){
    return del('dist')
}

function scss(){
    return src('./src/scss/**/*.scss',{ sourcemaps: true })
        .pipe(gulpSass())
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css'),{ sourcemaps: '.' })
}

function watcher(){
    watch('./src/scss/**/*.scss',series(clean,scss))
}


module.exports = {
    clean,
    default: series(clean,scss),
    watch: watcher
}