const webpack = require('webpack');
const pkg = require('./package.json');

const webpackConfig = require('./webpack.config')();
const webpackConfigProd = Object.assign({}, webpackConfig);

const prodPlugins =  [
  new webpack.DefinePlugin({
    'process.env': 'production'
  }),
  // make things ugly af (but it's broken for es6 code)
  // new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //         warnings: false,
  //         screw_ie8: true
  //     }
  // }),
  new webpack.optimize.DedupePlugin(),
  new webpack.BannerPlugin(`Build Version: ${pkg.version}\nBuild Time: ${Date().toString()}`)
];

// make source maps seperate files
webpackConfigProd.devtool = 'cheap-source-map';

// push the dedupe plugin in
webpackConfigProd.plugins = webpackConfigProd.plugins.concat(prodPlugins);

module.exports = webpackConfigProd;
