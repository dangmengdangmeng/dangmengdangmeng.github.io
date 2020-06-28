let path = require('path')

function createConfig() {
    return {
        entry: './demo/main.js',
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: [
                        "style-loader",
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, '../demo'),
            host: '0.0.0.0',
            port: '8889',
            https: true,
            hot: true,
            open: true
        }
    }
}

module.exports = createConfig

