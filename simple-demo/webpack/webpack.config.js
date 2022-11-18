const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

console.log(path.join(__dirname, 'public'));

const main_html = './src/index.html';

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader"
            //         }
            //     ]
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.ts$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/typescript', '@babel/preset-env'],
                  },
                },
              },
              {
                test: /.tsx$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env'],
                  },
                },
              }
        ]
    },
    entry:{//入口文件
        one:"./src/index.js",
        two:"./src/two/index.jsx",
        three:"./src/three/index.jsx",
        four:"./src/four/index.tsx",
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./index.html", //生成的html页面的名字为index.html
            title:"one", //它的title为one，记得要在src/index.html中加入<%= %>
            chunks:["one"], //使用one.js moudule
        }),
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./two/index.html",//生成的html页面的名字为./two/index.html
            title:"two",
            chunks:["two"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/three/index.html",
            filename: "./three/index.html",
            title:"three",
            chunks:["three"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/four/index.html",
            filename: "./four/index.html",
            title:"four",
            chunks:["four"],
        })
        
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
    },
};