
var gulp=require("gulp");
var gutil = require('gulp-util');
var greplace = require('gulp-replace');
var concat = require('gulp-concat')
var webpack=require("webpack");
var webpackConfig=require("./webpack.config.js");
var webpackConfigDev=require("./webpack.config.dev.js");
var WebpackDevServer = require("webpack-dev-server");
var path=require("path");
var fs=require("fs");

/**
 * 合并lib文件
 */
gulp.task('concat-lib',function(){
    gulp.src(['vue/dist/vue.min.js','vue-router/dist/vue-router.min.js', 'vue-resource/dist/vue-resource.min.js'],{
        cwd:'../lib'
    }).pipe(concat('vue.min.js')).pipe(gulp.dest('../release'));
})

/**
 * 构建开发环境下的入口页面
 */
gulp.task('build-dev-index',function(){
    gulp.src('../src/index.html')
        .pipe(greplace('</body>', '<script src="/release/index.bundle.js"></script></body>'))
        .pipe(concat('dev_index.html'))
        .pipe(gulp.dest('../src'));
})

/**
 * 使用测试配置打包，启动hot dev server
 */
gulp.task('webpack-dev',['concat-lib','build-dev-index'],function(){
    var config = Object.create(webpackConfigDev);
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        contentBase: "../",
        publicPath: "/release/",
        hot: true,
        compress: false,
        stats: { colors: true }
    });
    server.listen(8080, "localhost", function() {});
    gutil.log("[http://localhost:8080/release/dev_index.html]");
    // server.close();
});

/**
 * 使用正式配置打包
 */
gulp.task('webpack-build',['concat-lib'],function () {
    var config = Object.create(webpackConfig);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

gulp.task("default",["webpack-dev"]);
gulp.task("build",["webpack-build"]);