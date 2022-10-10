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
    watch: true
}