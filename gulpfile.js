var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  rjs = require('gulp-requirejs');

var paths = {
  src: {
        root: 'app/',
        html: 'app/*.html',
        js: 'app/js/**/*.js',
        rjs: 'app/js/',
        img: 'app/img/**/*.*',
        requirejsLib: 'app/libs/require.js',
        libs: '../libs/',
        scss: 'app/scss/**/*.scss',
        vendorScss: 'app/libs/materialize-AMD-fix/sass/**/*.scss',
        css: 'app/css/',
        model: 'app/js/model/products.json',
        fonts: 'app/fonts/**/*{ttf,woff,woff2,svg,eot}'
  },
   build: {
        root: 'build/',
        js: 'build/js/',
        rjs: '../../build/js/init.js',
        css: 'build/css/',
        img: 'build/img/',
        requirejsLib: 'build/libs/',
        model: 'build/js/model/',
        fonts: 'build/fonts/'
   }
};

//Build requirejs
gulp.task('requirejs:build', function() {
    rjs({
        baseUrl: paths.src.rjs,
        name: 'init',
        out: paths.build.rjs,
        paths: {
            jquery: paths.src.libs + 'jquery',
            text: paths.src.libs + 'text',
            underscore: paths.src.libs + 'underscore',
            knockout: paths.src.libs + 'knockout',
            materialize: paths.src.libs + 'materialize-AMD-fix/dist/js/materialize'
        },
        shim: {
            jquery: {
                exports: '$'
            },
            underscore: {
                exports: '_'
            },
            materialize: {
                deps: ['jquery']
            }
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('sass', function() {
  return gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: paths.src.vendorScss }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      })
    )
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.src.css))
    .pipe(browserSync.reload({ stream: true }));
});

//close the opened browsers once browser-sync exits
browserSync.use({
  plugin: function() {},
  hooks: {
    'client:js':
      '(function (bs) {bs.socket.on("disconnect", function (client) {' +
      ' window.close(); ' +
      '});})(___browserSync___);',
  },
});

browserSync.create();

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
    browser: 'chrome',
  });
});

gulp.task('clean', function() {
  return del.sync('build');
});

gulp.task('clear', function() {
  return cache.clearAll();
});


gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch(paths.src.scss, ['sass']);
  gulp.watch(paths.src.vendorScss, ['sass']);
  gulp.watch('app/js/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.tmpl', browserSync.reload);
  gulp.watch('app/js/**/*.tmpl', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Build production
gulp.task('production', function() {

  //build CSS
  gulp.src([paths.src.css + 'styles.min.css'])
      .pipe(cssnano())
      .pipe(gulp.dest(paths.build.css));

  //build IMG
  gulp.src(paths.src.img)
     .pipe(imagemin())
     .pipe(gulp.dest(paths.build.img));

  //build HTML
  gulp.src(paths.src.html)
      .pipe(gulp.dest(paths.build.root));

  //build requirejs
    rjs({
        baseUrl: paths.src.rjs,
        name: 'init',
        out: paths.build.rjs,
        paths: {
            jquery: paths.src.libs + 'jquery',
            text: paths.src.libs + 'text',
            underscore: paths.src.libs + 'underscore',
            knockout: paths.src.libs + 'knockout',
            materialize: paths.src.libs + 'materialize-AMD-fix/dist/js/materialize'
        },
        shim: {
            jquery: {
                exports: '$'
            },
            underscore: {
                exports: '_'
            },
            materialize: {
                deps: ['jquery']
            }
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.js));

    gulp.src(paths.src.requirejsLib)
        .pipe(gulp.dest(paths.build.requirejsLib));

    //build model
    gulp.src(paths.src.model)
        .pipe(gulp.dest(paths.build.model));

    //build fonts
    gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.build.fonts));

});

gulp.task('default', ['watch']);
