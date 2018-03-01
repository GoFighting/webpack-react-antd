var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
var CleanWebpackPlugin = require('clean-webpack-plugin');
var DllConfig = require('./webpack.dll.config');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/* 
 * 定义地址
 */
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); // 主目录
var APP_FILE = path.resolve(APP_PATH, 'app'); // 打包根文件
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); // 打包后的文件目录
var DLL_PATH = path.resolve(ROOT_PATH, 'dll'); // 分离打包

var NODE_ENV = '';
var publicPath = '/dist/'; // 最后输出地址
process.argv.forEach(function(item, i) {
    if (/server/.test(item)) {
        NODE_ENV = 'development'
    } else if (/webpack.config/.test(item)) {
        NODE_ENV = 'production'
        publicPath = './'
    }
});

var vendorName = '' // 公共模块文件名称
fs.readdirSync(DLL_PATH).forEach(function(item, i) { // 获取公共模块文件名称
    if (/vendor/.test(item)) {
        vendorName = item
    }
})
if(vendorName === '') {
    console.log('请先执行npm run dll')
    return
}

var webpackConfig = {
    entry: {},
    output: {
        publicPath: publicPath,
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        // chunkFilename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/, // 打包字体文件
            exclude: /^node_modules$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[hash:8].[ext]',
                    limit: 2
                }
            }]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            use: ['jsx-loader', 'babel-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            favicon: './public/favicon.ico',
            inject: 'body',
            hash: false,
        }),
        new ExtractTextPlugin({
            filename: 'app.[chunkhash].css',
            disable: false,
            allChunks: true
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
};
if (NODE_ENV === 'development') {
    webpackConfig['entry']['app'] = [
        'webpack-hot-middleware/client',
        APP_FILE
    ]
    // webpackConfig['entry']['common'] = DllConfig['entry']['vendor']
    webpackConfig['module']['rules'].forEach(function(item, i) {
        item['include'] = [APP_PATH]
        if (/js|jsx/.test(item.test)) {
            item['use'].unshift('react-hot-loader')
        }
        if (/css|scss|less/.test(item.test)) {
            item['use'] = ['css-hot-loader'].concat(item['use'])
        }
    })
    webpackConfig['plugins'].push(
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'vender.js',
        // }),
        new webpack.DllReferencePlugin({ // 设置预先分离的模块
            context: __dirname,
            manifest: require('./dll/manifest.json')
        }),
        new CopyWebpackPlugin([ // 转移已打包好的公共模块
            {
                from: 'dll/' + vendorName,
                to: BUILD_PATH
            },
        ], {
            copyUnmodified: true // 在开发环境转移文件
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else if (NODE_ENV === 'production') {
    webpackConfig['entry']['app'] = APP_FILE
    webpackConfig['output']['publicPath'] = publicPath // 最后输出的地址
    // webpackConfig['entry']['common'] = DllConfig['entry']['vendor']
    webpackConfig['plugins'].push(
        new webpack.DllReferencePlugin({ // 设置预先分离的模块
            context: __dirname,
            manifest: require('./dll/manifest.json')
        }),
        // new webpack.optimize.CommonsChunkPlugin({ // 打包公共模块，现在用DLL分离打包了
        //     name: 'common',
        //     filename: 'vender.[chunkhash].js',
        // }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([ // 转移已打包好的公共模块
            {
                from: 'dll/' + vendorName,
                to: BUILD_PATH
            },
        ]),
        new CleanWebpackPlugin('./dist')
    )
}
module.exports = webpackConfig