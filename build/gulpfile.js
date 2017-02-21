
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
    gulp.src(['vue/dist/vue.min.js','vue-router/dist/vue-router.min.js'],{
        cwd:'../lib'
    }).pipe(concat('vue.min.js')).pipe(gulp.dest('../release'));
})

/**
 * 使用测试配置打包，启动hot dev server
 */
gulp.task('webpack-dev',['concat-lib'],function(){
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
    // server.close();
});

/**
 * 使用正式配置打包
 */
var bundleFiles = {
    js : '',
    css : ''
}
gulp.task('webpack-build',['concat-lib'],function (cb) {
    var config = Object.create(webpackConfig);
    var setBundleFiles = function(assets){
        for(k in assets) {
            if(webpackConfig.regExp.js.version.test(k)) {
                bundleFiles.js = k;
            } else if(webpackConfig.regExp.css.version.test(k)) {
                bundleFiles.css = k;
            }
            if(bundleFiles.css && bundleFiles.js) {
                break;
            }
        }
    }
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        setBundleFiles(stats.compilation.assets)
        cb()
        // gutil.log("[webpack]", stats.toString({}));
    });
});

gulp.task("default",["webpack-dev"]);
gulp.task("build",["webpack-build"]);
gulp.task("release",["webpack-build"],function(){
    if(bundleFiles.css && bundleFiles.js) {
        gulp.src('../src/index.html')
            .pipe(greplace(webpackConfig.regExp.js.flag, bundleFiles.js))
            .pipe(greplace(webpackConfig.regExp.css.flag, bundleFiles.css))
            .pipe(gulp.dest('../release'));
    }
});