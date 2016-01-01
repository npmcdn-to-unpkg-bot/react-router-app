/*eslint-disable no-var */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var moduleDir=path.join(__dirname,  'modules');

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(moduleDir).reduce(function (entries, dir) {
    if (fs.statSync(path.join(moduleDir, dir)).isDirectory())
      entries[dir] = path.join(moduleDir, dir, 'app.js')

    return entries
  }, {}),

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname,  'node_modules/react-router')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}
