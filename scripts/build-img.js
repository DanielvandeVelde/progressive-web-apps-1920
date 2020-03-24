const gulp = require("gulp");
const image = require("gulp-imagemin");

return gulp
  .src("./src/img/icons/**")
  .pipe(image())
  .pipe(gulp.dest("./static/img/icons/"));
