const gulp = require('gulp');
const gulpRename = require('gulp-rename');

// Move all JS files from 'build/scripts/' to 'scripts/' directory
gulp.task('move-js', () => {
    return gulp.src('build/scripts/*.js')
        .pipe(gulpRename({
            dirname: ''
        })) // remove 'scripts/' subdirectory
        .pipe(gulp.dest('scripts/'));
});

// Move all CSS files from 'build/styles/' to 'styles/' directory
gulp.task('move-css', () => {
    return gulp.src('build/styles/*.css')
        .pipe(gulpRename({
            dirname: ''
        })) // remove 'scripts/' subdirectory
        .pipe(gulp.dest('styles/'));
});

// Define default task to run both move tasks
gulp.task('tasks', gulp.parallel('move-js', 'move-css'));