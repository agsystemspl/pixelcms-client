var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
  .development()

module.exports = {
  node: {
    fs: 'empty'
  },
  context: path.resolve(__dirname),
  devtool: 'eval-source-map',
  entry: [
    './src/client.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'assets/client.js'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loaders: ['babel']
        // presets in .babelrc
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'file?name=assets/img/[hash].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'file?name=assets/fonts/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      },
      {
        test: /\.json$/,
        include: [path.resolve(__dirname, 'node_modules')],
        loader: 'json'
      }
    ]
  },
  postcss: function() {
    return [autoprefixer]
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: false,
      __CLIENT__: true,
      __API_ROOT__: '"http://localhost:8000/api/"',
      __ADMIN_ROOT__: '"http://localhost:8000/admin/"'
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      filename: 'templates/index.html',
      hash: true,
      favicon: 'src/assets/favicon.ico'
    }),
    webpackIsomorphicToolsPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('assets/css/styles.css')
  ]
}
