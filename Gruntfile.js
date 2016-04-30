const path = require('path');

const webpackConfig = require('./webpack.config')();

const coverageDir = path.resolve('./coverage');
const distDir = path.resolve('./dist');

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      coverage: coverageDir,
      dist: distDir
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      'unit-ci': {
        configFile: 'karma.conf-ci.js',
        singleRun: true
      }
    },
    webpack: {
      main: webpackConfig
    },
    "webpack-dev-server": {
      start: {
        webpack: webpackConfig,
        keepalive: true
      }
    }
  });

  grunt.registerTask('dev', [
    'webpack-dev-server:start'
  ]);

  grunt.registerTask('test', [
    'clean:coverage',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'test',
    'webpack:main'
  ]);

  grunt.registerTask('build-ci', [
    'clean:dist',
    'karma:unit-ci',
    'webpack:main'
  ]);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint']);
};
