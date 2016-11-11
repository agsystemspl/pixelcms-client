var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))

module.exports = {
  node: {
    fs: 'empty'
  },
  context: path.resolve(__dirname),
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
      '~': path.resolve('./src'),
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
      'process.env.NODE_ENV': '"production"',
      __SERVER__: false,
      __CLIENT__: true,
      __API_ROOT__: '"http://backend.domain.com/api/"'
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      filename: 'templates/index.html',
      hash: true,
      favicon: 'src/assets/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    webpackIsomorphicToolsPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('assets/css/styles.css')
  ]
}
