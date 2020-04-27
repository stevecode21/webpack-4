
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // publicPath: 'http://localhost:9000/',
        publicPath: 'http://localhost:9001/',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    devServer: {
        //Los archivos base, me las hale desde la carpeta dist
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        // port: 9000,
        port: 9001,
        hot: true
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
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        //Aquí le configuraré al file-loader, la ruta a donde quiero exportar dichos archivos de desarrollo
                        outputPath: 'assets/',
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],
}