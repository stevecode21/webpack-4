
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
//Según la documentación mi plugin para limpiar arhcivos, debo importarlo así
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//Importaremos un plugin del loader vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        // publicPath: 'http://localhost:3001/',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    //Los plugins serán settings del key de optimizations
    optimization: {
        //Lo importaremos dentro de un array en el key minimizer
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin
        ]
    },
    resolve: {
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
                    loader: 'url-loader',
                    options: {
                        //Cuanto quiero ponerle para soportar y convertir assets en base64
                        limit: 1000,
                        //Puedo configurarle que los archivos generen hash y que no se exporten con una misma extensión (configuración recomendada para producción)
                        name: '[hash].[ext]',
                        //También podré controlar los assets que estoy generando para guardarlos en una carpeta más organizada, en este caso assets, ya que son archivos estáticos
                        outputPath: 'assets'
                    }
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //También genero un hash de mi export, (solo es recomendado para producción, ya que aunque son milisegundos, aumentará la carga)
            filename: 'css/[name].[hash].css',
            //Mis chunks que saldrán cuando tenga un css un poco más complejo, también le asignaré un hash
            chunkFilename: 'css/[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
            outputPath: 'js',
            publicPath: 'js'
        }),
        //Y usamos el plugin de vue-loader
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            //Le podemos configurar que haga una limpieza de archivos antes de que se haga mi build
            //Limpiaré todo lo que tenga hash de app
            //para meterme en cualquier carpeta dos '**' ya que app (css y js) está en múltiples carpetas
            cleanOnceBeforeBuildPatterns: ['**/app.*']
        })
    ],
}