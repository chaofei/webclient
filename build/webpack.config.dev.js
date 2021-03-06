
var webpack = require('webpack');
var path=require('path');
module.exports={
    //这里写成数组是为了dev server插入服务配置
    entry: {
        index:[
            "webpack-dev-server/client?http://localhost:8080/", 
            "webpack/hot/dev-server", 
            '../src/app.js'
        ],
    },
    output:{
        path:           path.resolve(__dirname, "../release"),//__dirname+'/../release',
        publicPath:     "/release/",//dev server 会从此路径去拿hot-update.json
        filename:       '[name].bundle.js'
    },
    externals: {
        'vue':          'Vue',
        'vue-router':   'VueRouter'
    },
    module: {
        loaders: [
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }
        ]
    },
    resolve: {
        root :[
            path.resolve(__dirname, '../src')
        ],
        extensions: ['', '.js', '.css'] //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "source-map"
}