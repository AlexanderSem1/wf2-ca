const gulp = require('gulp'); 
const { src, dest } = require('gulp'); 
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso'); 
const minifyImages = require('gulp-imagemin'); 
const browserSync = require('browser-sync').create(); 

function css() {
    return src('./sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('css')) 
        .pipe(browserSync.stream()) 
}; 

function images() {
    return src('images/*')
        .pipe(minifyImages())
        .pipe(dest('miniimages')) 
}; 

function movefiles() {
    return src('./*.html')
        .pipe(dest('./dist'))
};

function watch() {
    browserSync.init({
        server: {
            baserDir: './',
        }
    }); 
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./*.html', movefiles); 
    gulp.watch('./*.html').on('change', browserSync.reload);
}; 

exports.watch = watch;
exports.minifyimages = images; 