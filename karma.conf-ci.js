const path = require('path');
const fs = require('fs');
let webpackConfig = require('./webpack.config')();

module.exports = function(config) {
  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  const customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox',
    }
  };

  config.set({
    basePath: '.',
    frameworks: ['source-map-support', 'mocha'],
    files: [
      'test-main.js'
    ],
    reporters: ['dots', 'coverage', 'saucelabs'],
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
    logLevel: config.LOG_DEBUG,
    autoWatch: false,

    // sauce config
    sauceLabs: {
      testName: 'banjo-invaders travis-ci',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    browsers: Object.keys(customLaunchers),
    singleRun: true,

    // webpack config
    webpackMiddleware: {
      noInfo: true
    },
    webpack: webpackConfig
  });
};
