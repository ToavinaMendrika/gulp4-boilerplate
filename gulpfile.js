const {src, dest, series, parallel, watch} = require('gulp')
const gulpSass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')

function clean(){
    return del('dist')
}

function scss(){
    return src('./src/scss/**/*.scss',{ sourcemaps: true })
        .pipe(gulpSass())
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