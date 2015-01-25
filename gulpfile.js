var gulp = require('gulp');

var config = {
  css: 'src/css',
  html: 'src/html/*.html',
  json: 'src/json/**/*.json',
  dist: './build',
  img: ['src/img/**/*.png', 'src/img/**/*.jpg'],
  webpack: {
    entry: './src/js/index.js',
    output: {
      filename: 'physics.js'
    }
  }
};

var copy = function(src, dest){
  gulp.src(src).pipe(gulp.dest(dest));
};

gulp.task('default', ['concat', 'html', 'json', 'img']);

gulp.task('concat', function(){
  var webpack = require('gulp-webpack');
    gulp.src(config.webpack.entry)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.dist));
});

gulp.task('img', function(){
  copy(config.img, config.dist + '/img');
});

gulp.task('json', function(){
  copy(config.json, config.dist + '/json');
});


gulp.task('html', function(){
  copy(config.html, config.dist);
});

gulp.task('s', function() {
  var webserver = require('gulp-webserver');
  gulp.src('./') //Webサーバーで表示するサイトのルートディレクトリを指定
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
