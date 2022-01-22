const fs = require("fs");
const del = require("del");
const gulp = require("gulp");
const gulpRename = require("gulp-rename");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpReplace = require("gulp-replace");
const gulpSass = require('gulp-sass')(require('sass'));
const gulpCSSMinify = require("gulp-minify-css");
const gulpBabel = require("gulp-babel");
const gulpBabelMinify = require("gulp-babel-minify");
const gulpJSObfuscator = require("gulp-javascript-obfuscator");
const gulpFileInclude = require("gulp-file-include");

const paths = {
    scripts: {
        src: [
            "./src/assets/scripts/*.js",
            "./src/assets/scripts/libraries/*.js",
            "./src/assets/scripts/partial/*.js"
        ]
    },
    styles: {
        src: [
            "./src/assets/styles/*.scss",
            "./src/assets/styles/libraries/*.css",
            "./src/assets/styles/libraries/*.scss",
            "./src/assets/styles/partial/*.css",
            "./src/assets/styles/partial/*.scss"
        ]
    },
    files: {
        src: [
            "./src/*.xml",
            "./src/*.html"
        ]
    }
}

gulp.task("clean", function () {
    return del(["dist/**", "build/**"], {
        force: true
    });
})

gulp.task("styles", function () {
    return gulp.src(paths.styles.src)
        .pipe(gulpSass())
        .pipe(gulp.dest("./build/styles"))
});

gulp.task("styles:autoprefixed", function () {
    return gulp.src("./build/styles/*.css")
        .pipe(gulpAutoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("./build/styles"))
});

gulp.task("styles:minify", function () {
    return gulp.src("./build/styles/*.css")
        .pipe(gulpCSSMinify({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest("./build/styles"))
});

gulp.task("scripts", function () {
    return gulp.src(paths.scripts.src)
        .pipe(gulpBabel())
        .pipe(gulp.dest("./build/scripts"))
});

gulp.task("scripts:minify", function () {
    return gulp.src("./build/scripts/*.js")
        .pipe(gulpBabelMinify({
            mangle: {
                keepClassName: true
            },
            evaluate: false,
            builtIns: false
        }))
        .pipe(gulp.dest("./build/scripts"))
});

gulp.task("scripts:obfuscate", function () {
    return gulp.src("./build/scripts/*.js")
        .pipe(gulpJSObfuscator())
        .pipe(gulp.dest("./build/scripts"))
});

gulp.task("start", function () {
    return gulp.src(paths.files.src)
        .pipe(gulpReplace(/\[elc:include (.*?)\]/g, function (index, name) {
            let replace = fs.readFileSync(name, "utf-8");

            return replace
        }))
        .pipe(gulpFileInclude({
            indent: true,
            basepath: "@file",
            prefix: "@@"
        }))
        .pipe(gulpRename({
            basename: "theme",
            extname: ".xml"
        }))

        .pipe(gulp.dest("./dist"))
});

gulp.task("build:development", gulp.series(
    "clean",
    "styles",
    "scripts",
    "start"
));

gulp.task("build:production", gulp.series(
    "clean",
    "styles",
    "styles:autoprefixed",
    "styles:minify",
    "scripts",
    "scripts:minify",
    "start"
));