var gulp = require('gulp');

var config = {
  css: 'src/css',
  html: 'src/html/*.html',
  dist: './build',
  webpack: {
    entry: './src/js/index.js',
    output: {
      filename: 'JK.js'
    }
  }
};

gulp.task('default', ['clean', 'concat', 'html']);

gulp.task('concat', function(){
  var webpack = require('gulp-webpack');
    gulp.src(config.webpack.entry)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.dist));
});

gulp.task('html', function(){
  gulp.src(config.html)
      .pipe(gulp.dest(config.dist));
});

gulp.task('s', function() {
  var webserver = require('gulp-webserver');
  gulp.src(config.dist) //Webサーバーで表示するサイトのルートディレクトリを指定
  .pipe(webserver({
    livereload: true, //ライブリロードを有効に
    directoryListing: true //ディレクトリ一覧を表示するか。オプションもあり
  }));
});

gulp.task('watch', function (callback) {
  gulp.watch(config.webpack.entry, ['concat']);
  gulp.watch(config.html, ['html']);
});

gulp.task('clean', function(){
  var rm = require('rimraf');
  rm(config.dist, function(){});
});
