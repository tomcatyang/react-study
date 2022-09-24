#!/bin/bash
if [ $# == 0 ] ;then 
  echo "please input web project name";
  exit -1;
fi

echo "开始创建react web 项目: $1";

mkdir $1
cd $1

echo "默认方式创建react项目，也可以不加-y参数，交互输入项目配置数据"
npm init -y; 


### npm add 或者 npm i 或者 npm install 都是安装插件
### npm add -g 表示安装到node全局目录
echo "React 的基本模块"
npm add react react-dom

echo "React Web 打包及配置模块 -D表示dev devDependencies"
npm i webpack webpack-cli html-webpack-plugin webpack-dev-server -D

# babel-loader: weboack loader, 用于编译打包 js 文件
# @babel/core: babel 依赖包, 将 js 代码分析成 ast
# @babel/preset-react: webpack react 相关预设
# @babel/preset-env: weboack react 相关预设, 这样就可以使用最新的 js 相关语法
echo "用于js语法支持库"
npm i babel-loader @babel/core @babel/preset-react @babel/preset-env -D

echo "用于html css 语法支持库"
npm i css-loader html-loader -D

echo "copy配置文件到项目目录"

cp -r ../file-template/webpack webpack
cp -r ../file-template/src src
cp  ../file-template/.babelrc ./

echo "在package 执行命令script下添加"
echo "---------------------------"
echo  "\"start\": \"webpack-dev-server --open --mode development --config webpack/webpack.config.js\","
echo  "\"build\": \"webpack --mode production --config webpack/webpack.config.js\""
echo "---------------------------"

