const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    // publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  // watch: true, 在webpack-dev-server和webpack-dev-middleware监视模式下默认启用。
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        }),
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.{png|jpg|jpeg|gif|svg}/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 5 * 1024
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // 端口号
    port: 3000,
    host: 'localhost',
    // 热重载
    hot: true,
    compress: true,
    // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果只想显示编译器错误：
    overlay: true,
    // 跨域代理转发
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //     headers: {
    //       Cookie: ''
    //     }
    //   }
    // },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  },
  plugins: [
    // 提取css文件为单独文件
    new ExtractTextPlugin('styles.css'),
    // 产出html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'), // 模板
      filename: 'index.html',
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true // 压缩，去掉引号
      }
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
