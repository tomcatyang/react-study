const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

console.log(path.join(__dirname, 'public'));

const main_html = './src/index.html';

module.exports = {
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
            }

        ]
    },
    entry:{//入口文件
        one:"./src/index.js",
        two:"./src/two/index.jsx",
        three:"./src/three/index.jsx"
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./index.html", //生成的html页面的名字为one.html
            title:"one", //它的title为one，记得要在src/one.html中加入<%= %>
            chunks:["one"],
        }),
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./two/index.html",
            title:"two",
            chunks:["two"],
        }),
        new HtmlWebPackPlugin({
            template: "./src/three/index.html",
            filename: "./three/index.html",
            title:"three",
            chunks:["three"],
        })
        
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};