var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
     entry: './src/script.es6',
     devtool: 'source-map',
     output: {
         path: __dirname + '/public/dist',
         filename: 'script.js'
     },
     module: {
         loaders: [{
             test: /\.es6$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             options: {
               presets: ['env']
             }
         }]
     },
     plugins: [
        new BrowserSyncPlugin({
        proxy: 'dev.me:4000',
        files: ['public/**/*.*']
        })//,
        //new UglifyJSPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ]
 };