const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, '../音频可视化/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/index.pro.js',
        // filename: 'xx.js',
        publicPath: './'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            scriptLoading: 'blocking'
        }),
        new CleanWebpackPlugin()
    ]
}