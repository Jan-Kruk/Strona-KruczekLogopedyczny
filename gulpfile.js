const { src, dest, series, parallel, watch } = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const kit = require('gulp-kit')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	javascript: './src/js/**/*.js',
	images: './src/img/**/*',
	dist: './dist',
	sassDest: './dist/css',
	javascriptDest: './dist/js',
	imageDest: './dist/img',
}

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	done()
}
function javascript(done) {
	src(paths.javascript)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.javascriptDest))
	done()
}
function convertImages(done) {
	src(paths.images).pipe(imagemin()).pipe(dest(paths.imageDest))

	done()
}
function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	done()
}
function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean())

	done()
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}
function watchforChanges(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.javascript], parallel(handleKits, sassCompiler, javascript)).on('change', reload)
	watch(paths.images, convertImages).on('change', reload)
	done()
}

const mainfunctions = parallel(handleKits, sassCompiler, javascript, convertImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainfunctions, startBrowserSync, watchforChanges)
