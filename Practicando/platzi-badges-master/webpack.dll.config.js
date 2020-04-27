
const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    entry: {
        modules: [
            'react',
            'react-dom',
            'react-router-dom',
        ]
    },
    optimization: {
        //Lo importaremos dentro de un array en el key minimizer
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].dll.js',
        library: '[name]',
    },
    //Los plugins serán settings del key de optimizations
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, '[name]-manifest.json')
        })
    ],
}