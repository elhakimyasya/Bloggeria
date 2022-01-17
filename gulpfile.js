const fs = require("fs");
const del = require("del");
const gulp = require("gulp");
const gulpRename = require("gulp-rename");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpReplace = require("gulp-replace");
const gulpSass = require('gulp-sass')(require('sass'));
const gulpCSSMinify = require("gulp-minify-css");

const paths = {
    styles: {
        src: "./src/styles/*.scss"
    },
    files: {
        src: "./src/*.xml"
    }
}

gulp.task("clean", function () {
    return del(["dist/**", "build/**"], {
        force: true
    });
})

gulp.task("styles", function () {
    return gulp.src("./src/styles/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("./build/styles"))
})

gulp.task("styles:autoprefixed", function () {
    return gulp.src("./build/styles/*.css")
        .pipe(gulpAutoprefixer({
            cascade: false
        }))
        .pipe(gulpRename(function (filename) {
            filename.basename += "-prefixed"
        }))
        .pipe(gulp.dest("./build/styles"))
});

gulp.task("styles:minify", function () {
    return gulp.src("./build/styles/*.css")
        .pipe(gulpCSSMinify({
            keepSpecialComments: 0
        }))
        .pipe(gulpRename(function (filename) {
            filename.basename += ".min"
        }))
        .pipe(gulp.dest("./build/styles"))
});

gulp.task("start", function () {
    return gulp.src(paths.files.src)
        .pipe(gulpReplace(/\[elc:include (.*?)\]/g, function (index, name) {
            let replace = fs.readFileSync(name, "utf-8");

            return replace
        }))
        .pipe(gulpRename({
            basename: "theme"
        }))

        .pipe(gulp.dest("./dist"))
});

gulp.task("build:development", gulp.series(
    "clean",
    "styles",
    "start"
));

gulp.task("build:production", gulp.series(
    "clean",
    "styles",
    "styles:autoprefixed",
    "styles:minify",
    "start"
));