const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const Nightmare = require('nightmare');
const path = require('path');

gulp.task('lint', () =>
  gulp.src(['./*.js', './src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('babel', () =>
  gulp.src('./src/main/**/*')
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
    }))
    .pipe(gulp.dest('lib/main'))
);

gulp.task('browserify', ['babel'], () =>
  browserify({
    entries: './lib/main/Highlighter.js',
    standalone: 'Accent',
  })
    .bundle()
    .pipe(source('./accent.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
);

gulp.task('nightmare', ['babel'], () => {
  const nightmare = new Nightmare({
    preload: path.resolve('./src/test/nightmare.js'),
    show: true,
    fullscreen: true,
  });

  nightmare
    .goto('https://www.example.com')
    .then(() => undefined);
});

gulp.task('default', ['lint'], () => {
  gulp.watch(['./*.js', './src/**/*.js'], ['lint']);
});
