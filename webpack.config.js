const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
  return {
    context: __dirname + '/app',
    entry: {
      init: './init'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].js',
    },
    devtool: 'inline-source-map',
    externals: {
      createjs: 'createjs'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.less$/, loader: 'style!css?minimize!less'},
        {
          test: /\.(gif|png|jpe?g|svg)$/, loaders: [
            //'url?limit=10000&name=[hash].[ext]',
            'file?name=[sha1:hash:hex].[ext]',
            'image-webpack?optimizationLevel=7&interlaced=false'
          ]
        }
      ]
    },
    plugins: [],
  }
}
