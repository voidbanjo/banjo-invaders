const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')();

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('testing')
    }
  })
);

webpackConfig.module.preLoaders = [{
  test: /.js$/i,
  include: path.resolve('app/'),
  exclude: /(spec|test)\.js$/i,
  loader: 'istanbul-instrumenter?esModules=true'
}];

module.exports = function(config, adtl) {
  config.set(Object.assign({
    basePath: '.',
    frameworks: ['source-map-support', 'mocha'],
    files: [
      './lib/createjs.min.js',
      'test-main.js'
    ],
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'test-main.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'text-summary'},
        {type: 'html', subdir: './report-html'}
      ],
      check: {
        global: {
          statements: 85,
          branches: 85,
          functions: 85,
          lines: 85,
          excludes: []
        },
        each: {
          statements: 100,
          branches: 80,
          functions: 80,
          lines: 100,
          excludes: [],
          overrides: {
            'baz/component/**/*.js': {
              statements: 98
            }
          }
        }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    webpackMiddleware: {
      noInfo: true
    },
    webpack: webpackConfig
  }, adtl));
};
