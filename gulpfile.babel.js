import gulp, { dest, watch, series } from 'gulp';
import rename from 'gulp-rename';
import terser from 'gulp-terser';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';
import buffer from 'vinyl-buffer';

const OUTPUT_PATH = 'dist';

gulp.task('compileTs', () => {
  return browserify({
    entries: ['src/pre-request.ts'],
    debug: false,
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('pre-request.js'))
  .pipe(dest(OUTPUT_PATH))
  .pipe(buffer())
  .pipe(terser())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(OUTPUT_PATH));
});

gulp.task('watch', series(
  'compileTs',
  function watching() {
    watch(['src/**/*.ts', 'tsconfig.json'], series('compileTs'))
  },
));

gulp.task('default', series('compileTs'));
