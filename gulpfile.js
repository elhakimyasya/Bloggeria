const del = require("del");
const fs = require("fs");
const gulp = require("gulp");
const gulpAutoPrefixer = require('gulp-autoprefixer');
const gulpBabelMinify = require('gulp-babel-minify');
const gulpCleanCSS = require('gulp-clean-css');
const gulpFileInclude = require('gulp-file-include');
const gulpRename = require('gulp-rename');
const gulpReplace = require('gulp-replace');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpStripComments = require('gulp-strip-comments');
const gulpTokenReplace = require('gulp-token-replace');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const gulpBabel = require('gulp-babel');
const gulpJsonMinify = require('gulp-jsonminify')

const packages = './package.json';

// Clean everything inside ./build directory
gulp.task('clean', () => {
    const sources = [
        './build/**'
    ];

    return del(sources, {
        force: true,
    })
});

// Generate styles
gulp.task('styles', () => {
    const sources = [
        './src/assets/styles/*.{css,scss}'
    ];

    return gulp.src(sources)
        .pipe(gulpSass())
        .pipe(gulp.dest('./build/styles'))
});
// Generate prefixed styles
gulp.task('styles:autoprefixed', () => {
    const sources = [
        './build/styles/*.{css}'
    ];

    return gulp.src(sources)
        .pipe(gulpAutoPrefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./build/styles'))
});
// Generate minified styles
gulp.task('styles:minified', () => {
    const sources = [
        './build/styles/*.{css,scss}'
    ];

    return gulp.src(sources)
        .pipe(gulpCleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(gulp.dest('./build/styles'))
});

// Generate scripts (webpack)
gulp.task('scripts:webpack', () => {
    const sources = [
        // './src/assets/scripts/*.js',
        './plugins/auth/scripts/*.js',
    ];

    return gulp.src(sources)
        .pipe(webpackStream({
            mode: 'production',
            output: {
                filename: 'bundle.js'
            },
            watch: false
        }, webpack))
        .pipe(gulp.dest('./build/scripts'))
});
// Generate scripts (babel)
gulp.task('scripts:babel', () => {
    const sources = [
        './src/assets/scripts/*.js',
        './src/assets/scripts/libraries/*.js',
    ];

    return gulp.src(sources)
        .pipe(gulpBabel())
        .pipe(gulp.dest('./build/scripts'))
});
// Generate minified scripts
gulp.task('scripts:minified', () => {
    const sources = [
        './build/scripts/*.js'
    ];

    return gulp.src(sources)
        .pipe(gulpBabelMinify({
            mangle: {
                keepClassName: false
            },
            evaluate: false,
            builtIns: false,
            removeDebugger: true,
            removeConsole: false
        }))
        .pipe(gulp.dest('./build/scripts'))
});

// Generate JSON (Schema)
gulp.task('json:minify', function () {
    return gulp.src('./src/assets/scripts/json/*.json')
        .pipe(gulpJsonMinify())
        .pipe(gulp.dest('./build/scripts/json'))
});
// Generate Replaced JSON Data
gulp.task('json:replace', function () {
    return gulp.src('./build/scripts/json/*.json')
        .pipe(gulpReplace('dataBlogTitle', '<data:blog.title.jsonEscaped/>'))
        .pipe(gulpReplace('dataBlogHomepageUrl', '<data:blog.homepageUrl.jsonEscaped/>'))
        .pipe(gulpReplace('dataBlogSearchUrl', '<data:blog.searchUrl.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostUrlCanonical', '<data:post.url.canonical.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostTitle', '<data:post.title.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostBodySnippet', "<b:eval expr='(data:post.body snippet {length: 150, links: false, linebreaks: false, ellipsis: true}).jsonEscaped'/>"))
        .pipe(gulpReplace('dataPostDateIso8601', '<data:post.date.iso8601.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostLastUpdatedIso8601', '<data:post.lastUpdated.iso8601.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostAuthorName', '<data:post.author.name.jsonEscaped/>'))
        .pipe(gulpReplace('dataPostFeaturedImage', "<b:eval expr='data:post.featuredImage.isResizable ? resizeImage(data:post.featuredImage, 1200, &quot;1200:630&quot;) : &quot;https://lh3.googleusercontent.com/ULB6iBuCeTVvSjjjU1A-O8e9ZpVba6uvyhtiWRti_rBAs9yMYOFBujxriJRZ-A=w1200&quot;'/>"))
        .pipe(gulpReplace('dataMessagesHome', '<data:messages.home/>'))
        .pipe(gulpReplace('dataPostLabelsFirstName', '<b:eval expr="data:post.labels ? data:post.labels.first.name : data:messages.home" />'))
        .pipe(gulpReplace('dataPostLabelsFirstUrlCanonical', '<b:eval expr="data:post.labels ? data:post.labels.first.url.canonical : data:blog.homepageUrl.canonical" />'))
        .pipe(gulp.dest('./build/scripts/json'))
});

// Generate Timestamp
gulp.task('timestamp', (done) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date();
    const timestamps = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} - ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

    !((filePath, results) => {
        fs.readFile(filePath, (error, fileData) => {
            if (error) {
                return results && results(error)
            } else {
                try {
                    const object = JSON.parse(fileData);

                    return results && results(null, object);
                } catch (errors) {
                    return results && results(errors)
                }
            }
        })
    })(packages, (error, object) => {
        if (error) {
            return console.log("Error Reading File: ", error)
        } else {
            object.releasedDate = timestamps;
            fs.writeFile(packages, JSON.stringify(object, null, '\t'), {
                flag: 'w'
            }, (errors) => {
                if (errors) {
                    console.log("Error Writting File: ", errors)
                }
            })
        }
    })

    return done()
});

// Remove all comments
gulp.task('comments', () => {
    const sources = [
        './dist/*.{xml,html}'
    ];

    return gulp.src(sources)
        .pipe(gulpStripComments({
            trim: true
        }))
        .pipe(gulp.dest('./dist'))
});

// Final Tasks
gulp.task('start', () => {
    const tokenData = require(packages);
    const sources = [
        './src/index.html'
    ];

    return gulp.src(sources)
        .pipe(gulpTokenReplace({
            global: tokenData
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
});

// Build task: Production Mode
gulp.task('build:production', gulp.series(
    'clean',
    'styles',
    'styles:autoprefixed',
    'styles:minified',
    'scripts:webpack',
    // 'scripts:babel',
    // 'scripts:minified',
    // 'json:minify',
    // 'json:replace',
    'timestamp',
    'start',
    'comments'
));
// Build task: Development Mode
gulp.task('build:development', gulp.series(
    'clean',
    'styles',
    'scripts:babel',
    'start'
));