let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let gulp = require('gulp');
let less = require('gulp-less');
let source = require('vinyl-source-stream');
let tsify = require('tsify');
let watchify = require('watchify');

let browserSync = require('browser-sync').create();

let OUT_DIR = "out/";
let BROWSERIFY_ENTRIES = ['./src/example.ts']
let BROWSERIFY_OUTPUT_FILE = 'bundle.js'
let LESS_ENTRIES = ['./src/**/*.less']

gulp.task('browsersync', function() {
  browserSync.init({
    server: {
      baseDir: OUT_DIR
    }
  });

  gulp.watch(['out/**/*']).on('change', browserSync.reload);
});

gulp.task('less', function () {
  return gulp.src(LESS_ENTRIES)
    .pipe(less())
    .pipe(gulp.dest(OUT_DIR));
});

gulp.task('less-watch', function() {
  gulp.watch('src/**/*.less', gulp.parallel('less'));
});

var opts = Object.assign({}, watchify.args, {
  entries: BROWSERIFY_ENTRIES,
  debug: true
});
var b = browserify(opts);

function runBrowserify() {
  return b
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source(BROWSERIFY_OUTPUT_FILE))
    .pipe(buffer())
    .pipe(gulp.dest(OUT_DIR));
}

gulp.task('ts', function (done) {
  runBrowserify().on('finish', done);
});

gulp.task('ts-watch', function() {
  b = watchify(b)
    .on('update', runBrowserify) // on any dep update, runs the bundler
    .on('log', function (msg) {console.log(msg)});
  runBrowserify();
})

gulp.task('watch', gulp.parallel('browsersync', 'less', 'less-watch', 'ts-watch'));

gulp.task('default', gulp.parallel('watch'));
