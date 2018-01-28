var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat 				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),
		cssnano				= require('gulp-cssnano'),
		rename				= require('gulp-rename'),
		del 					= require('del'),
		cache 				= require('gulp-cache'),
		autoprefixer 	= require('gulp-autoprefixer'),
    sourcemaps 		= require('gulp-sourcemaps');

gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
  .pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer(['last 2 versions'], {cascade: true}))
  .pipe(sourcemaps.write(''))
	.pipe(gulp.dest('app/css'))
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

gulp.task('css-libs', ['sass'], function () {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

//gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
gulp.task('watch', ['browser-sync', 'css-libs'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.tmpl', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    gulp.task('build', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src([
			'app/css/styles.css',
			'app/css/libs.min.css'
		//	'app/css/fonts.css'
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