# 参考
# https://medium.com/enjoy-life-enjoy-coding/typescript-%E7%95%B6-typescript-%E9%81%87%E4%B8%8A-react-%E7%9A%84%E8%B6%85%E7%B4%9A%E8%81%AF%E5%90%8D-tsx-%E6%AC%BE-1d49be8ca9de

if [ $# == 0 ] ;then 
  echo "please input web project name";
  exit -1;
fi

cd $1

# TypeScript 是直接裝在 Global 上，但還是記得另外裝在專案中，如果不想放 Global ，想只裝在該專案的 dev 也可以
echo "安装TypeScript 库到项目"
npm install typescript --save-dev

echo "TypeScript 类型模块"
npm add @types/react @types/react-dom

echo "Babel 提供的 Presets ，讓 Webpack 可以抓到 .tsx "
npm install @babel/preset-typescript  --save-dev

npm install @types/react @types/react-dom --save-dev

echo "copy配置文件到项目目录"
cp  ../react-mini-web/file-template/ts/webpack.config_tsx.js webpack/webpack.config.js
cp  ../react-mini-web/file-template/ts/index.js src/index.js
cp -r ../react-mini-web/file-template/ts/four src/four

echo "在package 执行命令script下添加"
echo  "\"tsc_init\": \"tsc --init\""


