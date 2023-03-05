const gulp = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpAutoPrefixer = require('gulp-autoprefixer');
const gulpCleanCSS = require('gulp-clean-css');
const webpackStream = require('webpack-stream');
const terserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const gulpBabelMinify = require('gulp-babel-minify');
const gulpJsonMinify = require('gulp-jsonminify');
const gulpReplace = require('gulp-replace');
const gulpTokenReplace = require('gulp-token-replace');
const packages = require('./package.json');
const gulpFileInclude = require('gulp-file-include');
const gulpRename = require('gulp-rename');
const gulpStripComments = require('gulp-strip-comments');
const fs = require('fs');
const gulpBabel = require('gulp-babel');
const gulpHTMLMin = require('gulp-htmlmin');

const generateTimestamp = () => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date();
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    // const hours =  ("0" + date.getHours()).slice(-2);
    const hours = ("0" + ((date.getHours() + 11) % 12 + 1)).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${monthName} ${day}, ${year} - ${hours}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`;
};
const updatePackageTimestamp = () => {
    const packagesFile = './package.json';
    const timestamp = generateTimestamp();

    fs.readFile(packagesFile, (error, fileData) => {
        if (error) {
            console.log('Error reading file:', error);

            return
        };

        try {
            const packages = JSON.parse(fileData);
            packages.releasedDate = timestamp;

            fs.writeFile(packagesFile, JSON.stringify(packages, null, '\t'), (error) => {
                if (error) {
                    console.log('Error writing file:', error)
                }
            })
        } catch (error) {
            console.log('Error parsing JSON:', error);
        }
    })
};

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
        './src/assets/styles/*.{css,scss}',
        '!./src/assets/styles/tailwind.css'
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
    const sources = {
        scripts: './src/assets/scripts/scripts.js',
        // scriptsHead: './src/assets/scripts/scripts-head.js'
    };
    const webpackConfig = {
        mode: 'production',
        entry: sources,
        output: {
            filename: '[name].min.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            targets: '> 0.25%, not dead',
                                        },
                                    ],
                                ],
                                plugins: [
                                    // your plugins here
                                ],
                                // add the terserOptions here
                                compact: true,
                                comments: false
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new terserWebpackPlugin({
                    extractComments: false,
                    terserOptions: {
                        mangle: false,
                        compress: true,
                        format: {
                            comments: false,
                        },
                    },
                })
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
        watch: false
    };

    return gulp.src(sources.scripts)
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./build/scripts'))
});
// Generate scripts (babel)
gulp.task('scripts:babel', () => {
    const sources = [
        './build/scripts/*.js'
    ];

    return gulp.src(sources)
        .pipe(gulpBabel())
        .pipe(gulp.dest('./build/scripts'))
});
// Generate minified scripts
gulp.task('scripts:minified', () => {
    const sources = [
        './build/scripts/*.js',
        './src/assets/scripts/scripts-head.js',
    ];

    return gulp.src(sources)
        .pipe(gulpBabelMinify({
            mangle: {
                keepClassName: true
            },
            evaluate: false,
            builtIns: false,
            removeDebugger: true,
            removeConsole: false
        }))
        .pipe(gulp.dest('./build/scripts'))
});

// Generate JSON (Schema)
gulp.task('json:minify', () => {
    const sources = [
        './src/assets/scripts/json/*.json'
    ];

    return gulp.src(sources)
        .pipe(gulpJsonMinify())
        .pipe(gulp.dest('./build/scripts/json'))
});
// Generate Replaced JSON Data
gulp.task('json:replace', () => {
    const sources = [
        './build/scripts/json/*.json'
    ];

    return gulp.src(sources)
        .pipe(gulpReplace('dataBlogTitle', '<data:blog.title.jsonEscaped/>'))
        .pipe(gulpReplace('dataBlogHomepageUrl', '<data:blog.homepageUrl.jsonEscaped/>'))
        .pipe(gulpReplace('dataBlogSearchUrl', '<data:blog.searchUrl.jsonEscaped/>'))
        .pipe(gulpReplace('dataBlogLocale', '<data:blog.locale/>'))
        .pipe(gulpReplace('dataBlogMetaDescription', "<b:eval expr='data:blog.metaDescription ? data:blog.metaDescription.escaped : data:view.description.escaped'/>"))
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

// Generate Timestamp
gulp.task('timestamp', (results) => {
    updatePackageTimestamp();
    results()
});

// Minify HTML
gulp.task('html:minify', () => {
    const sources = [
        // './src/partials/defaultmarkups/Common/defaultIcons.html',
        // './src/partials/widgets/LinkList995.html',
    ];

    return gulp.src(sources)
        .pipe(gulpHTMLMin({
            collapseWhitespace: true,
            // collapseBooleanAttributes: true, // collapse boolean attributes to a single value
            removeComments: true,
            ignoreCustomFragments: [/<[^>]+\/>/, /<[^>]+><\/[^>]+>/], // ignore self-closing tags and empty tags
        }))
        .pipe(gulp.dest('./build/html'))
})

// Final Tasks
gulp.task('start', () => {
    const sources = [
        './src/main.html'
    ];

    return gulp.src(sources)
        .pipe(gulpTokenReplace({
            global: packages
        }))
        .pipe(gulpFileInclude({
            indent: true,
            basepath: '@@file',
            prefix: '@@'
        }))
        .pipe(gulpReplace('-tw', '-elcreative'))
        .pipe(gulpRename({
            basename: `theme-v${packages.version}`,
            // basename: `${packages.names.replace(/\s/g, '-')}-v${packages.version}`,
            extname: '.xml'
        }))
        .pipe(gulp.dest('./dist'))
})

// Build task: Production Mode
gulp.task('build:production', gulp.series(
    'clean',

    'styles',
    'styles:autoprefixed',
    'styles:minified',

    'scripts:webpack',
    // 'scripts:babel',
    'scripts:minified',

    'json:minify',
    'json:replace',

    'html:minify',

    'timestamp',

    'start',
    'comments'
));