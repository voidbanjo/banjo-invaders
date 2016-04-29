const path = require('path');
const webpackConfig = require('./webpack.config')();

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['source-map-support', 'mocha'],
    files: [
      'test-main.js'
    ],
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'test-main.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      reporters: [
        {type: 'html', subDir: './lcov'}
      ],
      dir: './coverage'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome','Firefox'],
    singleRun: false,
    webpackMiddleware: {
      noInfo: true
    },
    webpack: webpackConfig
  });
};
