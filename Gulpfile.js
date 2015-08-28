/**
 * Gulpfile for Beth and Ian's Wedding Site.
 *
 * @see http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

var jsPaths = {
  MINIFIED_OUT: 'main.min.js',
  OUT: 'main.js',
  DEST_BUILD: 'js',
  ENTRY_POINT: './_js/main.js'
};

gulp.task('development_js', function() {
  // Use watchify to speed up Browserify builds.
  // https://github.com/substack/watchify
  // https://truongtx.me/2014/08/06/using-watchify-with-gulp-for-fast-browserify-build/
  var b = browserify({
    entries: [jsPaths.ENTRY_POINT],
    transform: [],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  // Watcher is exactly like browserify bundle except that it caches file
  // contents and emits an 'update' event when a file changes.
  var watcher = watchify(b);

  // Invoke bundle for the first time without waiting on update.
  invokeBundle(watcher);

  // Watch for files that get updated.
  watcher.on('update', function() {
    invokeBundle(watcher);
  });

  return watcher;
});

function invokeBundle(watcher) {
  watcher.bundle()
    .on('error', gutil.log)
    .pipe(source(jsPaths.OUT))
    .pipe(buffer())
    // Save the sourcemap in its own file.
    // https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
    .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsPaths.DEST_BUILD));
}

gulp.task('development', ['development_js']);
