var gulp = require('gulp');

var server = require('gulp-webserver');

var scss = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var fs = require('fs');

var url = require('url');

var path = require('path');

//线上环境-----起服务
gulp.task('devServer', ['devScss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/login') {
                    res.end()
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//线上环境------scss
gulp.task('devScss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(gulp.dest('./src/css'))
});
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['devScss'])
});
gulp.task('dev', ['devServer', 'devScss'])