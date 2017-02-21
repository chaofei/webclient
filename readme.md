## 1.build目录
存放前端代码打包的代码，包括gulpfile.js，调试用的webpack.config.dev.js，打包生产环境用的webpack.config.js

## 2.lib目录
存放vue vue-router vue-resource等第三方项目代码

## 3.release目录
存放打包生成的生产环境代码

## 4.src目录
存放前端代码源码

## 5.package.json
记录打包依赖的模块，以及调试、打包的命令

## 6.使用方法
### 6.1开发
在根目录运行 npm run dev
此命令会启动一个webpack dev server，并使用了hot dev-server插件，更新代码后会实时更新打包文件，并刷新浏览器

demo是一个简单的vue项目，使用了vue-router，并演示了模块的延时加载模块和异步获取数据

访问http://localhost:8080/release/dev_index.html 可以查看效果


### 6.2打包构建代码
根目录运行 npm run build
与打包构建时：
- 会压缩js代码
- 不生成map文件
- 提取出css文件放到一个独立的bundle文件中
- 打包生成的js代码会带上根据打包文件计算出来的hash
- 自动将带版本号的js和css更新到index.html中