const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, '../utils/server.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/progress.dev.js',
        // filename: 'xx.js',
        publicPath: './'
    },
    devServer: {
        port: 8888,
        open: true,
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            scriptLoading: 'blocking'
        }),
        new CleanWebpackPlugin()
    ]
}