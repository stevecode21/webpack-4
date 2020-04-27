
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//Importaremos un plugin del loader vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: 'http://localhost:9000/',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    devServer: {
        //Los archivos base, me las hale desde la carpeta dist
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 9000,
        hot: true
    },
    resolve:{
        //Como puedo llamar dentro de mis imports a otras rutas
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.css|postcss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
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
        //Y usamos el plugin de vue-loader
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],
}