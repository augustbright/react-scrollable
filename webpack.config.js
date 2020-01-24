const path = require('path');

module.exports = {
    entry: path.join(__dirname,  'src', 'index.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {test: /\.ts/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.tsx/, exclude: /node_modules/, use: 'babel-loader'}
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        }
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx']
    }
}