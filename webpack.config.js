const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'build/scripts/script-head.js'),
    output: {
        path: path.resolve(__dirname, 'build/scripts'),
        filename: 'bundle.js',
    },
};