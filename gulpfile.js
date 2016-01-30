const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const Nightmare = require('nightmare');
const path = require('path');

gulp.task('lint', () => {
  return gulp.src(['./*.js', './src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('browserify', () => {
  return browserify({
    entries: './index.js',
    debug: true,
    standalone: 'Highlighter',
  })
  .transform(babelify.configure({
    presets: ['es2015', 'stage-0'],
  }))
  .bundle()
  .pipe(source('./accent.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./build'));
});

gulp.task('nightmare', ['browserify'], () => {
  const nightmare = new Nightmare({
    preload: path.resolve('./build/bundle.js'),
    show: true,
    fullscreen: true,
  });

  nightmare
    .goto('https://www.example.com')
    .then(() => {});
});

gulp.task('default', ['lint', 'browserify'], () => {
  gulp.watch(['./*.js', './src/**/*.js'], ['lint']);
  gulp.watch('./src/**/*.js', ['browserify']);
});
