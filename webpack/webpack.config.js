let path = require('path')
let {createVariants} = require('parallel-webpack')

function createConfig(options) {
    return {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'ys-session.js',
            library: 'YSSession',
            libraryTarget: options.target
        },
        devServer: {
            contentBase: path.resolve(__dirname, '../demo'),
            host: '0.0.0.0',
            port: '8888',
            https: true,
            hot: true,
            open: true
        }
    }
}

module.exports = createVariants({
    target: ['var']
    // target: ['var', 'commonjs2', 'umd', 'amd']
}, createConfig)

