### 配置说明
* 该配置是基于`browsersync + gulp + webpack + jade + scss(less) + handlebars`等前端工程化配置方案
* 适合使用`jQuery、zepto`等框架开发的页面
* 更重要的兼容PC和移动端
* 注意：移动端采用了淘宝方案，在书写样式的时候直接写px，使用构建命令后会自动转化为rem！！！不再需要心算，计算器计算REM啦！！！

### Gulp+webpack构建配置
* 服务器
 * 使用了`browser-sync`；详情可访问 http://www.browsersync.cn
* HTML构建
 * 使用了`gulp-file-include`来编译`.html`文件
* CSS构建
 * 使用了`gulp-sass`来编译`.scss`文件
* JS构建
 * 使用了`webpack`编译`.js` 

### 启动服务
* git clone git@github.com:minguman/browsersync-gulp-demo.git
* 进入到`browsersync-gulp-demo`目录下
* `npm(cnpm) install` 安装依赖
* `gulp` 启动服务后会自动打开`http://localhost:3000/demo/`,如果没有请直接在地址栏里输入该地址



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
 //   remUnit: 75, //设置REM转化基数（设计稿的实际宽度/10）
 //   filterProperties: [], //不需要做转化的属性名称, ['width', 'padding'] 
 //   remPrecision: 3 //设置转化最小值（px）,如果px小于3便不在做转化
 // }))
```

