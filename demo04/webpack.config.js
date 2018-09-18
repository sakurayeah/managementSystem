var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件地址
  output: {
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: 'app.js', // 输出的文件名字
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // js-loader
        loader: 'babel-loader?presets=es2015&presets[]=react&presets[]=stage-3'
      },
      {
        test: /\.css$/, // css-loader
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/, // less-loader
        loaders: 'style-loader!css-loader!less-loader'
      }
    ],
  },
  devServer: { // webpack-dev-server 的配置
    inline: true,
    hot: true,
    contentBase: './build',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"mock"'
      }
    })
  ]
}