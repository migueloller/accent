import 'babel-polyfill';

// Not using es6 `export` because of issues with Browserify standalone options.
module.exports = window.Highlighter = require('./src/Highlighter.js');
