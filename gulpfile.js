const 
  gulp = require('gulp'),
  path = require('path'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
	open = require('gulp-open'),
	concat = require('gulp-concat'),
	jade = require('jade'),
	uglify = require('gulp-uglifyjs'),
  gulpJade = require('gulp-jade'),
  gulpCopy = require('gulp-copy'),
  browsersync = require('browser-sync').create(),
	watch = require('gulp-watch'),
	del = require('del'),
  jade2 = require('gulp-jade'),
	gulp_watch_jade = require('gulp-watch-jade'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	cleanCSS = require('gulp-clean-css'),
	notify = require("gulp-notify"),
	minify = require("gulp-babel-minify"),
	babel = require('gulp-babel');
   
const
 Paths = {
	HERE: './',
	DIST: 'dist/',
	CSS: './assets/css/',
	SCSS_TOOLKIT_SOURCES: './assets/scss/material-dashboard.scss',
	SCSS: './assets/scss/**/**',
	SASS: './assets/sass/**/**',
	JS: './assets/js/**/**',
	PAGES: './assets/pages/**/**',
	JADE: './app/jade/**/**',
	jhtml: './assets/',
	destination: './assets/jhtml/'
};


function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./app"
    },
		notify: false
  });
  done();
}

function reload(done) {
  browsersync.reload();
  done();
}


function compileCSSlibs() {
	return gulp.src('app/css/libs/*.css')
		.pipe(concat('libs.css'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
}

function compileScripts() {
	return gulp.src([
		'app/js/libs/jquery-3.3.1.min.js',
		'app/js/libs/jquery.magnific-popup.min.js',
		'app/js/libs/bootstrap.min.js',
		'app/js/libs/bootstrap-notify.js', 
		'app/js/libs/moment.min.js',
		'app/js/libs/cleave.min.js',
		'app/js/libs/sweetalert2.all.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
}


function compileSass(done) {
  return  gulp.src('app/sass/**/*.sass')
    .pipe(sass().on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
		.pipe(browsersync.stream());
		
		done();
}

function compileJade2(done) {
  return gulp.src('app/jade/**/*.jade')
    // .pipe(watch('app/jade/**/*.jade'))
    // .pipe(gulp_watch_jade('app/jade/**/*.jade', { delay: 100 }))
		.pipe(
			jade2({
				pretty: true
			}).on('error', notify.onError(function (error) {
				return 'An error occurred while compiling jade.\nLook in the console for details.\n' + error;
			}))
		)
    .pipe(gulp.dest('app'))
    .pipe(browsersync.stream());
  
    done();
}

function watchFiles(done) {
  gulp.watch('app/sass/**/*.sass', gulp.series(compileSass));
  gulp.watch('app/jade/**/*.jade', gulp.series(compileJade2));
 
	gulp.watch('app/*.html', browsersync.reload);
	gulp.watch('app/css/*.css', browsersync.reload);
  gulp.watch('app/js/**/*.js', browsersync.reload);
  
  done();
}


function removeDist(done) {
	del.sync('dist');
	done();
}


function moveCssToDist(done) {
	return gulp.src([ 
		'app/css/libs.min.css',
		'app/css/main.min.css'
	]).pipe(gulp.dest('dist/css'));

	done();
}

function moveHtmlToDist(done) {
	return gulp.src('app/*.html').pipe(gulp.dest('dist/html'));
	done();
}

function moveCssToDist(done) {
	return gulp.src([ 
		'app/css/libs.min.css',
		'app/css/main.min.css'
	]).pipe(gulp.dest('dist/css'));

	done();
}

function moveJSToDist(done) {
	return gulp.src([
		'app/js/libs.min.js',
		'app/js/common.js'
	]).pipe(gulp.dest('dist/js'));

	done();
}

gulp.task('build',  
	gulp.series(
		removeDist,compileSass, compileCSSlibs, compileScripts, compileJade2,
		moveHtmlToDist, moveCssToDist, moveJSToDist
	), function(done) {
		done();
	}
);

const taskBuild = gulp.series('build');
const taskWatch = gulp.series(compileScripts, compileCSSlibs, watchFiles, browserSync);

exports.build = taskBuild;
exports.default = taskWatch;







 