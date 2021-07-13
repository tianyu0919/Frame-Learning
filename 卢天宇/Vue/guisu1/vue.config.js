const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(process.env.NODE_ENV);
module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/build/',
    outputDir: 'build', // 打包出去的路径
    lintOnSave: false, // 关闭查看
    chainWebpack: config => { // 修改webpack内部的一些规则
        config.plugin('html').tap(args => {
            args[0].title = '归宿网';
            return args;
        })
    },
    configureWebpack: {
        // plugins: [
        //     new HtmlWebpackPlugin({
        //         title: 'xx',
        //         template: path.join(__dirname, 'public/index.html')
        //     }),
        // ]
    }
}