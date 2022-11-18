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
        hash_router:"./src/hash_router/index.jsx",
        browser_router:"./src/browser_router/index.jsx",
        app:"./src/app.js",
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
            filename: "./hash_router1/index.html",
            title:"hash_router",
            chunks:["hash_router"],
        }),
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./browser_router/index.html",
            title:"browser_router",
            chunks:["browser_router"],
        }),
        new HtmlWebPackPlugin({
            template: main_html,
            filename: "./hash_router/index.html",
            title:"app",
            chunks:["app"],
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