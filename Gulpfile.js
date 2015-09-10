/**
 * Gulpfile for Beth and Ian's Wedding Site.
 *
 * @see http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifier = require('gulp-uglify/minifier');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;
var streamify = require('gulp-streamify');
var uglifyjs = require('uglify-js');
var watchify = require('watchify');

var jsPaths = {
  MINIFIED_OUT: 'main.min.js',
  OUT: 'main.js',
  DEST_BUILD: 'js/build',
  ENTRY_POINT: './_js/main.js'
};

// Run Jekyll Build Asynchronously
gulp.task('jekyll', function () {
  var jekyll = spawn(
        'jekyll',
        [
          'serve',
          '--config',
          '_config.yml,_config-dev.yml'
        ],
        {
          stdio: 'inherit'
        }
      );

  jekyll.on('exit', function (code) {
    console.log('-- Finished Jekyll Build --');
  });
});

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
    // Buffer to create stream used by sourcemaps.
    .pipe(buffer())
    // Save the sourcemap in its own file.
    // https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
    .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsPaths.DEST_BUILD));
}

gulp.task('development', ['development_js', 'jekyll']);

gulp.task('production_js', function() {
  browserify({
    entries: [jsPaths.ENTRY_POINT],
    transform: [],
    debug: false,
    cache: {}, packageCache: {}, fullPaths: false
  })
    .bundle()
    .on('error', function(error) {
      console.log(error.message);
    })
    .pipe(source(jsPaths.MINIFIED_OUT))
    // Don't use gulp-uglify 1.2.0 because of error described here:
    // https://github.com/terinjokes/gulp-uglify/issues/98#issuecomment-92459911
    .pipe(streamify(minifier({}, uglifyjs)))
    // Buffer to create stream used by sourcemaps.
    .pipe(buffer())
    // Save the sourcemap in its own file.
    // https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
    .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsPaths.DEST_BUILD));
});
