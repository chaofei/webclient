
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path=require('path');
var cssExtract=new ExtractTextPlugin("[name].[contenthash:8].bundle.css");
module.exports={
    entry: {
        index:'../src/app.js'
    },
    output:{
        path:       path.resolve(__dirname, "../release"),
        publicPath: "",//TODO 填写生产环境静态文件路径
        filename:   '[name].[chunkhash:8].bundle.js'
    },
    externals: {
        'vue':          'Vue',
        'vue-router':   'VueRouter'
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: cssExtract.extract("style-loader", "css-loader")
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        }),
        cssExtract,
        new HtmlWebpackPlugin({
            template:'../src/index.html',
            minify:{ //压缩HTML文件
                removeComments:true, //移除HTML中的注释
                collapseWhitespace:true //删除空白符与换行符
            }
        })
    ]
}