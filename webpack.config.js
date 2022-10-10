const path = require('path');

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
    watch: true
}