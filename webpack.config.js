const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: [
                    ['env', {
                        targets: {
                            browsers: ['ie >= 8']
                        },
                        loose: true,
                    }],
                ],
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style",
                "css!sass"
            )
        }],
        postLoaders: [{
            test: /\.js$/,
            loader: 'es3ify-loader',
            plugins: [
                'transform-es3-member-expression-literals'
            ],
        }]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new CopyWebpackPlugin([{
            from: 'src/polyfills/eventListener-polyfill.js',
            to: 'polyfills/eventListener-polyfill.js',
            toType: 'file'
          }]),
        new CopyWebpackPlugin([{
            from: 'src/polyfills/bind-polyfill.js',
            to: 'polyfills/bind-polyfill.js',
            toType: 'file'
          }])
    ]
};
