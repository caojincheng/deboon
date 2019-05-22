var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var src = path.resolve(__dirname, '../src');

module.exports = {
    entry: {
      app: ["babel-polyfill", "./src/main.js"]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV !== 'development' ?  config.build.assetsPublicPath: config.dev.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'views': path.resolve(__dirname, '../src/views'),
            'styles': path.resolve(__dirname, '../src/styles'),
            'api': path.resolve(__dirname, '../src/api'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'store': path.resolve(__dirname, '../src/store'),
            'router': path.resolve(__dirname, '../src/router'),
            'mock': path.resolve(__dirname, '../src/mock'),
            'vendor': path.resolve(__dirname, '../src/vendor'),
            'static': path.resolve(__dirname, '../static'),

        }
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: "pre",
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            { test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ],
        loaders: [{    // babel loader
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.(png|jpg|jpng)$/, // pack images
            loader: 'url-loader?limit=8192&name=resource/image/[name]-[hash:8].[ext]'
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9]+)?$/,
            loader: 'url-loader?limit=1000&name=resource/fonts/[name]-[hash:8].[ext]'
        },
        {
            test: /\.ejs$/,
            loader: 'ejs-loader',
        },
        {
            test: /\.(scss|sass|css|less)$/,  // pack sass and css files
            loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader"})
        }
        ]
    },
}
