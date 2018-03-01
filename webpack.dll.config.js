var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var DLL_PATH = path.resolve(ROOT_PATH, 'dll');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk',
    'immutable'
]

module.exports = {
    output: {
        path: DLL_PATH,
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: './dll/manifest.json',
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
        new CleanWebpackPlugin('./dll')
    ],
}