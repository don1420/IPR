var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify			= require('gulp-uglifyjs'),
	cssnano			= require('gulp-cssnano'),
	rename			= require('gulp-rename'),
	del 			= require('del'),
	cache			= require('gulp-cache'),
	autoprefixer 	= require('gulp-autoprefixer'),
    sourcemaps 		= require('gulp-sourcemaps');

var paths = {
    scss: ['app/scss/**/*.scss'],
    vendorScss: ['app/libs/materialize-AMD-fix/sass/**/*.scss'],
    css: 'app/css'
};

gulp.task('sass', function () {
	return gulp.src(paths.scss)
	.pipe(sourcemaps.init())
	.pipe(sass({includePaths: paths.vendorScss}).on('error', sass.logError))
	.pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
  	.pipe(sourcemaps.write(''))
	.pipe(gulp.dest(paths.css))
	.pipe(browserSync.reload({stream: true}))
});

/*gulp.task('scripts', function() {
	return gulp.src([
        	//'app\libs\jquery\dist\jquery.min.js',
			//'app/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js',
			//'app/libs/owl.carousel/dist/owl.carousel.min.js',
			//'app/libs/knockout.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});*/

// gulp.task('css-libs', ['sass'], function () {
// 	return gulp.src('app/css/libs.css')
// 	.pipe(cssnano())
// 	.pipe(rename({suffix : '.min'}))
// 	.pipe(gulp.dest('app/css/'));
// });

//close the opened browsers once browser-sync exits
browserSync.use({
    plugin: function() {},
    hooks: {
        'client:js': '(function (bs) {bs.socket.on("disconnect", function (client) {' +
		' window.close(); ' +
		'});})(___browserSync___);'
    }
});

browserSync.create();

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
        browser: "chrome"
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

//gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
gulp.task('watch', ['browser-sync', 'sass'], function () {
	gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.vendorScss, ['sass']);
    gulp.watch('app/js/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.tmpl', browserSync.reload);
    gulp.watch('app/js/**/*.tmpl', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src([
			'app/css/styles.css'
		])
		.pipe(gulp.dest('dist/css'));

	// var buildFonts = gulp.src('app/fonts/**/*')
	// 	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);