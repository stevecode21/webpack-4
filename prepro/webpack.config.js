
const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        home: path.resolve(__dirname, 'src/js/index.js'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        hot: true,
        open: true,
        port: 9000,

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: MiniCSSExtractPlugin.loader
                    // }
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: MiniCSSExtractPlugin.loader
                    // }
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // {
                    //     loader: MiniCSSExtractPlugin.loader
                    // }
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    // {
                    //     loader: MiniCSSExtractPlugin.loader
                    // }
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 90000, 
                    }
                }
            },
        ]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),

        // new MiniCSSExtractPlugin({
        //     filename: 'css/[name].css'
        // }),
        new HtmlWebpackPlugin({
            title: 'webpack-dev-server',
            template: path.resolve(__dirname, 'index.html')
        })
    ]
}