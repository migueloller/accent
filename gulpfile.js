const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('lint', () =>
  gulp.src(['./*.js', './src/**/*.js', './test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('babel', () =>
  gulp.src('./src/**/*')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);

gulp.task('browserify', ['babel'], () =>
  browserify({
    entries: './lib/accent.js',
    standalone: 'accent',
  })
    .bundle()
    .pipe(source('./accent.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
);

gulp.task('default', ['lint'], () => {
  gulp.watch(['./*.js', './src/**/*.js'], ['lint']);
});
