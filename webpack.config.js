const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const env = process.env.NODE_ENV || 'development'

const htmlPlugins = glob.sync('./src/**/*.html').map(file => {
  return new HtmlWebpackPlugin({
    template: file,
    filename: file.substring(`.${path.sep}src${path.sep}`.length),
    scriptLoading: 'defer'
  })
})

module.exports = {
  entry: {
    main: './src/javascripts/front-end/main.js'
  },
  mode: env,
  watch: env === 'development',
  devtool: env === 'development' ? 'source-map' : false,
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    open: true,
    liveReload: true,
    hot: false,
    compress: true,
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/[name].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {url: false}}, 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(txt|dat|png|jpg|jpeg|gif|svg|ico|eot|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: { 
            name: '[name].[ext]',
            outputPath: (url, resourcePath, context) => {
              return resourcePath.substring(`${__dirname}${path.sep}src${path.sep}`.length)
            }
          }
        }]
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].css',
    })
  ]
}