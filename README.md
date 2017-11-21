### Gulp+webpack构建配置
* 服务器
 * 使用了`browser-sync`；详情可访问`http://www.browsersync.cn`
* HTML构建
 * 使用了`gulp-file-include`来编译`.html`文件
* CSS构建
 * 使用了`gulp-sass`来编译`.scss`文件
* JS构建
 * 使用了`webpack`编译`.js` 


### Gulp任务
* gulp 启动服务
* gulp build 根据`gulpfile.js`里的配置，对整个应用进行构建（包含.html,.css,.js等文件进行编译）
* gulp clean 清楚根目录下的 dist 目录
* gulp webpack 对.js进行构建
* gulp images 对.png,.jpg,.gif等进行构建
* gulp css 对.css,.scss进行构建
* gulp fileinclude 对.html进行构建


### 注意事项
* 如果不是用于移动端，请注释`gulp.task('css'...)`任务下的以下代码，该代码用于转化PX为REM
```
 //.pipe(pxtorem2({
 //   remUnit: 75,
 //   filterProperties: [],
 //   remPrecision: 3
 // }))
```

