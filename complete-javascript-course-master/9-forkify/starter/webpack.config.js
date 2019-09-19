//
const path = require('path');
//
const HtmlWepackPlugin = require('html-webpack-plugin');
//
module.exports = {
    entry  : ['babel-polyfill', './src/js/index.js'],
    devtool : 'source-map',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWepackPlugin({
            filename : 'index.html',
            template : './src/index.html'
        })      
    ],
    module : {
        rules : [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                use     : {
                        loader : 'babel-loader'
                }
            }
        ] 
    }
};