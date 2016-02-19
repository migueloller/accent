/* eslint-disable func-names */
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'browserify', 'fixture'],
    files: ['./src/**/*.js', './test/**/*'],
    preprocessors: {
      './src/**/*.js': ['browserify'],
      './test/**/*.js': ['browserify'],
      './test/**/*.html': ['html2js'],
      './test/**/*.json': ['json_fixtures'],
    },
    browsers: ['PhantomJS'],
    browserify: {
      transform: [require('browserify-istanbul')({
        instrumenter: require('isparta'),
      }), 'babelify'],
    },
    jsonFixturesPreprocessor: {
      variableName: '__json__',
    },
    reporters: ['mocha'],
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
