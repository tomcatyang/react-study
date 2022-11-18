使用方式
一、全局使用（推荐）
1.1 安装库
npm install react-mini-web -g

1.2 创建项目
mini-web init project-name

1.3 安装依赖
cd project-name
npm install

1.4 debug运行
npm start


二、在项目中使用
2.1 创建目录
mkdir mini-web-dir
cd mini-web-dir

2.2 安装库
npm init 
npm install react-mini-web

2.3 在package.json中加入执行命令
  "scripts": {
    "mini-web": "mini-web"
  },

2.4 创建项目
npm run mini-web init project-name

2.5 安装依赖
cd project-name
npm install

2.6 debug运行
npm start