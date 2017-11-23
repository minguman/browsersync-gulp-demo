var gulp = require("gulp");
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var webpackStream = require('webpack-stream');
var glob = require("glob");
var gulpLoadPlugins = require('gulp-load-plugins');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var del = require('del');
var gulpjade = require("gulp-jade");
var minifycss = require('gulp-clean-css');
var fileinclude  = require('gulp-file-include');  
var mergeStream = require('merge-stream');
var pxtorem2 = require('pxtorem2');
var  $ = gulpLoadPlugins();
var config = {
  path: {
    dist: 'dist',
    images: '',
    script: '',
    html: '',
    css:''
  }
}

/**
 * [getSource 获取js文件的路径并格式化路径]
 * @return {[type]} [description]
 */
function getSource() {
    var source = {
        htmlFiles: [],
        entry: {}
    };
    var jsSource = glob.sync('./src/views/**/*.js');
    jsSource.forEach(function(item) {
        var parseItem = path.parse(item);
        var parseDir = parseItem.dir.split('/');
        source.entry[parseDir[parseDir.length - 1] + '/' + parseItem.name] = item;
    });
    return source;
}

/**
 * 构建js,使用webpack对js进行封装后压缩JS并刷新页面
 * @param  {[type]} )       {             return gulp.src('./src/views*.js')    .pipe($.plumber())    .pipe(webpackStream({                   entry: getSource().entry,         output: {                        library: 'template',                                  libraryTarget: 'umd',                    filename: '[name].js'         } [description]
 * @param  {[type]} module: {                                                                                                 loaders: [{                                                 test: /.js$/,                                   loader: 'babel-loader',                                    query: {                                                       presets: ['es2015']                }            }]        }    }).on('error', notify.onError("Error: <% [description]
 * @return {[type]}         [description]
 */
gulp.task('webpack', function() {
  return gulp.src('./src/views/**/*.js')
    .pipe($.plumber())
    .pipe(webpackStream({
        entry: getSource().entry, //已多次提及的唯一入口文件
        output: {
            library: 'template',
            libraryTarget: 'umd',
            filename: '[name].js' //打包后输出文件的文件名
        },
        module: {
            loaders: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015']
              }
            },{
              test:/\.hbs$/,
              loader: "handlebars-loader"
            }]
        },
      node: {
        fs: 'empty'
      }
    }).on('error', notify.onError("Error: <%= error.message %>")))
    .pipe(gulp.dest(config.path.dist))
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += '.min'
    }))
    .pipe(gulp.dest(config.path.dist))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src(['src/static/**/*.js'])
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(gulp.dest('dist/static'))
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += '.min'
    }))
    .pipe(gulp.dest('dist/static'))
});

/**
 * 构建图片并压缩图片
 * @param  {[type]} ) {             return gulp.src(['src*.jpg|*.png|*.gif'])    .pipe($.if($.if.isFile, $.cache($.imagemin({      progressive: true,      interlaced: true,                  svgoPlugins: [{cleanupIDs: false}]    }))    .on('error', notify.onError("Error: <% [description]
 * @return {[type]}   [description]
 */
gulp.task('images', function() {
  var static = gulp.src(['src/static/**/*.jpg', 'src/static/**/*.png', 'src/static/**/*.gif'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .pipe(gulp.dest('dist/static'));

  var views = gulp.src(['src/views/**/*.jpg', 'src/views/**/*.png', 'src/views/**/*.gif'])
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))))
    .pipe(gulp.dest(config.path.dist));

  return mergeStream(static, views);  
});

/**
 * 构建css任务
 * @param  {[type]} ){  
 * return gulp.src(['./src/views*.scss|*.css'])  .pipe($.plumber())  .pipe($.sass.sync({    outputStyle: 'expanded',    precision: 10,    includePaths: ['.']  }).on('error', notify.onError("Error: <% [description]
 * @return {[type]}            [description]
 */
gulp.task('css', function(){
  return gulp.src(['./src/views/**/*.scss','./src/views/**/*.css','./src/**/*.scss','./src/**/*.css'])
  .pipe($.plumber())
  .pipe($.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  }).on('error', notify.onError("Error: <%= error.message %>")))
  .pipe($.autoprefixer({ browsers: ['last 2 versions'],cascade: false }))
  .pipe(pxtorem2({
    remUnit: 64,
    filterProperties: [],
    remPrecision: 3
  }))
  .pipe(gulp.dest(config.path.dist))
  .pipe(minifycss())
  .pipe(rename(function(path){
    path.basename += '.min'
  }))
  .pipe(gulp.dest(config.path.dist))
  .pipe(browserSync.stream()) 
})


gulp.task('fonts', function() {
  return gulp.src('./src/**/fonts/*')
    .pipe(gulp.dest(config.path.dist))
});

/**
 * 构建html文件，完成后刷新页面
 * @param  {[type]} ){  return gulp.src('./src/views*.html')  .on('error', notify.onError("Error: <% [description]
 * @return {[type]}            [description]
 */

gulp.task('html', function(){
  return gulp.src('./src/views/**/*.html')
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(gulp.dest(config.path.dist + '/page'))
  .pipe(browserSync.stream()) 
})


gulp.task('jade', function(){
  return  gulp.src("src/views/**/*.jade")
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(plumber())
  .pipe(gulpjade({
      pretty: true
  }))  
  .pipe(rename(changePathDirname))    
  .pipe(gulp.dest(dist.root))
  .pipe(browserSync.stream())
})

/**
 * 监听html、scss、css、js任务，并执行相关任务
 * @param  {[type]} ) { gulp.watch('./src*.html', ['html']);  gulp.watch(['./src*.scss|*.css'], ['scss']);  gulp.watch('./src/views*.js', ['webpack']);  console.log('已监听html,style,js文件改动')} [description]
 * @return {[type]}   [description]
 */
gulp.task('watch', function() { 
  gulp.watch('./src/**/*.html', ['fileinclude']);
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch(['./src/**/*.scss','./src/**/*.css'], ['css']);
  gulp.watch('./src/views/**/*.js', ['webpack']);
  gulp.watch('./src/**/images/*', ['images']);
  console.log('已监听html, style, css, js文件改动')
});

/**
 * 服务器配置，使用9100端口, baseDir是服务器访问目录，index是指默认端口打开的页面；
 * @param  {[type]} )
 * @return {[type]}     [description]
 */
gulp.task('serve', function(){
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      startPath: "/demo"
  });
  console.log('BS服务启动成功')
});


gulp.task('fileinclude', function() {  
  gulp.src(['./src/views/**/*.html'])  
  .pipe(fileinclude({  
    prefix: '@@',  
    basepath: '@file'  
  }))  
  .pipe(gulp.dest(config.path.dist))
  .pipe(browserSync.stream())   
});  

/**
 * @description 清除文件夹(dist目录)
 */
gulp.task('clean', del.bind(null, [config.path.dist]));

/**
 * 代码构建，运行gulp build 对html,scss,webpack任务进行构建
 * @param  {[type]} ){  gulp.start('html')  gulp.start('scss')  gulp.start('webpack')} [description]
 * @return {[type]}                                                                   [description]
 */
gulp.task('build', ['clean'], function(){
  gulp.start('fileinclude')
  gulp.start('css')
  gulp.start('webpack')
  gulp.start('js')
  gulp.start('images')
  console.log('文件构建中...')
})

/**
 * 通过运行gulp命令，执行名为 "serve,watch" 任务
 */
gulp.task('default', ['build', 'serve', 'watch'])