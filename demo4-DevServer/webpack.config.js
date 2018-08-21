const path=require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports={
    entry:{                   //多入口使用对象形式配置，chunk名称为key值
        A: './src/A/A.js',
        B: './src/B/B.js',
    },
    output:{                   //出口配置
        filename:'[name].bundle.js',  //多入口打包输出多出口时，filename不能是固定的；[name]代表chunk名称
        path: path.resolve(__dirname, 'dist')  //出口文件路径
    },
    module: {
        rules: [{
            test: /\.js$/,    //使用正则匹配所有需要使用babel-loader的文件
            use: {
                loader: "babel-loader",  //指明要使用的loader
                options: {               //传入loader的参数
                    presets: ["env","react"] //用于解析ES6+React
                }
            }

        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            chunks: ['A'],           //要引入的chunk
            filename:'A.html',       //生成的文件名
            template:'template.html',  //模板文件
        }),
        new HtmlWebpackPlugin({
            chunks:['B'],
            filename:'B.html',
            template:'template.html'
        }),
        new webpack.HotModuleReplacementPlugin(),  //启用 HMR
        new OpenBrowserPlugin({ url: 'http://192.168.1.87:3000/A.html' })  //开启服务后，自动打开的地址
    ],
    devServer:{
        hot: true,                 //开启模块热替换
        contentBase: './dist',     //将dist目录下的文件，作为额外可访问文件
        headers: {'X-foo':'bar'},  //在 HTTP 响应中注入一些 HTTP 响应头
        host: '0.0.0.0',           //DevServer 服务监听的地址，默认是localhost。当需要同个局域网可访问你的服务时，可设成0.0.0.0
        port: 3000,                //DevServer 服务监听的端口，默认8080
        https: false,              //是否使用HTTPS服务
        // open: true                 //自动打开网页
    },
};