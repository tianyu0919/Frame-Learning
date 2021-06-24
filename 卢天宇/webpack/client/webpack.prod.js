const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, '../utils/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/progress.pro.js',
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