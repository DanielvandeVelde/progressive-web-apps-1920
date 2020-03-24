const gulp = require("gulp");
const image = require("gulp-imagemin");

return gulp
  .src("./src/img/**")
  .pipe(
    image([
      image.mozjpeg({ quality: 50, progressive: true }),
      image.optipng({ optimizationLevel: 9 })
    ])
  )
  .pipe(gulp.dest("./static/img"));
