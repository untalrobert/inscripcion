var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');



gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
     gulp.src('www/*.html')
    .pipe(minifyHTML(opts))
    .pipe(connect.reload())
    .pipe(gulp.dest('../www'));
    
});


//javascript 
gulp.task('scripts', function() {
  gulp.src('app/javascripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('../public/js'));

});

//librerias de web 
gulp.task('js', function() {
  gulp.src('www/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../www/js'))
    .pipe(livereload());
});

//imagenes 
gulp.task('images', function () {
     gulp.src('www/img/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('../www/img'));
});


gulp.task('minify-css', function() {
    gulp.src('www/css/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('../www/css'));
});




gulp.task('default', ['minify-html', 'js', 'scripts', 'minify-css', 'watch']);

gulp.task('watch', function() {
    gulp.watch('www/*.html', ['minify-html']);
    gulp.watch('www/js/**/*.js', ['js']);
     gulp.watch('www/css/**/*.css', ['minify-css']);

});
