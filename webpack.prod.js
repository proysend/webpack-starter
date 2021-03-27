// Archivo creado con el fin de poder hacer las producciones

//para poder utilizar el module.exports se debe ingresar el siguiente comando en consola "npm i -D html-loader html-webpack-plugin"


const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'production', // se debe cambiar el valor, dependiendo de lo que se este haciendo development (desarrollo) o production (produccion)
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
        minimize: false
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    //attributes: false,
                    sources: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'assets/[name].[ext]'

                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]
}