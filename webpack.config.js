const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stylesHandler = 'style-loader';

module.exports = {
    mode: 'production',
    entry: {
        // scripts: './src/assets/scripts/scripts.js',
        auth: './plugins/auth/scripts/scripts.js',
    },
    optimization: {
        chunkIds: 'named',
    },
    output: {
        path: path.resolve(__dirname, './build/scripts'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './plugins/auth/index.html',
        }),
    ],
}