const webpack = require('webpack');

module.exports = function() {
  return {
    context: __dirname + '/app',
    entry: {
      init: './init'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
  }
}
