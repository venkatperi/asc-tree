const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );
const mocha = require( 'gulp-mocha' );

gulp.task( 'build', () =>
  gulp.src( 'index.js' )
    .pipe( babel( {
      presets: ['env']
    } ) )
    .pipe( gulp.dest( 'dist' ) )
);

gulp.task( 'test', ['build'], () =>
  gulp.src( 'test.js', { read: false } )
    .pipe( mocha( { reporter: 'nyan' } ) )
);
