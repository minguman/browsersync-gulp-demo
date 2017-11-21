module.exports = {
    //loader自行添加
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
          presets: ['babel-preset-es2015'] //按照最新的ES6语法规则去转换
      }
    },{
      test: /\.(jpg|png|gif)$/i,
      use: ['file-loader']
    }, {
      test: /\.art$/,
      loader: "./",
      options: {
          // art-template options (if necessary)
          imports: require.resolve("./template-runtime")
      }
    }]
};