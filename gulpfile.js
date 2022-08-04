const gulp = require('gulp');
const gulpAutoPrefixer = require('gulp-autoprefixer');
const gulpCleanCSS = require('gulp-clean-css');
const gulpTokenReplace = require('gulp-token-replace');
const gulpFileInclude = require('gulp-file-include');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');
const gulpStripComments = require('gulp-strip-comments');
const gulpBabel = require('gulp-babel');
const gulpBabelMinify = require('gulp-babel-minify');
const del = require('del');
const fs = require('fs');

const packages = './package.json';

// Clean everything inside /build directory
gulp.task('clean', function () {
    return del(['build/**'], {
        force: true,
    })
});

// Generate Styles
gulp.task('styles', function () {
    return gulp.src('./src/assets/styles/*.css')
        .pipe(gulp.dest('./build/styles'))
});
// Generate Prefixed Styles
gulp.task('styles:prefixed', function () {
    return gulp.src('./build/styles/*.css')
        .pipe(gulpAutoPrefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./build/styles'))
});
// Generate Minified Styles
gulp.task('styles:minify', function () {
    return gulp.src('./src/assets/styles/*.css')
        .pipe(gulpCleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(gulp.dest('./build/styles'))
});

// Generate Scripts
gulp.task('script', function () {
    return gulp.src([
        'src/assets/scripts/*.js',
        'src/assets/scripts/libraries/*.js',
    ])
        .pipe(gulpBabel())
        .pipe(gulp.dest('./build/scripts'))
});
// Generate Minified Script
gulp.task('script:minify', function () {
    return gulp.src('build/scripts/*js')
        .pipe(gulpBabelMinify({
            mangle: {
                keepClassName: false
            },
            evaluate: false,
            builtIns: false,
            removeDebugger: true,
            removeConsole: true
        }))
        .pipe(gulp.dest('./build/scripts'))
});

// Generate Timestamp for /package.json
gulp.task('timestamp', function (done) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date();
    const timestamps = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} - ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;


    !(function (filePath, response) {
        fs.readFile(filePath, function (error, fileData) {
            if (error) return response && response(error);

            try {
                const object = JSON.parse(fileData);

                return response && response(null, object)
            } catch (error) {
                return response && response(error);
            }
        })
    })(packages, function (error, object) {
        if (error) return console.log('Error reading file: ', error);

        object.releasedDate = timestamps;
        fs.writeFile(packages, JSON.stringify(object, null, '\t'), {
            flag: 'w'
        }, function (error) {
            if (error) return console.log('Error writing file: ', error)
        })
    });

    return done()
});

// Final Tasks
gulp.task('start', function () {
    delete require.cache[require.resolve(packages)];
    const tokenData = require(packages);

    return gulp.src('src/main.html')
        .pipe(gulpTokenReplace({
            global: tokenData
        }))
        .pipe(gulpStripComments({
            trim: true
        }))
        .pipe(gulpFileInclude({
            indent: true,
            basepath: '@@file',
            prefix: '@@'
        }))
        .pipe(gulpReplace('-tw', '-elcreative'))
        .pipe(gulpRename({
            basename: 'theme',
            extname: '.xml'
        }))

        .pipe(gulp.dest('./dist'))
})

// Production Mode
gulp.task('build:production', gulp.series(
    'clean',
    'styles',
    'styles:prefixed',
    'styles:minify',
    'script',
    'script:minify',
    'timestamp',
    'start',
));
// Development Mode
gulp.task('build:development', gulp.series(
    'clean',
    'styles',
    'script',
    'start',
));