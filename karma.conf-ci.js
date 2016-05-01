const path = require('path');
const fs = require('fs');
let karmaConf = require('./karma.conf');

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

  var confObj = {
    reporters: ['dots', 'coverage', 'saucelabs'],
    // sauce config
    sauceLabs: {
      testName: 'banjo-invaders travis-ci',
      // The blow in this object are because travix starts connect
      // and opens a tunnel on it's own with the job number.
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    browsers: Object.keys(customLaunchers),
    singleRun: true
  };

  // use the base config, give it our extras. it will handle object.assign
  karmaConf(config, confObj);
};
