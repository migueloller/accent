/* eslint-disable func-names */
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    files: ['./src/**/*.js', './test/**/*.js'],
    preprocessors: {
      './src/**/*.js': ['browserify'],
      './test/**/*.js': ['browserify'],
    },
    browsers: ['PhantomJS'],
    browserify: {
      transform: [require('browserify-istanbul')({
        instrumenter: require('isparta'),
      }), 'babelify'],
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html', dir: './coverage' },
        { type: 'lcov' },
      ],
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
  });
};
