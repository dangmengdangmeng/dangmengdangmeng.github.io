const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './demo'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: "./",
        port: "8032",
        inline: true,
        hot: true,
        open:true
    },
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {//对html文件进行压缩
                removeAttributeQuotes: false //removeAttrubuteQuotes是去掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './index.html' //打包html模版的路径和文件名称。
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    }
}
