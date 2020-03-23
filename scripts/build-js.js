const gulp = require("gulp");
const uglify = require("gulp-uglify");

return gulp
  .src(["./src/js/chart.min.js"])
  .pipe(uglify())
  .pipe(gulp.dest("./static/js"));
